import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { AccessTokenInterface } from '@/models/TokenInterface';
import router from 'next/router';
import { User } from '@/models/UserInterfaces';

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
        image: (session.user && session.user.image) ? session.user.image : "../styles/img/gengar.jpg"
      }
      setCurrentUser(loggedUser)
    }
	}, [status]);

  function logout(){
    signOut({ redirect: false, callbackUrl: "/" }).then((data) => {
      console.log(data);
      router.push("/");
    })
  }

  return (
    (status === "authenticated" && session) ? 
    <div className='min-h-screen flex flex-col'>
      <div className='flex-1 flex flex-row'>
        <div>
          <div>
            <img src="/img/gengar.jpg" alt="User photo" />
          </div>
          <div>
            <p>Name: {currentUser.name}</p>
            <p>Surname: {currentUser.surname}</p>
            <p>Email: {currentUser.email}</p>
          </div>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
     : <></>
  );
}
