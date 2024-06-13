const mysql = require('mysql2/promise');

let pool;

const connectDatabase = async () => {
    try {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'revest_salesorders',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        await pool.getConnection(); 
        // console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error; // Throw error 
    }
};

const runQuery = async (query, values = []) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(query, values);
            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
    }
};

module.exports = {
    connectDatabase,
    runQuery
};