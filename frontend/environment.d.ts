declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_ROOT_PAGE : string;
        NEXT_PUBLIC_BACKEND_BASE_URL: string;
        NEXT_PUBLIC_BACKEND_EXTERNAL_URL: string;
        NEXT_PUBLIC_KEYCLOAK_CLIENT_ID : string;
        NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET : string;
        NEXT_PUBLIC_KEYCLOAK_ISSUER : string;
        NEXT_PUBLIC_SECRET: string;
        NEXTAUTH_SECRET : string;
        NEXTAUTH_URL : string;
      }
    }
}

export {}