import { signOut } from "next-auth/react";
import router from "next/router";

export default function Header(){

    function logout(){
        signOut({ redirect: false, callbackUrl: "/" }).then((data) => {
            console.log(data);
            router.push("/");
        })
    }

    return (
        <div className="m-3">
            <button onClick={logout}>Logout</button>
        </div>
    );
}