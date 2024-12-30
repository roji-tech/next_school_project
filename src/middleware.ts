// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Define the paths that require authentication
// const protectedRoutes = ["/admin", "/dashboard", "/list"];

// export default function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();
//   const pathname = url.pathname;

//   // Check if the request is for a protected route
//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     const isLoggedIn = req.cookies.get("isLoggedIn")?.value;

//     // Redirect to login if not logged in
//     if (!isLoggedIn || isLoggedIn !== "true") {
//       url.pathname = "/login"; // Redirect to login page
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next(); // Allow access if the user is logged in
// }

import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// Define role-based access paths
const rolePaths = {
  admin: "/admin",
  student: "/student",
  parent: "/parent",
  teacher: "/teacher",
};

// Middleware to handle role-based access
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log(token);

    if (!token) {
      return NextResponse.redirect(
        new URL("/login?message=You must log in!", req.url)
      );
    }

    // Role-based path checks
    if (
      req.nextUrl.pathname.startsWith(rolePaths.admin) &&
      token.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/login?message=Admin access required!", req.url)
      );
    }

    if (
      req.nextUrl.pathname.startsWith(rolePaths.student) &&
      token.role !== "student"
    ) {
      return NextResponse.redirect(
        new URL("/login?message=Student access required!", req.url)
      );
    }

    if (
      req.nextUrl.pathname.startsWith(rolePaths.parent) &&
      token.role !== "parent"
    ) {
      return NextResponse.redirect(
        new URL("/login?message=Parent access required!", req.url)
      );
    }

    if (
      req.nextUrl.pathname.startsWith(rolePaths.teacher) &&
      token.role !== "teacher"
    ) {
      return NextResponse.redirect(
        new URL("/login?message=Teacher access required!", req.url)
      );
    }

    return NextResponse.next(); // Allow access if role matches
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // User must have a valid token to proceed
        return !!token;
      },
    },
  }
);

// Matcher configuration for the protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/parent/:path*",
    "/teacher/:path*",
    "/list/:path*", // Add additional protected paths as needed
  ],
};
