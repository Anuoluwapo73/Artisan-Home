import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        // If user is not authenticated, redirect to login
        if (!req.nextauth.token) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }

        // If authenticated, continue to the requested page
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

// Protect these routes
export const config = {
    matcher: [
        '/',
        '/bedroom/:path*',
        '/living-room/:path*',
        '/furniture/:path*',
        '/decor/:path*'
    ]
}