// Create web server
const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// in-memory storage
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];
  res.send(comments);
});

// Create a new comment for a post
app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  res.status(201).send(comments);
});

// Start web server
app.listen(4001, () => {
  console.log('Comments listening on port 4001');
});