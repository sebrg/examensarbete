import React, { CSSProperties } from 'react';
import { getAuth, signOut } from "firebase/auth";




export default function Logout() {

    const auth = getAuth();

    const logOut = (auth: any) => {
        console.log(auth.currentUser)
        signOut(auth).then(() => {
          console.log("signed out")
          console.log(auth.currentUser)
        }).catch((error) => {
          console.log(error)
        });
    }

    
    
    return (
        <button onClick={() => logOut(auth)}>
            Logout
        </button>
    );
}











