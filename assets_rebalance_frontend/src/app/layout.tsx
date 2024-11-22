import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import SideNav from "./components/sidenav/sidenav";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
        <Header />
        <div className="flex w-full max-w-full overflow-hidden h-[calc(100vh-60px)]">
          <SideNav />
          <div className="w-[85%] overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
