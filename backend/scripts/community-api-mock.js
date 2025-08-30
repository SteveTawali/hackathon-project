// Simple Node.js server to mock community API endpoints
// Run this if your Flask backend doesn't have community endpoints yet

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for posts (use database in production)
let posts = [
  {
    id: 1,
    content: "Welcome to our mental wellness community! 🌟",
    author: "MindWell Team",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    content: "Remember: It's okay to not be okay. You're not alone in this journey. 💙",
    author: "Community Member",
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  }
];

let nextId = 3;

// GET /api/community/posts - Fetch all posts
app.get('/api/community/posts', (req, res) => {
  console.log('Fetching posts...');
  res.json(posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST /api/community/posts - Create new post
app.post('/api/community/posts', (req, res) => {
  const { content, author } = req.body;
  
  if (!content || !content.trim()) {
    return res.status(400).json({ message: 'Content is required' });
  }

  const newPost = {
    id: nextId++,
    content: content.trim(),
    author: author || 'Anonymous',
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  console.log('New post created:', newPost);
  res.status(201).json(newPost);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Community API Mock Server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('  GET  /api/community/posts');
  console.log('  POST /api/community/posts');
  console.log('');
  console.log('💡 This is a mock server for testing community features.');
  console.log('   Replace with your Flask backend when ready!');
});

module.exports = app;
