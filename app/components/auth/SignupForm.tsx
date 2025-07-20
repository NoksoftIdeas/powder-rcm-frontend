/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const success = await signup(formData.email, formData.password, formData.name);
      if (!success) {
        setError("Signup failed. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during signup");
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      <div>
        <label className="text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded px-4 py-2 mt-1"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
          name="email"
            className="w-full border rounded px-4 py-2 mt-1"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
          name="password"
            className="w-full border rounded px-4 py-2 mt-1"
            placeholder="********"
          value={formData.password}
          onChange={handleChange}
            required
          minLength={8}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
          name="confirmPassword"
            className="w-full border rounded px-4 py-2 mt-1"
            placeholder="********"
          value={formData.confirmPassword}
          onChange={handleChange}
            required
          minLength={8}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 text-white py-2 rounded font-semibold"
        >
          Sign Up
        </button>

        <p className="text-xs text-gray-500 text-center">
        By signing up, you agree to our{" "}
        <a href="/terms" className="underline">Terms of Service</a> and{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>

      <p className="text-xs text-gray-500 text-center mt-4">
        Already have an account?{" "}
        <a href="/Login" className="underline text-cyan-700">Log in</a>
      </p>
    </form>
  );
}
