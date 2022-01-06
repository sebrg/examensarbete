import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';




export default function Hero() {

   



    return (
        <div id="Hero" style={heroStyle}>
            <h1>UF Market</h1>
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
    alignItems: "center"
}