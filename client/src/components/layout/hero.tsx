import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import marungTestBackground from "./../../assets/cartLogoDarker.png"




export default function Hero() {

   



    return (
        <div id="Hero" style={heroStyle}>
            <img src={marungTestBackground} style={{objectFit: "contain", /* alignSelf: "center", */ height: "80%", borderBottomRightRadius: "15px", borderBottomLeftRadius: "15px"}}></img>
            <h1 style={{color: 'black', fontSize: '1em'}}>Marknadsplattformen för unga företagare</h1>
   {/*          <div style={{backgroundImage: `url("${marungTestBackground}")`, width: "100%", height: "100%", display: "flex", backgroundRepeat: "no-repeat",  backgroundSize: "contain", backgroundPosition: "center", borderRadius: "15px" }}>
                
            </div> */}
        </div>
    );
}

const heroStyle: CSSProperties = {
    minHeight: "85%",
    backgroundColor: "rgb(238, 164, 127)",
    padding: "1px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    scrollSnapAlign: "start",

}