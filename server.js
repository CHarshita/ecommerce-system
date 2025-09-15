// File: server.js

// 1. Import the packages we installed
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// 2. Set up the Express app
const app = express();
const port = 3000;

// 3. Configure middleware
app.use(cors()); // Allows your frontend to connect to this backend
app.use(express.json()); // Allows the server to understand JSON data

// 4. Connect to your MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hars_hita7611', // IMPORTANT: Change this to your actual MySQL password
    database: 'ecommerce_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database. ✅');
});

// 5. Create a test API endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!');
});

// Create the API endpoint to get all products
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM Products";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching products from database');
            return;
        }
        res.json(results); // Send the product list back as a JSON response
    });
});

// 6. Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`);
});