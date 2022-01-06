import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';
import LoginPopup from './loginPopup';
import Main from './main';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Hero from './hero';

export default function Layout() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    
    const [loginToggle, setLoginToggle] = useState(false) //NOTE: maybe move this to App.tsx
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>() //NOTE: Maybe not needed

    useEffect(() => {
        fbFuncs.userAuth(setIsLoggedIn)
    }, [])
    
    useEffect(() => {
        console.log(isLoggedIn)
    }, [isLoggedIn])

    return(
        
        <div id="frame" style={frameStyle}>
            <div id="layoutWrap" className='noScrollBar' style={layoutStyle}>
                <Hero />
                <Header setLoginToggle={setLoginToggle} isLoggedIn={isLoggedIn}/>
                <Main isLoggedIn={isLoggedIn}/>
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
    backgroundColor: "rgb(49 52 68)",
    borderRadius: "15px",
    overflowX: "hidden",
    overflowY: "scroll"
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

