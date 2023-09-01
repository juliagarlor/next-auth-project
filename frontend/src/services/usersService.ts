import { DocumentContext } from "next/document";
import { getAccessTokenClientSide, getAccessTokenFromContext } from "./tokensService";
import { UserRepresentation } from "@/models/UserInterfaces";
import { EXPIRED_TOKEN_ERROR } from "@/models/const/Constants";

const baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const externalBaseUrl: string = process.env.NEXT_PUBLIC_BACKEND_EXTERNAL_URL;

export async function getTeamUsers(): Promise< UserRepresentation[] | string > {
    let data: UserRepresentation[] = [];
    const accessToken = await getAccessTokenClientSide();

    if(accessToken.length === 0){
      return data;
    }else if(accessToken === EXPIRED_TOKEN_ERROR){
      return accessToken;
    }
  
    try {
      let response = await getTeamUsersRequest(accessToken);
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

async function getTeamUsersRequest(accessToken: string): Promise<Response>{
  console.log("Fetching reviewers list")
    const authorization: string = `Bearer ${accessToken}`;

    const dataFetched = await fetch(`${baseUrl}users/team`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : authorization
        }
    });
    
    return dataFetched;
}
