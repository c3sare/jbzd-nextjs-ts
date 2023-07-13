import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/logowanie",
    signOut: "/auth/signout",
    error: "/logowanie",
    newUser: "/",
  },
});

export const config = {
  matcher: [
    "/uzytkownik/ustawienia/:path*",
    "/uzytkownik/notyfikacje/:path*",
    "/ulubione/:path*",
    "/wiadomosci-prywatne/:path*",
    "/obserwowane/:path*",
  ],
};
