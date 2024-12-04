import 'reflect-metadata';
import "./globals.css";

import { Metadata } from "next";
import Header from "./components/header";
import ToastProvider from "./components/providers/toast-provider";
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
      <body className="h-full  w-full max-w-full max-h-full font-arial">
        <ToastProvider>
          <Header />
          <div className="flex w-full max-w-full overflow-hidden h-[calc(100vh-60px)]">
            <SideNav />
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
