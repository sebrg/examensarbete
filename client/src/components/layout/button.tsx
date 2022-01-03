import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import "../../animations.css"
import { Link } from 'react-router-dom';
type Props = {
    buttonText?: string
    bgColor?: string
    width?: string
    height?: string
    onClick?: any
    linkTo?: any
}


export default function Button(props: Props) {

 
    return (
        props.linkTo?
            <Link to={props.linkTo} style={LinkStyle}>
                <div className="customBtn" onClick={props.onClick} style={{...buttonStyle, backgroundColor: props.bgColor, width: props.width, height: props.height}}>
                    <p>
                        {props.buttonText}
                    </p>
                </div>
            </Link>
            :
            <div className="customBtn" onClick={props.onClick} style={{...buttonStyle, backgroundColor: props.bgColor, width: props.width, height: props.height}}>
                <p>
                    {props.buttonText}
                </p>
            </div>
    );
}

const buttonStyle: CSSProperties = {
    padding: "0.5em",
    border: "1px solid black",
    borderRadius: "5px",
    fontSize: "1.2em",
    display: "flex",
    cursor: "pointer",
    alignItems: "center"
}

const LinkStyle: CSSProperties = {
    display: "flex", 
    textDecoration: "none",
}

