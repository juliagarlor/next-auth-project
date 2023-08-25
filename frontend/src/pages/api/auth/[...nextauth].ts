import NextAuth, { Account, NextAuthOptions, Profile, Session, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions: NextAuthOptions = {
  
    providers: [
        KeycloakProvider({
          clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
          clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
          issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
        }),          
    ], 
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {

      async jwt({ token, user, account, profile, isNewUser }:
        {token: JWT, user?: User | AdapterUser | undefined, account?: Account | null | undefined, profile?: Profile | undefined, isNewUser?: boolean | undefined}): Promise<JWT> {

          if (user) {
            token.id = user.id;
          }
          if(account) {
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
            token.idToken = account.id_token;
          }

        return token
      },
      async session( { session, token, user }: { session: Session, token: JWT, user: User | AdapterUser }) {
        //Image in session.user.image
        if (token && session.user) {
          session.user.id = token.id;
        }
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
        return session;
      },
    }, pages: {
        signIn: "/",
    }, events: {
      async signOut(message){
        const data = await fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout? 
        post_logout_redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_ROOT_PAGE)}&id_token_hint=${message.token.idToken}`);
        console.log("logout response status:")
        console.log(data.status)
      }
    }
  
}

export default NextAuth(authOptions)
