import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import marungTestBackground from "./../../assets/cartLogoDarker.png"
import ClipLoader from "react-spinners/ClipLoader";


type Props = {
    fullScreen?: boolean
    message?: string
}

export default function SpinnerModal(props: Props) {

   



    return (
        <div id="spinnerWrap" style={props.fullScreen? spinnerWrapFullScreen : spinnerWrapFullElement}>
            {props.message?
                <p style={{fontSize: "2em"}}>{props.message}</p>
                :
                <ClipLoader size={"5em"}/>
            }
        </div>
    );
}

const spinnerWrapFullScreen: CSSProperties = {
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

const spinnerWrapFullElement: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 99,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
}