import { login } from "@/services/tokensService";
import { deleteCookies } from "@/services/utils";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status === "unauthenticated"){
      console.log("loging in")
      login();
    } else if (status === "authenticated"){
      signOut({ redirect: false, callbackUrl: "/" }).then((data) => {
        deleteCookies();
        router.push(data.url);
      })
    }
	}, [status]);

  return (
    <div className='p-8 justify-center items-center h-screen flex'>
      Welcome
    </div>
  );
}
