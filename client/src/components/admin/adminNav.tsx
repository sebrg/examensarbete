import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Button from '../UI/button';




export default function AdminNav() {

   



    return (
        <div id="adminNav" style={adminNavStyle}>
            <Button buttonText='pending' linkTo={"pendingCompanies"}/> {/* FIXME: pending ska va på svenska */}
        </div>
    );
}

const adminNavStyle: CSSProperties = {
    backgroundColor: "rgb(239, 225, 206)",
    display: "flex",
    width: "100%",
    height: "10%",
    padding: "0.5em"

}