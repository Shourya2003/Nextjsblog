'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Check if the user is logged in by verifying localStorage for 'userId'
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login'); // Redirect to login if no userId found
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = { title, tags, description, author };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.success) {
        // Store the created blog in localStorage
        localStorage.setItem('createdBlog', JSON.stringify(blogData));
        // Navigate to the new component that displays the created blog
        router.push('/bloguser');
      } else {
        setErrorMessage(data.message || 'Error creating blog');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create blog, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl transform transition duration-300 hover:scale-105">
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">Create Your Blog</h1>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center bg-red-100 border border-red-400 rounded-md p-2">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Blog Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter tags"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog description"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
          >
            Save Blog 
          </button>
        </form>
      </div>
    </div>
  );
}
