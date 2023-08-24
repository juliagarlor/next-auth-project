import { hasCookie, setCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { AccessTokenInterface } from '@/models/TokenInterface';
import { DefaultRoles } from '@/models/const/Constants';
import { DocumentContext } from 'next/document';
import { IncomingMessage, ServerResponse } from 'http';
import router from 'next/router';

/*  session: {
      accessToken: string, //Bearer token for Keycloak api requests. If decoded, roles can be extracted
      expires: Date,
      user: {
        email: string,
        id: string,
        name: string
      }
} 
*/

interface Props{
  hasCookies: boolean
}

export default function Home({hasCookies} : Props) {
  const { data: session, status } = useSession({
    required: true,
    async onUnauthenticated(){
      console.log("not authenticated yet");
      router.push({
        pathname: "/"
      });
    }
  });
  const [selectedRol, setSelectedRol] = useState<string>("");
  const [isCookieSet, setIsCookieSet] = useState<boolean>(hasCookies);

  useEffect(() => {
    if(status === "authenticated" && !hasCookies){
      const accessToken = session.accessToken!.toString();
      const decodedAccessToken: AccessTokenInterface = jwt_decode(accessToken);
      //filter to get rid of the default roles
      filterUserRoles(decodedAccessToken);
      setCookies(accessToken, session.refreshToken!.toString(), decodedAccessToken);
    }
	}, [status]);
  
  function filterUserRoles(accessToken: AccessTokenInterface): void {
    accessToken.realm_access.roles = accessToken.realm_access.roles.filter((rol: string) => !DefaultRoles.includes(rol));
  }

  function setCookies(accessToken: string, refreshToken: string, decodedAccessToken: AccessTokenInterface): void {
    console.log("setting cookies")
    setCookie("name", decodedAccessToken.name);
    setCookie("userId", decodedAccessToken.sub);
    setCookie("roles", decodedAccessToken.realm_access.roles);
    setCookie("refreshToken", refreshToken);
    setCookie("accessToken", accessToken);
    setIsCookieSet(true);
  } 

  return (
    (status === "authenticated" && session) ? 
    <div className='min-h-screen flex flex-col'>
      <div className='flex-1 flex flex-row'>
        <div>
          hola
        </div>
      </div>
    </div>
     : <></>
  );
}

export async function getServerSideProps(ctx: DocumentContext) {
  const res: ServerResponse<IncomingMessage> = ctx.res!;
  const req: IncomingMessage = ctx.req!;
  const hasAccessToken = hasCookie("accessToken", { req, res});

  return { props: {
    hasCookies: hasAccessToken
  }}
}
