import Header from "./components/header/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Jbzd.com.pl - najgorsze obrazki w internecie!",
  description: "Najgorsze obrazki z sieci!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={openSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
