import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Button from '../UI/button';
import marungTestBackground from "./../../assets/cartLogoDarker.png"


type Props = {
    scrollContentIntoView?: (always: boolean) => void

}

export default function Hero(props: Props) {

   



    return (
        <div id="Hero" style={heroStyle}>
            <div id="heroTopLinks" style={heroTopLinks}>
                <Button color='white' buttonText='Regler & Köpvilkor' width='25%' linkTo={"/policy"} onClick={() => {
                    if(props.scrollContentIntoView) {
                        props.scrollContentIntoView(true)
                    }
                }}/>

            </div>
            <img src={marungTestBackground} style={{objectFit: "contain", /* alignSelf: "center", */ height: "60%", borderBottomRightRadius: "15px", borderBottomLeftRadius: "15px"}}></img>
            <h1 style={{color: 'black', fontSize: '1em'}}>Marknadsplattformen för unga företagare</h1>

        </div>
    );
}

const heroStyle: CSSProperties = {
    minHeight: "85%",
    backgroundColor: "rgb(238, 164, 127)",
    padding: "1px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    scrollSnapAlign: "start",
}

const heroTopLinks: CSSProperties = {
    width: "100%",

}