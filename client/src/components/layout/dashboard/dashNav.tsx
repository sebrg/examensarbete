import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import "../../../animations.css"


export default function DashNav() {

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
        }
    ]

    const renderLinksForDashNav = () => {
        return linksForDashNav.map((link, index) => {
            if(currentDashPage === link.to || currentDashPage === undefined && link.to === "" ) {
                return (
                    <Link
                        key={index}
                        to={link.to}
                        className='dashLink'
                        style={{
                            ...dashLinkStyle,
                            background: "rgb(49 52 68)",
                        }}
                    >
                        {link.name}
                    </Link>
                )
            } 
            else {
                return (
                    <Link
                        key={index}
                        to={link.to}
                        className='dashLink'
                        style={{
                            ...dashLinkStyle,
                            background: "linear-gradient(to left, rgb(131 159 105) 50%, rgb(49 52 68) 50%) right",
                            backgroundSize: "200%"
                        }}
                    >
                        {link.name}
                    </Link>
                )  
            }

        })
    }

    return (
        <div id="dashNav" style={dashNavStyle}>
            {renderLinksForDashNav()}
        </div>
    );
}

const dashNavStyle: CSSProperties = {
    width: "20%",
    height: "100%",
    backgroundColor: "rgb(131 159 105)",
/*     
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px", 
*/
    borderBottomRightRadius: "15px", 
    padding: "2em 0 2em 0"
}

const dashLinkStyle: CSSProperties = {
    color: "white",
    //background: "linear-gradient(to left, rgb(131 159 105) 50%, rgb(49 52 68) 50%) right",
    //backgroundSize: "200%",
    transition: "background-position .25s ease-out",
    width: "100%",
    minHeight: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
}


