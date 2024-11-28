'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Blog {
  _id: string;
  title: string;
  tags: string;
  description: string;
  author: string;
}

export default function Profile() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<Blog | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');

        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to fetch blogs');
        }
      } catch (error) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormData(blog); // Set the formData when editing a blog
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        alert('Blog deleted successfully');
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      alert('Error deleting blog');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedBlog(null);
    setFormData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !selectedBlog?._id) return;

    try {
      const res = await fetch(`/api/blogs?id=${selectedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === selectedBlog?._id ? data.blog : blog
          )
        );
        setIsEditing(false);
        setSelectedBlog(null);
        setFormData(null);
      } else {
        alert(data.message || 'Failed to update blog');
      }
    } catch (error) {
      alert('Error updating blog');
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem('userId'); // Adjust as per your app's storage mechanism
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Your Blogs</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Log Out
      </button>

      {loading ? (
        <p className="text-center text-white text-lg animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-200">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <p className="text-center text-white text-lg">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition transform duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                <p className="text-sm text-gray-500 mt-2">{blog.tags}</p>
                <p className="mt-4 text-gray-600">{blog.description}</p>
                <p className="mt-6 text-gray-800 font-medium">
                  <span className="font-bold">Author:</span> {blog.author}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isEditing && formData && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl transform transition duration-300">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Blog</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-gray-900 rounded-md hover:bg-gray-500 transition"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
