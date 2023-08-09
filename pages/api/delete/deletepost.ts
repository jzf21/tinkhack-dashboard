import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../supabase';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const token = await getToken({ req });
      const id = parseInt(req.query.id as string, 10);

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const email = token.email as string;
      const client = await pool.connect();

      try {
        const query = `
          DELETE FROM products
          WHERE id = $1
          AND seller_id = (
            SELECT id
            FROM sellers
            WHERE email = $2
          )
        `;
        const values = [id, email];

        await client.query(query, values);

        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error executing query', error);
        await client.query('ROLLBACK'); // Rollback any changes
        return res.status(500).json({ error: 'An error occurred' });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error connecting to the database', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
