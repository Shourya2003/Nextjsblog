import { NextApiRequest, NextApiResponse } from 'next';
import Blog from '@/model/page';
import connectDB from '@/lib/mongoose'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const blogs = await Blog.find({});
      return res.status(200).json({ success: true, blogs });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ success: false, message: 'Error fetching blogs' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { title, tags, description, author } = req.body;

      if (!title || !tags || !description || !author) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      const newBlog = new Blog({ title, tags, description, author });
      await newBlog.save();

      return res.status(201).json({ success: true, message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
      console.error('Error creating blog:', error);
      return res.status(500).json({ success: false, message: 'Error creating blog' });
    }
  }

  else if (req.method === 'PUT') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: 'Blog ID is required' });
    }

    try {
      const { title, tags, description, author } = req.body;

      
      if (!title && !tags && !description && !author) {
        return res.status(400).json({ success: false, message: 'At least one field is required to update' });
      }

     
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, tags, description, author },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      return res.status(200).json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ success: false, message: 'Error updating blog' });
    }
  }

 
  else if (req.method === 'DELETE') {
    const { id } = req.query; 

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: 'Blog ID is required' });
    }

    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.status(500).json({ success: false, message: 'Error deleting blog' });
    }
  }

  else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

