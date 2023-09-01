import { AccessAndRefreshTokenInterface, AccessTokenInterface, NewTokenInterface, RefreshTokenInterface } from "@/models/TokenInterface";
import { getCookie, setCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";
import { signIn } from "next-auth/react";
import { DocumentContext } from "next/document";
import jwt_decode from "jwt-decode";
import { EXPIRED_TOKEN_ERROR } from "@/models/const/Constants";

export function login(): void{
    const callbackUrl = process.env.NEXT_PUBLIC_ROOT_PAGE + "inicio";
    signIn("keycloak",{ callbackUrl: callbackUrl });
}

export async function getAccessTokenFromContext(ctx: DocumentContext): Promise<string>{
    console.log("getting access token")
    const res: ServerResponse<IncomingMessage> = ctx.res!;
    const req: IncomingMessage = ctx.req!;
    const accessToken = getCookie("accessToken", { req, res});

    if(accessToken === null || accessToken === undefined){
        //User not logged. Go back to login page
        res.setHeader('Location', '/');
        res.statusCode = 302;
        res.end();
        return "";
    } else {
        //User logged. Check if token expired.
        const decodedAccessToken: RefreshTokenInterface = jwt_decode(accessToken.toString());
        const expirationDate = new Date(decodedAccessToken.exp * 1000);

        if(new Date() > expirationDate){
            //Token expired. Try to refresh.
            console.log("access token expired");
            const newTokens: AccessAndRefreshTokenInterface | string = await refreshTokensInContext(ctx);
            //If no error, return token, else, return error message.
            return typeof newTokens !== "string" ? newTokens.accessToken : newTokens;
        }
    }
    //Token valid. Return.
    return accessToken.toString();
}

export async function getAccessTokenClientSide(): Promise<string> {
    const accessToken : string = getCookie("accessToken")!.toString();
    const decodedAccessToken: AccessTokenInterface = jwt_decode(accessToken.toString());
    const expirationDate = new Date(decodedAccessToken.exp * 1000);

    if(new Date() > expirationDate){
        //Token expired. Try to refresh.
        console.log("access token expired");
        const newTokens: AccessAndRefreshTokenInterface | string = await refreshTokensOutOfContext();
        //If no error, return token, else, return error message.
        return typeof newTokens !== "string" ? newTokens.accessToken : newTokens;
    }

    return accessToken;
}

export async function refreshAccessToken(refreshToken: string): Promise<AccessAndRefreshTokenInterface | string> {
    const decodedRefreshToken: RefreshTokenInterface = jwt_decode(refreshToken);
    const expirationDate = new Date(decodedRefreshToken.exp * 1000);
    if(new Date() > expirationDate){
        console.log("Refresh token expired")
        return EXPIRED_TOKEN_ERROR;
    } else{
        console.log("Requesting new tokens")
        const bodyDetails = {
            client_id : process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
            grant_type : "refresh_token",
            client_secret : process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
            refresh_token : refreshToken
        }
    
        const body = encodeFormData(bodyDetails);
    
        const dataFetched = await fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body
        });
    
        console.log("Fetch status: " + dataFetched.status);
        const json: NewTokenInterface = await dataFetched.json();
        return {accessToken: json.access_token, refreshToken: json.refresh_token};
    }
}

export async function refreshTokensInContext(ctx: DocumentContext): Promise<AccessAndRefreshTokenInterface | string> {
    console.log("refreshing tokens")
    const res: ServerResponse<IncomingMessage> = ctx.res!;
    const req: IncomingMessage = ctx.req!;
    //Unauthorized. Refresh the access token
    const refreshToken = getCookie("refreshToken", { req, res});
    const newTokens: AccessAndRefreshTokenInterface | string = await refreshAccessToken(refreshToken!.toString());
    
    if(typeof newTokens !== "string"){
        //Setting new tokens
        setCookie("accessToken", newTokens!.accessToken, { req, res});
        setCookie("refreshToken", newTokens!.refreshToken, { req, res});
    }

    return newTokens;
}

export async function refreshTokensOutOfContext(): Promise<AccessAndRefreshTokenInterface | string> {
    console.log("refreshing tokens")
    //Unauthorized. Refresh the access token
    const refreshToken : string = getCookie("refreshToken")!.toString();
    const newTokens: AccessAndRefreshTokenInterface | string = await refreshAccessToken(refreshToken);
    
    if(typeof newTokens !== "string"){
        //Setting new tokens
        setCookie("accessToken", newTokens!.accessToken);
        setCookie("refreshToken", newTokens!.refreshToken);
    }

    return newTokens;
}

function encodeFormData(data: any): string{
    return Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join("&");
}
