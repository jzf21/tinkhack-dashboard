import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from '../../../utils/supabase'
import { pool } from "../supabase"


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {

        token.userRole = "admin";
        
      
        return token;
      }

      // If there is no user data, fetch it from the database
      if (token && token.email) {
        const client = await pool.connect();
        try {
          const { rows } = await client.query(
            "SELECT * FROM sellers WHERE email = $1",
            [token.email]
          );
            
          

          if (rows.length === 0) {
            // Insert a new record into the "sellers" table
            await client.query(
              "INSERT INTO sellers (email, name) VALUES ($1, $2)",
              [token.email, token.name]
            );
          }
        else{
          try{
            const { rows } = await client.query(
              "SELECT * FROM sellers WHERE email = $1 and role = true",
              [token.email]
            );
            if(rows.length === 0){
              
            }
            else{
              token.userRole = "seller";
            }
          }
          catch(error){
            console.log(error);
          }

        }
        } catch (error) {
          console.error("Error executing query", error);
        } finally {
          client.release(); // Release the connection
        }
      }

      return token;
    },

    async session({ session, token }) {
      if(session.user && token.userRole){
        
        session.user.role= token.userRole;
      }

      
      
      
      
      // console.log(session,token);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
}

export default NextAuth(authOptions)
