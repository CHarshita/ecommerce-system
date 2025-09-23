const mysql = require('mysql2');

// It's highly recommended to use environment variables for sensitive data
// For now, we can hardcode them to get started.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Or your MySQL username
    password: 'Hars_hita7611', // Replace with your MySQL password
    database: 'ecommerce_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool's promise-based interface
module.exports = pool.promise();