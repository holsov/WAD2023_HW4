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

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
