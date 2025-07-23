"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, logout } from "./components/auth/AuthContext";

export default function HomePage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user?.role === 'admin') {
        router.push("/dashboard");
      } else if (isAuthenticated) {
        // If authenticated but not admin, log them out
        logout();
        router.push("/login");
      } else {
        // Not authenticated, redirect to login
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, router, user]);

  // Show loading state while checking authentication
  if (isLoading ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return null;
}
