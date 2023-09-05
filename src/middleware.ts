/**
 * This middleware is responsible for checking if the user is authenticated
 */

import { NextResponse, NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  //get the current path
  const path = request.nextUrl.pathname;

  //check your public paths and redirect the user as need be
  const isPublic = path === "/login" || path === "/signup";

  //get the token value stored in the cookies if it exists
  //cause if it exists, it means that the user is logged in
  const token = request.cookies.get("token")?.value || "";

  /** now redirect the user back to the home or whatever page if the user is logged in and
   * tries to access your public paths (login, signup, etc)
   * if the public path is matched and the token exists in the cookies && redirect the user back
   * to the homepage or wherever
   */
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  /**
   * for an unauthenticated user who tries to access prtected pages, redirect to the login page
   */

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

//match these paths
export const config = {
  matcher: ["/profile", "/profile/:path*", "/login", "/signup", "/verify"],
};
