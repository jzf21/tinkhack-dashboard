import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../supabase';
import { getToken } from 'next-auth/jwt';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = await getToken({ req });

    try {
      // Extract data from the request body
      const { productName, price, quantity, size } = req.body;
      const imageBase64 = req.body.imageLink; // Assuming the image data is sent as "image" in the request body

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const email = token.email as string;

      // Get a database client from the pool
      const client = await pool.connect();

      try {
        // Retrieve the seller ID from the sellers table
        const query = 'SELECT id FROM sellers WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rowCount === 0) {
          // Seller not found
          res.status(404).json({ error: 'Seller not found' });
          return;
        }

        const sellerId = result.rows[0].id;

        // Insert a new product into the products table
        const insertQuery =
          'INSERT INTO products (seller_id, title, price, quantity, size, imglink) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const insertValues = [sellerId, productName, price, quantity, size, '']; // Initialize imglink as an empty string
        const insertResult = await client.query(insertQuery, insertValues);

        // Upload the image to Supabase storage
        const { data, error } = await supabase.storage.from('image') // Replace 'YOUR_SUPABASE_STORAGE_BUCKET' with your actual bucket name
          .upload(`${insertResult.rows[0].id}.png`, Buffer.from(imageBase64, 'base64'));

        if (error) {
          console.error('Error uploading image:', error);
          res.status(500).json({ error: 'An error occurred while uploading the image' });
          return;
        }

        // Update the product with the image URL (imglink)
        // Update the product with the image URL (imglink)
        const imageUrl = data.path; // Use data.path instead of data.Location
        const updateQuery = 'UPDATE products SET imglink = $1 WHERE id = $2';
        const updateValues = [imageUrl, insertResult.rows[0].id];
        await client.query(updateQuery, updateValues);

        // Send the newly created product as the API response
        res.status(201).json({ ...insertResult.rows[0], imglink: imageUrl });
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
