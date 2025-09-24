const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Adjust path if db.js is elsewhere

const router = express.Router();

// ROUTE 1: Register a new user using: POST "/api/auth/register"
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: "User with this email already exists." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save new user to the database
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
        if (error) throw error;
        res.status(201).json({ message: "User registered successfully!" });
      });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ROUTE 2: Login a user using: POST "/api/auth/login"
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secret from an env file in production

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

module.exports = router;