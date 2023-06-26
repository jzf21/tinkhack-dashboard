import { NextApiRequest, NextApiResponse } from 'next';

import { pool } from '../supabase';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract data from the request body
      const { sellerEmail, productName, price,quantity,size } = req.body;
      console.log(req.body);

      // Get a database client from the pool
      const client = await pool.connect();

      try {
        // Retrieve the seller ID from the sellers table
        const query = 'SELECT id FROM sellers WHERE email = $1';
        const values = [sellerEmail];
        console.log(values[0]);
        const result = await client.query(query, values);

        if (result.rowCount === 0) {
          // Seller not found
          res.status(404).json({ error: 'Seller not found' });
          return;
        }

        const sellerId = result.rows[0].id;
        console.log(sellerId);

        // Insert a new product into the products table
        const insertQuery =
          'INSERT INTO products (seller_id,title, price,quantity,size) VALUES ($1, $2, $3, $4,$5) RETURNING *';
        const insertValues = [sellerId, productName, price,quantity,size];
        const insertResult = await client.query(insertQuery, insertValues);

        // Send the newly created product as the API response
        res.status(201).json(insertResult.rows[0]);
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
