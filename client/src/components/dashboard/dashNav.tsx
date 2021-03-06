
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import "../../animations.css"
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import { Company } from '../../models';


type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
}
export default function DashNav(props: Props) {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext) //FIXME: change this
    const linearBg = "linear-gradient(to left, rgb(131 159 105) 50%, rgb(49 52 68) 50%) right"
    const fullBg = "rgb(49 52 68)"
    const url = useLocation().pathname
    const currentDashPage = url.split("/")[3]
    
    
    const linksForDashNav = [
        {
            name: "Mitt konto", 
            to: ""
        },
        {
            name: "Gamla ordrar",
            to: "oldOrders"
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
                    <Link key={index} to={link.to} className='dashLink' style={{...dashLinkStyle, background: linearBg, backgroundSize: "250%"}}>
                        {link.name}
                    </Link>
                )  
            }

        })
    }

    return (
        <div id="dashNav" style={dashNavStyle}>
            {renderLinksForDashNav()}
            
            <div id="logoutAndCompanyBtnWrap" style={{height: "100%", flexDirection: "column", display: "flex", justifyContent: "flex-end"}}>
                {props.currentCompany !== undefined?
                    currentDashPage == props.currentCompany.id?
                        <Link to={`${props.currentCompany.id}`} className='dashLink' style={{...dashLinkStyle, background: fullBg}}>
                            {props.currentCompany.name}
                        </Link>
                        : //Not sure row beneth works
                        <Link to={props.currentCompany.id as string} className='dashLink' style={{...dashLinkStyle, background: linearBg, backgroundSize: "250%"}}>
                            {props.currentCompany.name}
                        </Link>
                    :
                    null
                }

                <Link to={"/"} onClick={() => fbFuncs.logOut()} className='dashLink' style={{...dashLinkStyle, background: linearBg, backgroundSize: "250%"}}>
                    Logga ut
                </Link>
            </div>
        </div>
    );
}

const dashNavStyle: CSSProperties = {
    width: "20%",
    height: "100%",
    minWidth: "150px",
    backgroundColor: "rgb(131 159 105)",
    borderBottomRightRadius: "15px", 
    padding: "2em 0 0 0",
    display: "flex",
    flexDirection: "column",
    position: "sticky"
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


