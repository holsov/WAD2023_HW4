const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});



app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; 

    let authenticated = false; 
    try {
        if (token) { 
         
            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); 
                } else { 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            })
        } else { 
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); 
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");

        const { email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(email);
        const authUser = await pool.query(
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); 
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

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
      const { id } = req.params;
      const posts = await pool.query( 

          "SELECT body FROM posts WHERE id = $1", [id]
      );
      res.json(posts.rows[0]); 
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