import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.USER,
  host: process.env.SUPABASE_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Only if you're facing SSL issues
  },
});

export default async function handler(req, res) {
  const client = await pool.connect();

  try {
    // Perform database operations using the client
    const { rows } = await client.query('SELECT * FROM sellers');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    client.release(); // Release the connection
  }
}
