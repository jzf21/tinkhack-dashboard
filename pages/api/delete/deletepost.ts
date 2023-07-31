import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../supabase';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const token = await getToken({ req });
    const id = req.query.id;

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const email = token.email as string;

    try {
      const client = await pool.connect();

      try {
           const query = `
        delete from products
        where id = ${id}
        and seller_id = (
          select id
          from sellers
          where email = ${email}
        )
      `;
       
        const result = await client.query(query);

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
