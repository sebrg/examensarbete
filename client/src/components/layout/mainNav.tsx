import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Button from '../UI/button';


type Props = {
    isLoggedIn: boolean | undefined
    setLoginToggle: any
    scrollContentIntoView?: (always: boolean) => void
}

export default function MainNav(props: Props) {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    //const navigate = useNavigate();
    const auth = getAuth();
    

    return (
        props.isLoggedIn?
            <nav id="mainNav" style={mainNavStyle}>
                <Button border='1px solid black' linkTo={"/"} buttonText='Start' onClick={() => props.scrollContentIntoView? props.scrollContentIntoView(true) : null} />
                
  
                <Button border='1px solid black' linkTo={`/myPages/${auth.currentUser?.uid}`} buttonText='Mina sidor' onClick={() => props.scrollContentIntoView? props.scrollContentIntoView(true) : null} />
                {/* <Button linkTo={"/"} buttonText='Logout' onClick={() => fbFuncs.logOut()} /> */}
                <Button border='1px solid black' buttonText='Varukorg' linkTo={`/cart/${auth.currentUser?.uid}`} onClick={() => props.scrollContentIntoView? props.scrollContentIntoView(true) : null}/>

            </nav>
            :
            <nav id="mainNav" style={mainNavStyle}>
                <Button border='1px solid black' linkTo={"/"} buttonText='Start' onClick={() => props.scrollContentIntoView? props.scrollContentIntoView(true) : null} />
                {/*TODO: Remove the mypages row beneth. Only here for testing */}
                {/* <Button onClick={() =>  navigate(`/myPages/${auth.currentUser?.uid}`)} buttonText='Mina sidor' /> */} 
                <Button border='1px solid black' onClick={() => props.setLoginToggle(true)} buttonText='Login' />
                <Button border='1px solid black' buttonText='Varukorg' linkTo={`/cart/${auth.currentUser?.uid}`} onClick={() => props.scrollContentIntoView? props.scrollContentIntoView(true) : null}/>
                
            </nav>
    );
}


const mainNavStyle: CSSProperties = {
	display: "flex",
    width: "100%",
    padding: "10px"
}