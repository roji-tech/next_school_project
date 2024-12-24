// import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { setCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

// interface Token {
//   accessToken?: string;
//   accessTokenExpires?: number;
//   refreshToken?: string;
//   exp?: number;
// }

async function refreshAccessToken(token, req, res) {
  try {
    const refreshToken = await getCookie("refreshToken", { req, res });
    // console.log("\n\n\n\n\n\n\n\n\n\n\n\n", refreshToken);

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is missing or invalid." });
    }

    const config = {
      url: `http://127.0.0.1:8000/api/v1/auth/token/refresh/`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: { refresh: refreshToken },
    };

    const response = await axios(config);
    const data = response.data;

    const { exp } = jwtDecode(data.access);

    if (data?.refresh) {
      setCookie("refreshToken", data.refresh, {
        req,
        res, // Required in Next.js API routes or SSR
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
        path: "/",
      });
    }

    // console.log(data);
    return {
      ...token,
      accessToken: data.access,
      exp,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return {
      // ...token,
      // error: "RefreshAccessTokenError",
    };
  }
}

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "jsmith@example.com",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "******",
          },
        },

        async authorize(credentials) {
          const { email, password } = credentials;

          try {
            const config = {
              url: `http://127.0.0.1:8000/api/v1/auth/token/`,
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              data: { email, password },
            };
            const response = await axios(config);
            const { access, refresh } = response.data;
            const { exp } = jwtDecode(access);

            setCookie("refreshToken", refresh, {
              req,
              res,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
            });

            return {
              accessToken: access,
              accessTokenExpires: exp, // Here, save the expiration time for the access token.
            };
          } catch (error) {
            console.error("Login failed:", error);
            return null;
          }
        },
      }),
    ],

    callbacks: {
      async jwt({ token, user, account, profile, trigger, session }) {
        if (user) {
          return {
            accessToken: user.accessToken,
            accessTokenExpires: user.accessTokenExpires,
            role: "admin",
          };
        }

        const { exp } = jwtDecode(token.accessToken); // Use non-null assertion for accessToken.

        if (moment().unix() < exp) {
          return token; // The token is still valid.
        }

        console.log("refreshAccessToken will run");

        // Refresh the access token
        const refreshedToken = await refreshAccessToken(token, req, res);
        return refreshedToken;
      },

      async session({ session, token }) {
        if (!token?.accessToken) session.user = null;
        else session.user = token;

        return session;
      },
    },

    pages: {
      signIn: "/login",
      signOut: "/login",
    },
  });
}
