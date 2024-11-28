"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-300">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex flex-col transition-all duration-500 ease-in-out`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-400">
          <h1
            className={`text-xl font-bold tracking-wide ${!isSidebarOpen && "hidden"}`}
          >
            My Blog
          </h1>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4 space-y-4">
          <Link
            href="/navbar"
            className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10l7-7m0 0l7 7M5 12h14M5 12v10m14-10v10"
              ></path>
            </svg>
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/profile"
            className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h16v16H4z"
              ></path>
            </svg>
            {isSidebarOpen && <span>Profile</span>}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <header className="bg-white shadow-lg p-6 flex items-center justify-between rounded-b-3xl mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <button
            onClick={() => router.push("/create-blog")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Blog
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-blue-50 p-8 flex justify-center items-center transition-all duration-500 ease-in-out">
          <div className="text-center p-10 bg-white shadow-xl rounded-2xl transform transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Welcome to My Blog! We Are Here For You
            </h3>
            <p className="text-gray-600 mb-8">
              Create your first blog and share your thoughts with the world.
            </p>
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Create Now
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
