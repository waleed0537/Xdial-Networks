import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React build directory
app.use(express.static(path.join(import.meta.dir, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(import.meta.dir, 'dist', 'index.html'));
});

// Optional: Add API routes before the catch-all route
app.get('/api/example', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});