import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isWelcomePage = req.nextUrl.pathname.startsWith("/welcome");
    //@ts-ignore
    const lastLogin = token?.user.lastLogin;

    if (!lastLogin && !isWelcomePage) {
      return NextResponse.redirect(new URL(`/welcome`, req.url));
    }

    if (lastLogin && isWelcomePage) {
      return NextResponse.redirect(new URL(`/`, req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/welcome", "/transactions", "/accounts"],
};
