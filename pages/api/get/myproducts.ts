import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../supabase';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = await getToken({ req });

    

    const email = token.email as string;

    try {
      const client = await pool.connect();

      try {
        const query = 'SELECT * FROM products WHERE seller_id = (SELECT id FROM sellers WHERE email = $1)';
        const values = [email];
        const result = await client.query(query, values);

        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'An error occurred' });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error connecting to the database', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
