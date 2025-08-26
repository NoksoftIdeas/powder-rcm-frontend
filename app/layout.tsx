import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import LayoutContent from "./components/LayoutContent";
import { AuthProvider } from "./components/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HMO Management System",
  description: "Comprehensive Health Management Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className={`${geistSans.variable} ${geistMono.variable} `}>
            <LayoutContent>{children}</LayoutContent>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
