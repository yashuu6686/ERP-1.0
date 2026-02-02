import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // We'll use a cookie to simulate session persistence for middleware
    // LocalStorage is client-side only and doesn't work in middleware
    // In a real app, this would be a JWT or session token cookie
    const userCookie = request.cookies.get("user");

    // Prevent access to standard pages if not logged in
    if (!userCookie && pathname !== "/login" && !pathname.startsWith("/api")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Prevent access to login page if already logged in
    if (userCookie && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
