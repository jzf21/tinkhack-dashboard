import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
export enum Role {
  user = "user",
  admin = "admin",
}

declare module "next-auth" {
  interface Session {
    /** The user's role. */
    role?: Role;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
   userRole?: "admin" | "seller";

    
  }
  interface Session extends DefaultSession{
      user : {
        role: string | undefined | null
    } & DefaultSession["user"]

  }
}
