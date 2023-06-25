import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import { supabase } from '../../../utils/supabase'
import { pool } from "../supabase" 
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
   
 
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
  ],
  
  
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      console.log(token)
      const client = await pool.connect();
      
       try {
    // Perform database operations using the client
    const { rows } = await client.query(
      "SELECT * FROM sellers WHERE email = $1",
      [token.email]
    );
    console.log(rows)
     if (rows.length===0) {
      // Insert a new record into the "sellers" table
      await client.query("INSERT INTO sellers (email, name) VALUES ($1, $2)", [
        token.email,
        token.name,
      ]);

   
  }} catch (error) {
    console.error('Error executing query', error);
  
  } finally {
    client.release(); // Release the connection
  }
      return token
    },
  },
 
}

export default NextAuth(authOptions)
