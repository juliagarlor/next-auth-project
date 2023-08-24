import NextAuth, { Account, DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
/*     interface Account {
      accessToken?: string;
    } */
    interface User {
      id?: string;
    }
    interface Session extends DefaultSession {
      user?: User;
      accessToken?: string;
      refreshToken?:string;
      idToken?:string;
    }
  }


declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        accessToken?:string;
        refreshToken?:string;
        idToken?:string;
    }
}