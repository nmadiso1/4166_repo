import express from 'express';
import { fileURLToPath } from 'url';
import {
  resetPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
  listPosts
} from './blogService.js';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- Routes -------------------

// Reset all posts
app.post('/reset', async (req, res) => {
  await resetPosts();
  res.status(200).json({ message: 'Posts have been reset' });
});

// CREATE a post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = await createPost(title, content);
  res.status(201).json(newPost);
});

// READ a post
app.get('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  const post = await readPost(id);

  if (!post) {
    return res.status(404).json({ error: `Post ${id} not found` });
  }

  res.status(200).json(post);
});

// UPDATE a post
app.put('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ error: 'Either title or content must be provided' });
  }

  const updated = await updatePost(id, title, content);

  if (!updated) {
    return res.status(404).json({ error: `Post ${id} not found` });
  }

  res.status(200).json({ message: `Post ${id} updated` });
});

// DELETE a post
app.delete('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await deletePost(id);

  if (!deleted) {
    return res.status(404).json({ error: `Post ${id} not found` });
  }

  res.status(200).json({ message: `Post ${id} deleted` });
});

// LIST all posts
app.get('/posts', async (req, res) => {
  const posts = await listPosts();
  res.status(200).json(posts);
});

// ------------------- Start Server -------------------

if (process.argv[1] === __filename) {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
