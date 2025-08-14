"use client";
import React from "react";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

interface AuthFormProps {
  title: string;
  subtitle?: string;
  fields: Field[];
  buttonText: string;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  children?: React.ReactNode;
  loading?: boolean;
}

export default function AuthForm({
  title,
  subtitle,
  fields,
  buttonText,
  error,
  onSubmit,
  children,
  loading,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4  rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
      {subtitle && <p className="text-center text-gray-500 mb-6">{subtitle}</p>}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          {error}
        </div>
      )}
      {fields.map((field) => (
        <div key={field.name}>
          <label className="text-sm font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            className="w-full border rounded px-4 py-2 mt-1"
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-[#017EA6] border-[1.12px] border-[#017EA6] text-white py-2 rounded-[8.97px] font-semibold mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Loading..." : buttonText}
      </button>
      {children}
    </form>
  );
} 