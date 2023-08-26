import { signOut } from "next-auth/react";
import router from "next/router";
import {CiLogout} from "react-icons/ci";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

export default function Header(){

    function logout(){
        signOut({ redirect: false, callbackUrl: "/" }).then((data) => {
            console.log(data);
            router.push("/");
        })
    }

    return (
        <div className="p-3 flex justify-between dark:bg-[#171717] dark:shadow-none bg-white shadow">
            <div className="flex flex-row content-center">
                <img src="img/team_rocket_logo.png" alt="logo" className="object-scale-down h-20"/>
                <div className="flex items-center p-3">
                  <Typography variant="overline" fontSize={13}>TEAM ROCKET</Typography>  
                </div>
                
            </div>
            <div className="flex items-center">
                <Button onClick={logout} color="inherit" endIcon={<CiLogout />}>
                Logout
                </Button>
            </div>
        </div>
    );
}