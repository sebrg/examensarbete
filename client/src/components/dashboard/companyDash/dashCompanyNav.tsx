import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';




export default function DashCompanyNav() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)


    return (
        <nav id="dashCompanyNav" style={dashCompanyNavStyle}>
            <Button 
                buttonText='Start'
                linkTo={" "}
                color='white'
            />
            <Button 
                buttonText='Inställningar'
                linkTo={"settings"}
                color='white'
            />
            <Button 
                buttonText='Produkter'
                linkTo={"products"}
                color='white'
            />
        </nav>
    );
}

const dashCompanyNavStyle: CSSProperties = {
    width: "100%",
    height: "10%",
    backgroundColor: "pink",
    display: "flex",
    padding: "0.5em",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
/*     boxShadow: "0 10px 10px -10px black",
    WebkitBoxShadow: "0 10px 10px -10px black", */
}