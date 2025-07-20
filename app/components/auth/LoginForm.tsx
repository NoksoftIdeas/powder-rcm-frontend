/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
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

  const handleDemoLogin = () => {
    setEmail("admin@demo.com");
    setPassword("admin123");
  };

  return (
    <>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}
      <div className="mb-2 bg-cyan-50 border border-cyan-100 rounded p-2 text-xs text-gray-600 text-center">
        <span className="font-semibold">Demo Admin Login:</span> <br />
        Email: <span className="font-mono">admin@demo.com</span> &nbsp;|&nbsp; Password: <span className="font-mono">admin123</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-4 py-2 mt-1"
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
            className="w-full border rounded px-4 py-2 mt-1"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 text-white py-2 rounded font-semibold"
        >
          Continue
        </button>

        <button
          type="button"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded font-semibold mt-2 transition"
          onClick={handleDemoLogin}
        >
          Demo Admin Login
        </button>

        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to this{" "}
          <a href="/terms" className="underline">Terms & Usage Policy</a> and acknowledge the{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        Don&apos;t have an account?{" "}
        <a href="/Signup" className="underline text-cyan-700">Sign up</a>
      </p>
    </>
  );
}
