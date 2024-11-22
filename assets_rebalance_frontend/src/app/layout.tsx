import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import SideNav from "./components/sidenav/sidenav";

export const metadata: Metadata = {
  title: "Assets Rebalance",
  description: "Your financial equalization app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full max-w-full max-h-full">
        <Header />
        <div className="flex w-full max-w-full h-[calc(100vh-60px)]">
          <SideNav/>
          {children}
        </div>
      </body>
    </html>
  );
}
