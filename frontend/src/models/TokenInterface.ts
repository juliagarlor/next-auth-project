export interface AccessTokenInterface {
    exp: number, 
    iat: number,
    auth_time: number, 
    jti: string, 
    iss: string, 
    aud: string, 
    //user id on keycloak
    sub: string, 
    typ: string , 
    azp: string, 
    session_state: string, 
    acr: number, 
    "allowed-origins": string[], 
    realm_access: { 
        //roles of the user in the realm
        roles: string[]
    }, 
    resource_access: { 
        account: { 
            //default account roles
            roles: string[]
        }
    }, 
    scope: string,
    //session id 
    sid: string, 
    email_verified: boolean, 
    //name and surname
    name: string, 
    preferred_username: string, 
    //name
    given_name: string, 
    //surname
    family_name: string, 
    email: string 
}

export interface NewTokenInterface {
    access_token: string,
    expires_in: number,
    id_token: string,
    "not-before-policy": number,
    refresh_expires_in: number,
    refresh_token: string,
    scope: string,
    session_state: string,
    token_type: string
}

export interface AccessAndRefreshTokenInterface{
    accessToken: string,
    refreshToken: string
}

export interface RefreshTokenInterface{
    exp: number,
    iat: number,
    jti: string,
    iss: string,
    aud: string,
    sub: string,
    typ: string,
    azp: string,
    session_state: string,
    scope: string,
    sid: string
}
