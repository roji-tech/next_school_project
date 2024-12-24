import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the paths that require authentication
const protectedRoutes = ["/admin", "/dashboard", "/list"];

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const isLoggedIn = req.cookies.get("isLoggedIn")?.value;

    // Redirect to login if not logged in
    if (!isLoggedIn || isLoggedIn !== "true") {
      url.pathname = "/login"; // Redirect to login page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Allow access if the user is logged in
}

// Specify the routes where the middleware should be applied
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/student/:path*"],
};

// import withAuth from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// // Define the paths that require authentication
// const protectedRoutes = ["/mentor", "/dashboard", "/student"];

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log("token: ", req.nextauth.token);

//     if (
//       req.nextUrl.pathname.startsWith("/admin") &&
//       req.nextauth.token?.role !== "admin"
//     )
//       return NextResponse.rewrite(
//         new URL("/login?message=You Are Not Authorized!", req.url)
//       );
//     if (
//       req.nextUrl.pathname.startsWith("/user") &&
//       req.nextauth.token?.role !== "user"
//     )
//       return NextResponse.rewrite(
//         new URL("/login?message=You Are Not Authorized!", req.url)
//       );
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log(token, "token");
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/dashboard/:path*",
//     "/list/:path*",
//     "/user/:path*",
//   ],
// };

// // Configure matcher to exclude specified paths
// export const config = {
//   matcher: ["/((?!admin|user).*)"], // This pattern matches everything except /admin/* and /user/*
// };
