// server.js
const express = require('express');
const pool = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

// The express.json() function is a built-in middleware function in 
// It parses incoming requests with JSON payloads and is based on 
app.use(express.json());

//Code goes here
app.get('/api/posts', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM posts');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving items' });
    }
  });
app.get('/api/posts/:id', async(req, res) => {
  try {
      console.log("get a post with route parameter  request has arrived");
      // The req.params property is an object containing properties mapped to the named route "parameters". 
      // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
      const { id } = req.params; // assigning all route "parameters" to the id "object"
      const posts = await pool.query( // pool.query runs a single query on the database.
          //$1 is mapped to the first element of { id } (which is just the value of id). 
          "SELECT body FROM posts WHERE id = $1", [id]
      );
      res.json(posts.rows[0]); 
// we already know that the row array contains a single element, and here we are trying to access it
      // The res.json() function sends a JSON response. 
      // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
  } catch (err) {
      console.error(err.message);
  }
});

app.put('/api/posts/:id', async(req, res) => {
  try {
      const { id } = req.params;
      const post = req.body;
      console.log("update request has arrived");
      const updatepost = await pool.query(
        "UPDATE posts SET body = $2 WHERE id = $1", [id, post.body]
    );
      res.json(updatepost);
  } catch (err) {
      console.error(err.message);
  }
});

app.post('/api/posts/', async (req, res) => {
  try {
      console.log("a post request has arrived");
      const post = req.body;
      const newpost = await pool.query(
          "INSERT INTO posts(body, date) values ($1, $2) RETURNING*",
          [post.body, post.date]
      );
      res.json(newpost);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
  }
});

  app.delete('/auth/deleteall', async(req, res) => {
    try {
        //const post = req.body; // we do not need a body for a delete request
        console.log("delete all");
        const deletepost = await pool.query(
            "DELETE FROM posts"
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
}); 
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete a post request has arrived");
    const deletepost = await pool.query(
      "DELETE FROM posts WHERE id = $1",
      [id]
    );
    res.json(deletepost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});
