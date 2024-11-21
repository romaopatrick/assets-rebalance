import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
