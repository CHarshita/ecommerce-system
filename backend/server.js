// File: backend/server.js (Final Version)
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
const port = 3000;
const JWT_SECRET = 'your_super_secret_key_that_is_long_and_random';

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hars_hita7611', // Your correct password
    database: 'ecommerce_db'
}).promise();

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- API Endpoints ---

// Product Endpoints
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Auth Endpoints
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO Users (Email, PasswordHash) VALUES (?, ?)';
        const [result] = await db.query(query, [email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email already exists.' });
        }
        console.error("Registration error:", err);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const query = 'SELECT * FROM Users WHERE Email = ?';
        const [users] = await db.query(query, [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const user = users[0];
        const isPasswordMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user.UserID, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// Order Endpoints
app.post('/api/orders', authenticateToken, async (req, res) => {
    const { customerDetails, cartItems, totalAmount } = req.body;
    const { userId } = req.user;
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        const orderQuery = `INSERT INTO orders (UserID, customer_name, customer_email, delivery_address, total_amount) VALUES (?, ?, ?, ?, ?)`;
        const [orderResult] = await connection.query(orderQuery, [userId, `${customerDetails.firstName} ${customerDetails.lastName}`, customerDetails.email, customerDetails.address, totalAmount]);
        const orderId = orderResult.insertId;
        const itemQuery = `INSERT INTO order_items (order_id, product_id, quantity, price_per_unit) VALUES ?`;
        const orderItemsData = cartItems.map(item => [orderId, item.id, item.quantity, item.price]);
        await connection.query(itemQuery, [orderItemsData]);
        await connection.commit();
        res.status(201).json({ message: 'Order placed successfully!', orderId: orderId });
    } catch (err) {
        await connection.rollback();
        console.error("Failed to create order:", err);
        res.status(500).json({ error: 'Failed to place order.' });
    } finally {
        connection.release();
    }
});

app.get('/api/my-orders', authenticateToken, async (req, res) => {
    try {
        const query = 'SELECT * FROM orders WHERE UserID = ? ORDER BY order_date DESC';
        const [orders] = await db.query(query, [req.user.userId]);
        res.json(orders);
    } catch (err) {
        console.error("Get my-orders error:", err);
        res.status(500).json({ message: "Failed to retrieve orders." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`);
});