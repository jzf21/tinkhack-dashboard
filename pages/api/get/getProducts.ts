import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Get a database client from the pool
      const client = await pool.connect();

      try {
        // Retrieve all products from the products table
        const query = 'SELECT * FROM products';
        const result = await client.query(query);

        // Send the retrieved products as the API response
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'An error occurred' });
      } finally {
        client.release(); // Release the connection
      }
    } catch (error) {
      console.error('Error connecting to database', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
