const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example data for posts
const posts = [
  { id: 1, title: 'My first post', content: 'This is my first post!' },
  { id: 2, title: 'Another day', content: 'Just chilling today.' },
  { id: 3, title: 'Learning React', content: 'React is awesome!' },
];

// API route to get posts
app.get('/api/posts', (req, res) => {
  res.json(posts); // Sends the posts array as a JSON response
});


app.get('/', (req, res) => {
  res.send('Backend is up and running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
