import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Button from './button';


type Props = {
    isLoggedIn: boolean | undefined
    setLoginToggle: any

}

export default function MainNav(props: Props) {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const navigate = useNavigate();
    const auth = getAuth();
    

    return (
        props.isLoggedIn?
            <nav id="mainNav" style={mainNavStyle}>
                <Button linkTo={"/"} buttonText='Start' />
                <Button linkTo={`/myPages/${auth.currentUser?.uid}`} buttonText='Mina sidor' />
                <Button linkTo={"/"} buttonText='Logout' onClick={() => fbFuncs.logOut()} />
            </nav>
            :
            <nav id="mainNav" style={mainNavStyle}>
                <Button linkTo={"/"} buttonText='Start' />
                {/*TODO: Remove the mypages row beneth. Only here for testing */}
                {/* <Button onClick={() =>  navigate(`/myPages/${auth.currentUser?.uid}`)} buttonText='Mina sidor' /> */} 
                <Button onClick={() => props.setLoginToggle(true)} buttonText='Login' />
            </nav>
    );
}

/* const userDashMenuStyle: CSSProperties = {
    width: "30%",
    height: "100%",
} */

const mainNavStyle: CSSProperties = {
	display: "flex"
}