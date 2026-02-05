import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const userCookie = request.cookies.get("user");

    if (!userCookie && pathname !== "/login" && !pathname.startsWith("/api")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (userCookie && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
