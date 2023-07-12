import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const protectedUrls = [
  "/uzytkownik/ustawienia",
  "/uzytkownik/notyfikacje",
  "/ulubione",
  "/wiadomosci-prywatne",
  "/obserwowane",
];

// export default withAuth(async function middleware(req) {
//   const session = await getSession({ req });
//   console.log(session);
// });

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const isLoggedIn = Boolean(session?.email);
  const haveUsername = (session as any)?.username;
  const { pathname } = req.nextUrl;
  if (isLoggedIn && !haveUsername && pathname !== "/username") {
    return NextResponse.redirect(new URL("/username", req.url));
  } else if (
    isLoggedIn &&
    protectedUrls.some((url) => pathname.startsWith(url))
  ) {
    return NextResponse.next();
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
