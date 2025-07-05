const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const connection = require('./db'); // using db.js file

const app = express();
const PORT = 5500;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve all static files from current directory

app.use(session({
  secret: 'iwt@project', // change this to something secure
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // use true only with HTTPS
}));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/homepage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

//signup route
app.post('/signup', (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  const query = `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`;

  connection.query(query, [name, email, phone, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send("Email already exists");
      }
      return res.status(500).send("Signup failed: " + err.message);
    }

    return res.status(200).send("Signup successful");
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send("Server error");
    }

    if (results.length > 0) {
      req.session.user = results[0]; // Store user in session
      return res.status(200).send("Login successful");
    } else {
      return res.status(401).send("Incorrect email or password. Please sign up first.");
    }
  });
});

// Auth Status Route
app.get('/auth-status', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, username: req.session.user.name });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

