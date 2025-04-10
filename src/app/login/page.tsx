"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { singInWithEmailAndPassword } from "../auth/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await singInWithEmailAndPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error);
    } else {
      console.log("Logged in successfully:", data);
      router.push("/");
    }
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Log In
        </button>
      </form>
      <Link href="/register" className="text-sm text-gray-500">
        Don&apos;t have an account? Register
      </Link>
    </div>
  );
}
