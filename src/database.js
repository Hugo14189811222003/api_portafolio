require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(client => {
        console.log('Conectado a PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.error('Error conectando a PostgreSQL:', err);
    });

module.exports = pool;
