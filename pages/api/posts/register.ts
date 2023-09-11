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
      const { GSTIN, PAN, IFSC, ACCNO, AADHAR } = req.body;
      const aadhar = req.body.aadhar;
      const  companypan = req.body.companypan
      const pan = req.body.pan;

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

        // Insert new seller details into the sellerdetails table
        const insertQuery =
          'INSERT INTO sellerdetails (GSTIN, PAN, IFSC, ACCNO, AADHAR, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const insertValues = [GSTIN, PAN, IFSC, ACCNO, AADHAR, sellerId];
        const insertResult = await client.query(insertQuery, insertValues);
         // Upload the image to Supabase storage
         const insertRole= await client.query('update sellers set role = true where id= $1 RETURNING *',[sellerId]);
        const { data, error } = await supabase.storage.from('image') // Replace 'YOUR_SUPABASE_STORAGE_BUCKET' with your actual bucket name
          .upload(`/${insertResult.rows[0].seller_id}/${insertResult.rows[0].gstin}.png`, Buffer.from(aadhar, 'base64'));
     

        if (error) {
          console.error('Error uploading image:', error);
          res.status(500).json({ error: 'An error occurred while uploading the image' });
          return;
        }

        // Update the product with the image URL (imglink)
        // Update the product with the image URL (imglink)
        const imageUrl = data.path; // Use data.path instead of data.Location
        const updateQuery = 'UPDATE sellerdetails SET pan = $1 WHERE id = $2';
        const updateValues = [imageUrl, insertResult.rows[0].id];
        await client.query(updateQuery, updateValues);
           const { data:data1, error:error1 } = await supabase.storage.from('image') // Replace 'YOUR_SUPABASE_STORAGE_BUCKET' with your actual bucket name
          .upload(`/${insertResult.rows[0].seller_id}/${insertResult.rows[0].pan}.png`, Buffer.from(pan, 'base64'));
        
          if(error1){
            console.error('Error uploading image:', error1);
          res.status(500).json({ error: 'An error occurred while uploading the image' });
          return;
          }

        const imageUrl1 = data1.path; // Use data.path instead of data.Location
        const updateQuery1 = 'UPDATE sellerdetails SET aadhar = $1 WHERE id = $2';
        const updateValues1 = [imageUrl1, insertResult.rows[0].id];
        await client.query(updateQuery1, updateValues1);
          
        const {data:data2,error:error2} = await supabase.storage.from('image') // Replace 'YOUR_SUPABASE_STORAGE_BUCKET' with your actual bucket name
          .upload(`/${insertResult.rows[0].seller_id}/${insertResult.rows[0].companypan}`, Buffer.from(companypan, 'base64'));

          if(error2){
            console.error('Error uploading image:', error2);
          res.status(500).json({ error: 'An error occurred while uploading the image' });
          return;
          }
        const imageUrl2 = data2.path; // Use data.path instead of data.Location
        const updateQuery2 = 'UPDATE sellerdetails SET companypan = $1 WHERE id = $2';
        const updateValues2 = [imageUrl2, insertResult.rows[0].id];
        await client.query(updateQuery2, updateValues2);


          

        // Send the newly created seller details as the API response
        res.status(201).json({ ...insertResult.rows[0] });
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
