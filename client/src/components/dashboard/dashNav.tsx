import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import "../../animations.css"
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';


export default function DashNav() {
    
    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const linearBg = "linear-gradient(to left, rgb(131 159 105) 50%, rgb(49 52 68) 50%) right"
    const fullBg = "rgb(49 52 68)"
    const url = useLocation().pathname
    const currentDashPage = url.split("/")[3]
    const linksForDashNav = [
        {
            name: "Om mig", 
            to: ""
        },
        {
            name: "Gamla ordrar",
            to: "oldOrders"
        },
        {
            name: "UF NAMN",
            to: "dashForCompany"
        },
        {
            name: "registrera UF",
            to: "registerCompany"
        },

    ]

    const renderLinksForDashNav = () => {
        return linksForDashNav.map((link, index) => {
            if(currentDashPage === link.to || currentDashPage === undefined && link.to === "" ) {
                return (
                    <Link key={index} to={link.to} className='dashLink' style={{...dashLinkStyle, background: fullBg}}>
                        {link.name}
                    </Link>
                )
            } 
            else {
                return (
                    <Link key={index} to={link.to} className='dashLink' style={{...dashLinkStyle, background: linearBg, backgroundSize: "200%"}}>
                        {link.name}
                    </Link>
                )  
            }

        })
    }

    return (
        <div id="dashNav" style={dashNavStyle}>
            {renderLinksForDashNav()}
            
            <Link to={"/"} onClick={() => fbFuncs.logOut()} className='dashLink' style={{...dashLinkStyle, background: linearBg, backgroundSize: "200%", marginTop: "auto"}}>
                Logga ut
            </Link>
        </div>
    );
}

const dashNavStyle: CSSProperties = {
    width: "20%",
    height: "100%",
    backgroundColor: "rgb(131 159 105)",
    borderBottomRightRadius: "15px", 
    padding: "2em 0 0 0",
    display: "flex",
    flexDirection: "column"
}

const dashLinkStyle: CSSProperties = {
    color: "white",
    transition: "background-position .25s ease-out",
    width: "100%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
}


