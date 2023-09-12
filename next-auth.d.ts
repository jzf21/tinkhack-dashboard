import "next-auth/jwt"
import "next-auth"
import { DefaultSession } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
export enum Role {
  user = "user",
  admin = "admin",
}


declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
   userRole?: "admin" | "seller";

    
  }

}

declare module "next-auth" {
  interface Session {
    /** The user's role. */
    userRole?: "admin" | "seller";
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}



