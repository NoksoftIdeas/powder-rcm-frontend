/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/auth/AuthContext";
import AuthLayout from "../components/auth/AuthLayout";
import Logo from "../components/Logo";
import ChartPreview from "../components/Chartpreview";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <AuthLayout
      logo={
        <div className="flex items-center w-[15%] justify-center mb-2">
          <Logo />
        </div>
      }
      
      form={
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-1">Log in</h1>
          <p className="text-gray-500 mb-2 text-sm">Access and manage your claims</p>
          <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl shadow flex flex-col p-3 gap-4">
            {error && (
              <div className="mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded px-4 py-1 mt-1"
                placeholder="admin@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border rounded px-4 py-1 mt-1"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0086A8] hover:bg-[#007090] text-white py-1 rounded font-semibold text-lg shadow transition"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-1">
              By continuing, you agree to this <a href="/terms" className="underline">Terms & Usage Policy</a> and acknowledge the <a href="/privacy" className="underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      }
      infoPanel={<ChartPreview />}
      supportEmail="help@powder.health"
      />
  );
}
