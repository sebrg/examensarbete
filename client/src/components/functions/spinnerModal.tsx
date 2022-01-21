import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import marungTestBackground from "./../../assets/cartLogoDarker.png"
import * as spinners from "react-spinners";




export default function SpinnerModal() {

   



    return (
        <div id="spinnerWrap" style={spinnerWrap}>
            <spinners.ClipLoader />
        </div>
    );
}

const spinnerWrap: CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 99,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}