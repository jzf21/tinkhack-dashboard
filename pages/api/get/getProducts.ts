import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../supabase';
import { getToken } from 'next-auth/jwt';
import { createClient } from '@supabase/supabase-js'; // Import the Supabase client

// Define the Seller and Product types here
interface Seller {
  id: number;
  name: string;
  // Add other properties as needed
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller_id: number;
  seller_name: string; // Include the seller_name alias from the SELECT query
  imglink: string;
  // Add other properties as needed
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = await getToken({ req });
    console.log(token, req);

    if (token) {
      // Token exists
      console.log('JSON Web Token', JSON.stringify(token, null, 2));
      const email = token.email;

      try {
        // Get a database client from the pool
        const client = await pool.connect();

        try {
          // Retrieve all products from the products table along with seller information
          const query = 'SELECT products.*, sellers.name AS seller_name FROM products, sellers WHERE products.seller_id = sellers.id';
          const result = await client.query<Product>(query); // Use the Product type here

          // Fetch the images for each product and associate them in the response
          const supabaseUrl: string = process.env.SUPABASE_URL || ''
const supabaseKey: string = process.env.SUPABASE_KEY || ''

          const supabase = createClient(supabaseUrl, supabaseKey);

          const productsWithImages = await Promise.all(
            result.rows.map(async (product) => {
              console.log('product', product);
              try {
                const { data } = await supabase.storage
                  .from('image')
                  .getPublicUrl(product.imglink);

                return { ...product, imageUrl: data.publicUrl }; // Access public URL using data.publicUrl
              } catch (error) {
                console.error('Error getting public URL for product', product.id, error);
                return { ...product, imageUrl: null }; // If image URL not found or error occurs, set it to null
              }
            })
          );

          // Send the retrieved products with image URLs as the API response
          res.status(200).json(productsWithImages);
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
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
