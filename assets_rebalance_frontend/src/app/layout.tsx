import "./globals.css";
import MainLayout from "./main-layout";
import { Metadata } from "next";

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
      <body className="h-full  w-full max-w-full max-h-full font-arial">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
