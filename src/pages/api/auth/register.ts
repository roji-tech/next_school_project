// import { NextApiRequest, NextApiResponse } from "next";
// import axios, { AxiosError } from "axios";
// import { jwtDecode } from "jwt-decode";
// import { setCookie } from "cookies-next";
// import { NextResponse } from "next/server";
// import { DecodedToken, RegisterRequestBody } from "@/types/intefaces";
// import NextAuth from "next-auth";

// // API handler for user registration
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const body: RegisterRequestBody = req.body;

//   // Validate required fields
//   const {
//     email,
//     password,
//     firstName,
//     lastName,
//     gender,
//     school_name,
//     school_phone,
//     school_email,
//   } = body;

//   if (
//     !email ||
//     !password ||
//     !firstName ||
//     !lastName ||
//     !gender ||
//     !school_name ||
//     !school_phone ||
//     !school_email
//   ) {
//     return NextResponse.json(
//       { message: "All fields are required." },
//       { status: 400 }
//     );
//   }

//   try {
//     // Configure the API request
//     const config = {
//       url: "http://127.0.0.1:8000/api/v1/auth/register/",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       data: {
//         email,
//         password,
//         first_name: firstName,
//         last_name: lastName,
//         gender,
//         school_name,
//         school_phone,
//         school_email,
//       },
//     };

//     // Send the registration request
//     const response = await axios(config);

//     // Check response status
//     if (response.status === 201) {
//       const { access, refresh } = response.data.tokens;
//       // Respond with the access token and expiry time
//       const {
//         exp,
//         username,
//         email,
//         first_name,
//         last_name,
//         image,
//         gender,
//         phone,
//         role,
//         is_superuser,
//         is_staff,
//       } = jwtDecode<DecodedToken & { [key: string]: any }>(access);

//       // Set secure cookie for the refresh token
//       setCookie("refreshToken", refresh, {
//         req,
//         res,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//       });

//       const session = {
//         user: {
//           username,
//           email,
//           firstName: first_name,
//           lastName: last_name,
//           image,
//           gender,
//           phone,
//           role,
//           isSuperuser: is_superuser,
//           isStaff: is_staff,
//         },
//         accessToken: access,
//         accessTokenExpires: exp,
//       };

//       return NextResponse.json(session, { status: 200 });
//     }

//     // Handle unexpected status codes
//     return NextResponse.json(
//       {
//         message: response.data?.message || "Registration failed.",
//       },
//       { status: response.status }
//     );
//   } catch (error) {
//     // Handle Axios errors
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       return NextResponse.json(
//         {
//           message:
//             (axiosError.response?.data as { message?: string })?.message ||
//             "An unexpected error occurred.",
//         },
//         { status: axiosError.response?.status || 500 }
//       );
//     }

//     // Handle other types of errors
//     return NextResponse.json(
//       {
//         message: (error as Error).message || "An unexpected error occurred.",
//       },
//       { status: 500 }
//     );
//   }
// }
