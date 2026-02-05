import { NextResponse } from 'next/server';

// Menu items configuration - must match menuConfig.js
const MENU_ITEMS = [
    { path: "/", key: "dashboard" },
    { path: "/purchase", key: "purchase" },
    { path: "/grn", key: "grn" },
    { path: "/incoming-inspection", key: "incoming_inspection" },
    { path: "/store", key: "store" },
    { path: "/bom", key: "bom" },
    { path: "/material-issue", key: "material_issue" },
    { path: "/production-inspection", key: "production_inspection" },
    { path: "/batch", key: "batch" },
    { path: "/orders", key: "orders" },
    { path: "/invoices", key: "invoices" },
    { path: "/final-inspection", key: "final_inspection" },
    { path: "/sop", key: "sop" },
    { path: "/dispatch", key: "dispatch" },
    { path: "/rejected-goods", key: "rejected_goods" },
    { path: "/settings/roles", key: "role_management" },
    { path: "/settings/users", key: "user_management" },
];

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Allow public routes and static files
    if (
        pathname === '/login' ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    // Get user from cookie
    const userCookie = request.cookies.get('user');

    if (!userCookie) {
        // Not logged in, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // For permission checking, we need to fetch user data from the API
    // Since middleware runs on the edge, we'll do a simplified check here
    // and rely on client-side withAuth for detailed permission checks

    // Get the user ID from cookie
    const userId = userCookie.value;

    try {
        // Fetch user data including permissions
        const apiUrl = new URL('/api/users', request.url);
        apiUrl.searchParams.set('id', userId);

        // In a real scenario, you'd fetch from your API
        // For now, we'll pass through and let client-side handle it
        // since we can't easily access the JSON server from middleware

        // Find matching menu item for current path
        const menuItem = MENU_ITEMS.find(item => pathname.startsWith(item.path));

        // If no menu item found, allow access (might be a sub-route or profile page)
        if (!menuItem) {
            return NextResponse.next();
        }

        // Add permission info to headers for client-side use
        const response = NextResponse.next();
        response.headers.set('x-required-permission', menuItem.key);

        return response;

    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next();
    }
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
