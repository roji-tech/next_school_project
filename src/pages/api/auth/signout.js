import { setCookie } from "cookies-next";

export default function handler(req, res) {
  // Remove the refresh token
  setCookie("refreshToken", "", {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: -1, // Set expiration in the past
  });

  setCookie("next-auth.session-token", "", {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: -1, // Set expiration in the past
  });

  setCookie("next-auth.csrf-token", "", {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: -1, // Set expiration in the past
  });

  setCookie("next-auth.callback-url", "", {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: -1, // Set expiration in the past
  });

  res.status(200).json({ message: "Refresh token removed" });
}
