import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';
import LoginPopup from './loginPopup';
import Main from './main';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';

export default function Layout() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    
    const [loginToggle, setLoginToggle] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) //NOTE: Maybe not needed

    useEffect(() => {
        fbFuncs.userAuth(setIsLoggedIn)
/*         const auth = getAuth();
    
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("signed in= ", user)
                setIsLoggedIn(true)
                // ...
            } else {
                // User is signed out
                // ...
                console.log("user signdout")
                setIsLoggedIn(false)
            }
        }); */
    }, [])
    useEffect(() => {
        console.log(isLoggedIn)
    }, [isLoggedIn])

    return(
        
        <div id="frame" style={frameStyle}>
            <div id="layoutWrap" style={layoutStyle}>
                <Header setLoginToggle={setLoginToggle} isLoggedIn={isLoggedIn}/>
                <Main />
            </div>
            {
                loginToggle? //NOTE: Maybe move this condition into the LoginPopup component instead
                    <LoginPopup setLoginToggle={setLoginToggle} /> 
                    : 
                    null 
            } 
        
        </div>
        
    )
}

const layoutStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "95%",
    backgroundColor: "orange",
    borderRadius: "15px"
}

const frameStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#E5E5E5",
    overflow: "auto"
}
  