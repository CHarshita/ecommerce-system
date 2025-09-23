// File: server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hars_hita711', // Your password
    database: 'ecommerce_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database. ✅');
});

// --- API Endpoints ---

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!');
});

// Endpoint to get ALL products
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM Products";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching products from database');
        }
        res.json(results);
    });
});

// ✨ NEW: Endpoint to get a SINGLE product by its ID ✨
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id; // Get the ID from the URL parameter
    const sql = "SELECT * FROM Products WHERE ProductID = ?";
    
    db.query(sql, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        // If no product is found with that ID
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Send the first (and only) result
        res.json(results[0]); 
    });
});


// User Registration Endpoint
app.post('/api/register', (req, res) => {
    // ... (your existing register code)
});

// User Login Endpoint
app.post('/api/login', (req, res) => {
    // ... (your existing login code)
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`);
});