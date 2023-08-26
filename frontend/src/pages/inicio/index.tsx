import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { AccessTokenInterface } from '@/models/TokenInterface';
import router from 'next/router';
import { User } from '@/models/UserInterfaces';
import UserCard from '@/components/UserCard';
import Header from '@/components/Header';

export default function Home() {
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
    image: "../styles/img/gengar.jpg"
  });

  useEffect(() => {
    if(status === "authenticated"){
      const accessToken = session.accessToken!.toString();
      const decodedAccessToken: AccessTokenInterface = jwt_decode(accessToken);
      const loggedUser: User = {
        name: decodedAccessToken.given_name,
        surname: decodedAccessToken.family_name,
        email: decodedAccessToken.email,
        image: decodedAccessToken.image
      }
      setCurrentUser(loggedUser)
    }
	}, [status]);

  return (
    (status === "authenticated" && session) ? 
    <div className='min-h-screen flex flex-col'>
      <Header></Header>
      <div className='flex flex-col'>
        <div className='my-3 w-full flex justify-around'>
          <UserCard user={currentUser}></UserCard>
        </div>
      </div>
    </div>
     : <></>
  );
}
