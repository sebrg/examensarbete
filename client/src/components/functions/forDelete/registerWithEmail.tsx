import React, { CSSProperties, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";




export default function RegisterWithEmail() {
    
    const [password, setPassword] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    
    const updatePassword = (event: any) => {
        event? setPassword(event.target.value) : setPassword(undefined)
    }   
    const updateEmail = (event: any) =>{
        event? setEmail(event.target.value) : setEmail(undefined)
    }
    
    


    const auth = getAuth();

    const createUserWithEmail = (auth: any, email: any, password: any) => {
        if(password == undefined || email == undefined) {
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });

    }
    
    return (
        <div>
            <input placeholder='email' onChange={(event) => updateEmail(event)}></input>
            <input placeholder='password' onChange={(event) => updatePassword(event)}></input>
            <button onClick={() => createUserWithEmail(auth, email, password)}>
                Register
            </button>
        
        </div>
    );
}


















