import React, { CSSProperties, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import LoginPopup from '../layout/loginPopup';

type Props = {
    setLoginToggle: any
}

export default function Login(props: Props) {
    
    //onst [loginToggle, setLoginToggle] = useState(false)
    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    //Add redirect login for mobile size
    const signInWithGoogle = (auth: any, provider: any) => {

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential? credential.accessToken : null
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            console.log("token= ", token)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const signInWithEmail = (auth: any, email: string, password: string ) => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
        
    return (
  
        <button onClick={() => props.setLoginToggle}>
            Login
        </button>
               
    );
}



//<button onClick={() => signIn(auth, provider)}></button>
