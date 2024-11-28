"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      // Assuming the backend returns a 'userId' after a successful login
      localStorage.setItem('userId', data.userId); // Store userId in localStorage
      router.push("/dashboard"); // Redirect to dashboard on successful login
    } else {
      setError(data.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-md">
        Welcome Back to <span className="text-yellow-300">BlogVerse</span>
      </h1>
      <p className="text-lg text-white mb-8 italic">
        Continue your journey of sharing and exploring.
      </p>

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
          Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Access your account and stay connected!
        </p>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a
            href="/"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Sign Up here
          </a>
        </p>
      </div>
    </div>
  );
}
