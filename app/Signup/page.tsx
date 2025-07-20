/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/auth/AuthContext";
import AuthLayout from "../components/auth/AuthLayout";
import Logo from "../components/Logo";
import AuthForm from "../components/auth/AuthForm";
import ChartPreview from "../components/Chartpreview";

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <AuthLayout
      logo={<Logo src="/logo.png" alt="Powder Logo" width={120} height={120} className="mb-4" />}
      form={
        <AuthForm
          title="Sign up"
          subtitle="Access and manage your claims"
          fields={[
            {
              name: "name",
              label: "Full Name",
              type: "text",
              placeholder: "John Doe",
              value: formData.name,
              onChange: handleChange,
              required: true,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "john@example.com",
              value: formData.email,
              onChange: handleChange,
              required: true,
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "********",
              value: formData.password,
              onChange: handleChange,
              required: true,
            },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
              placeholder: "********",
              value: formData.confirmPassword,
              onChange: handleChange,
              required: true,
            },
          ]}
          buttonText="Sign Up"
          error={error}
          onSubmit={handleSubmit}
          loading={isLoading}
        >
          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our {" "}
            <a href="/terms" className="underline">Terms of Service</a> and {" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
          <p className="text-xs text-gray-500 text-center mt-4">
            Already have an account? {" "}
            <a href="/Login" className="underline text-cyan-700">Log in</a>
          </p>
        </AuthForm>
      }
      infoPanel={<ChartPreview />}
      supportEmail="help@powder.health"
    />
  );
}
