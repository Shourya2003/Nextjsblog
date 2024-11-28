'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatedBlog() {
  const [createdBlog, setCreatedBlog] = useState<any | null>(null);
  const router = useRouter();

  // Fetch the latest created blog from localStorage or backend
  useEffect(() => {
    const blog = JSON.parse(localStorage.getItem('createdBlog') || 'null');
    if (!blog) {
      router.push('/dashboard'); // Redirect if no blog found
    } else {
      setCreatedBlog(blog); // Set the created blog to display
    }
  }, [router]);

  if (!createdBlog) return null; // Render nothing if the blog isn't found

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl transform transition duration-300 hover:scale-105">
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">Your Created Blog</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">{createdBlog.title}</h2>
          <p className="text-sm text-gray-500 mb-2"><strong>Tags:</strong> {createdBlog.tags}</p>
          <p className="text-gray-700 mb-4">{createdBlog.description}</p>
          <p className="text-sm text-gray-500"><strong>Author:</strong> {createdBlog.author}</p>
        </div>

        <button
          onClick={() => router.push('/profile')}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}
