export { auth as default } from "@/auth";

export const config = {
  matcher: [
    "/uzytkownik/ustawienia/:path*",
    "/uzytkownik/notyfikacje/:path*",
    "/ulubione/:path*",
    "/wiadomosci-prywatne/:path*",
    "/obserwowane/:path*",
    "/premium/:path*",
    "/mikroblog/moje/:path*",
    "/mikroblog/obserwowane/:path*",
    "/mikroblog/ulubione/:path*",
  ],
};
