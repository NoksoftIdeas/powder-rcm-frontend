import React, { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import LayoutContent from "./components/LayoutContent";
import { AuthProvider } from "./components/auth/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { PaCodeProvider } from "./pa-code/context/PaCodeContext";

// Preload fonts to avoid layout shift
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="space-y-4 w-1/2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          }
        >
          <AuthProvider>
            <PaCodeProvider>
              <LayoutContent>{children}</LayoutContent>
            </PaCodeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
