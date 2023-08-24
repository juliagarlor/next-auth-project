import { DocumentContext } from "next/document";
import { getAccessTokenFromContext } from "./tokensService";
import { UserRepresentation } from "@/models/UserInterfaces";
import { EXPIRED_TOKEN_ERROR } from "@/models/const/Constants";

const baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const externalBaseUrl: string = process.env.NEXT_PUBLIC_BACKEND_EXTERNAL_URL;

export async function getUsers(ctx: DocumentContext): Promise<UserRepresentation[] | string>{
    const accessToken = await getAccessTokenFromContext(ctx);
    let data: UserRepresentation[] = [];

    if(accessToken.length === 0){
      return data;
    }else if(accessToken === EXPIRED_TOKEN_ERROR){
      return accessToken;
    }

    try{
        let response = await getUsersRequest(accessToken);
        if(response.status === 200){
            data = await response.json();
        }else {
          console.log(`An error occurred. Users service response status: ${response.status}`);
        }
    }catch(error){
        console.error("Service temporarily unavailable. Try again in a moment.")
    }

    return data;
}

async function getUsersRequest(accessToken: string): Promise<Response>{
  console.log("Fetching all users")
    const authorization: string = `Bearer ${accessToken}`;

    const dataFetched = await fetch(`${baseUrl}getuserslist`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : authorization
        }
    });
    
    return dataFetched;
}

export async function getReviewers(ctx: DocumentContext): Promise<string[] | string> {
    let data: string[] = [];
    const accessToken = await getAccessTokenFromContext(ctx);

    if(accessToken.length === 0){
      return data;
    }else if(accessToken === EXPIRED_TOKEN_ERROR){
      return accessToken;
    }
  
    try {
      let response = await getReviewersRequest(accessToken);
      if (response.status === 200) {
        data = await response.json();
      } else {
        console.log(`An error occurred. Users service response status: ${response.status}`);
      }

    } catch (error) {
      console.error("Service temporarily unavailable. Try again in a moment.");
    }

    return data;
  }

async function getReviewersRequest(accessToken: string): Promise<Response>{
  console.log("Fetching reviewers list")
    const authorization: string = `Bearer ${accessToken}`;

    const dataFetched = await fetch(`${baseUrl}users/reviewers`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : authorization
        }
    });
    
    return dataFetched;
}

/*
async function filterAlertsRequest(accessToken: string, filter: AlertsFilter): Promise<Response> {
    console.log("Filtering alerts")
    const authorization: string = `Bearer ${accessToken}`;

    const dataFetched = await fetch(`${externalBaseUrl}filter`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : authorization
        },
        body: JSON.stringify(filter)
    });

    return dataFetched;
}
 */
