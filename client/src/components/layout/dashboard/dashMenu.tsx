import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import "../../../animations.css"




export default function DashMenu() {

   
    return (
        <div id="userDashMenu" style={userDashMenuStyle}>
            <Link to="" className='dashLink' style={dashLinkStyle}>Om mig</Link> 
            <Link to="oldOrders" className='dashLink' style={dashLinkStyle}>Gamla ordrar</Link> 
            <Link to="dashForCompany" className='dashLink' style={dashLinkStyle}>UF NAME</Link> 
        </div>
    );
}

const userDashMenuStyle: CSSProperties = {
    width: "20%",
    height: "100%",
    backgroundColor: "rgb(131 159 105)",
/*     
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px", 
*/
    padding: "2em 0 2em 0"
}

const dashLinkStyle: CSSProperties = {
    color: "white",
    background: "linear-gradient(to left, rgb(131 159 105) 50%, rgb(49 52 68) 50%) right",
    backgroundSize: "200%",
    transition: ".25s ease-out",
    width: "100%",
    minHeight: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
}


