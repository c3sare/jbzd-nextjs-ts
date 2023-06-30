import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/logowanie",
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
