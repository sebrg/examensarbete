import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import Button from '../UI/button';
import { AiOutlineClose } from 'react-icons/ai';
import { UserContext, UserOptions } from '../../context/users/userContext';


type Props = {
    isLoggedIn: boolean | undefined
    setLoginToggle: any
    setNavToggle: any
    navToggle: boolean
    scrollContentIntoView?: (always: boolean) => void
    dropDownRef: React.MutableRefObject<HTMLInputElement>
}

export default function MainNav(props: Props) {

    const userContext: UserOptions = useContext(UserContext)

    const auth = getAuth();
    const navRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const [maxWidth, setMaxWidth] = useState< "0%" | "75%" >("0%")
    const [padding, setPadding] = useState< "0" | "2em 10px" >("0")


    function handleClickOutside(event: any) {
        if (navRef.current && !navRef.current.contains(event.target) && props.dropDownRef.current && !props.dropDownRef.current.contains(event.target)) {
            props.setNavToggle(false)
        }
    }

    useEffect(() => {
        // Alert if clicked on outside of element
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navRef])

    useEffect(() => {
        if(props.navToggle) {
            setMaxWidth("75%")
            setPadding("2em 10px") 
        }
    }, [props.navToggle])



    return (
        props.isLoggedIn?
            <nav ref={navRef} id="mainNav" style={{...mainNavStyle, maxWidth: maxWidth, padding: padding}}>
                
                <AiOutlineClose style={{color: "white", cursor: "pointer", position: "absolute", top: "5px", right: "5px"}} fontSize={"1.5em "} onClick={() => props.setNavToggle(false)}/>
                {/* Start button */}
                <Button margin='0.5em 0 0 0' width='100%' color='black' bgColor='rgb(239 225 206)' border='2px solid black' linkTo={"/"} buttonText='Start' onClick={() => {
                    props.setNavToggle(false)
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>         
                {/* Produkcts button */}
                <Button margin='0.5em 0 0 0' width='100%' color='black' bgColor='rgb(239 225 206)' border='2px solid black' linkTo={"/products"} buttonText='Produkter' onClick={() => {
                    props.setNavToggle(false)
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>  


                {/* myPages button */}
                <Button margin='0.5em 0 0 0' width='100%' color='black' bgColor='rgb(239 225 206)' border='2px solid black' linkTo={`/myPages/${auth.currentUser?.uid}`} buttonText='Mina sidor' onClick={() => {
                    props.setNavToggle(false)
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>   
                
                {/* Logout button */}
                <div className='wrapForMargin' style={{marginTop: "auto"}}>
                    <Button margin='0.5em 0 0 0' width='100%' color='white' bgColor='rgb(236 28 36)' border='2px solid white' buttonText='Logga ut' linkTo={"/"} onClick={() => {
                    userContext.logOut()
                    props.setNavToggle(false)
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>  
                </div>

            </nav>
            :
            <nav ref={navRef} id="mainNav" style={{...mainNavStyle, maxWidth: maxWidth, padding: padding}}>
                
                <AiOutlineClose style={{color: "white", cursor: "pointer", position: "absolute", top: "5px", right: "5px"}} fontSize={"1.5em "} onClick={() => props.setNavToggle(false)}/>
                {/* Start */}
                <Button margin='0.5em 0 0 0' width='100%' color='black' bgColor='rgb(239 225 206)' border='2px solid black' linkTo={"/"} buttonText='Start' onClick={() => {
                    props.setNavToggle(false)
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>

                {/* Produkcts button */}
                <Button margin='0.5em 0 0 0' width='100%' color='black' bgColor='rgb(239 225 206)' border='2px solid black' linkTo={"/products"} buttonText='Produkter' onClick={() => {
                    props.setNavToggle(false)
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>  

                {/* Login */}
                <div className='btnWrapForMarginTopAuto' style={{marginTop: "auto"}}>
                    <Button margin='0.5em 0 0 0' width='100%' color="white" bgColor='rgb(28 236 155)' border='2px solid white' buttonText='Login' onClick={() => {
                        props.setNavToggle(false)
                        props.setLoginToggle(true)
                    }}/>
                </div>       
            </nav>
    );
}


const mainNavStyle: CSSProperties = {
	display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "20%",
    bottom: "20%",
    left: "1em",
    zIndex: "11",
    backgroundColor: "rgb(230 230 230 / 50%)",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow: "5px 5px 5px -2px black",
    borderTop: "2px solid white",
    borderRight: "2px solid white",
    borderBottom: "2px solid white",
    overflow: "hidden",
    width: "25%"
}

