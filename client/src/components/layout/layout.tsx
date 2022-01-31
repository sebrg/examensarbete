import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import Footer from './footer';
import Header from './header';
import LoginPopup from './loginPopup';
import Main from './main';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Hero from './hero';
import { useLocation } from 'react-router-dom';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import MainNav from './mainNav';



export default function Layout() {
    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const mainRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const dropDownRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const url = useLocation().pathname

    const [loginToggle, setLoginToggle] = useState(false) //NOTE: This is for loginPopup. maybe move this to App.tsx
    const [navToggle, setNavToggle] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>() //NOTE: Maybe not needed ??
    
    const scrollContentIntoView = (always: boolean) => { //NOTE: Maybe store a session value? if exists dont scroll
        if (always === true) {
            mainRef.current.scrollIntoView({ behavior: "smooth" })
        } else if (always === false && url !== "/") {
            mainRef.current.scrollIntoView()
        }
    }

    useEffect(() => {
        fbFuncs.userAuth(setIsLoggedIn) //FIXME: Should be userprovider instead of fb provider
        scrollContentIntoView(false)
    }, [])
    
    return(
        
        <div id="frame" style={frameStyle}>
            <div id="layoutWrap" className='noScrollBar' style={layoutStyle}>
                <Hero />
                <Header dropDownRef={dropDownRef} setNavToggle={setNavToggle} navToggle={navToggle} scrollContentIntoView={scrollContentIntoView} setLoginToggle={setLoginToggle} isLoggedIn={isLoggedIn}/>
                <Main /* stripeOptions={props.stripeOptions} */ passedRef={mainRef} isLoggedIn={isLoggedIn}/>
            </div>

            {navToggle?
                <MainNav dropDownRef={dropDownRef} navToggle={navToggle} setNavToggle={setNavToggle} scrollContentIntoView={scrollContentIntoView} isLoggedIn={isLoggedIn} setLoginToggle={setLoginToggle} />
                : null}
                
            {loginToggle? //NOTE: Maybe move this condition into the LoginPopup component instead
                <LoginPopup setLoginToggle={setLoginToggle} /> 
                : null} 
        
        </div>
        
    )
}

const layoutStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(49 52 68)",
    borderRadius: "15px",
    overflowX: "hidden",
    overflowY: "scroll",
    scrollSnapType: "y mandatory",  
    

}

const frameStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#E5E5E5",
    overflow: "auto",
    padding: "1em",
}

