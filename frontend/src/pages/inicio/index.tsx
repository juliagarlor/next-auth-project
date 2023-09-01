import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { AccessTokenInterface } from '@/models/TokenInterface';
import router from 'next/router';
import { User, UserRepresentation } from '@/models/UserInterfaces';
import UserCard from '@/components/UserCard';
import Header from '@/components/Header';
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DocumentContext } from 'next/document';
import { getTeamUsers } from '@/services/usersService';
import { EXPIRED_TOKEN_ERROR } from '@/models/const/Constants';
import { setCookie } from 'cookies-next';
import { deleteCookies } from '@/services/utils';
import TeamTable from '@/components/TeamTable';

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
  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    surname: "",
    email: "",
    image: "/img/gengar.jpg"
  });
  const [teamUsers, setTeamUsers] = useState<UserRepresentation[]>([]);
  const [isCookieSet, setIsCookieSet] = useState<boolean>(hasCookies);

  useEffect(() => {
    if(status === "authenticated" && !isCookieSet){
      const accessToken = session.accessToken!.toString();
      const decodedAccessToken: AccessTokenInterface = jwt_decode(accessToken);
      const loggedUser: User = {
        name: decodedAccessToken.given_name,
        surname: decodedAccessToken.family_name,
        email: decodedAccessToken.email,
        image: decodedAccessToken.image
      }
      setCurrentUser(loggedUser);
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", session.refreshToken!.toString());
      setIsCookieSet(true);
    }
	}, [status]);

  useEffect(() => {
    if(currentUser.name.length > 0){
      getTeamUsers().then((data: string | UserRepresentation[]) => {
        if(typeof data === "string"){
          signOut({ redirect: false, callbackUrl: "/" }).then((data) => {
            deleteCookies();
            router.push(data.url);
          })
        }else{
          setTeamUsers(data);
        }
      })
    }
  }, [currentUser])

  return (
    (status === "authenticated" && session) ? 
    <div className='min-h-screen flex flex-col'>
      <Header></Header>
      <div className='flex flex-col my-5'>
        <Divider textAlign="left">MY PROFILE</Divider>
        <div className='my-3 w-full flex justify-around'>
          <UserCard user={currentUser}></UserCard>
        </div>
        <Divider textAlign="left">MY TEAM</Divider>
        <div className='my-3 w-full flex justify-around'>
          {teamUsers.length > 0 && 
          <TeamTable userList={teamUsers}></TeamTable>
          }
        </div>
      </div>
    </div>
     : <></>
  );
}
