import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import DashContent from './dashboard/dashContent';
import DashMenu from './dashboard/dashMenu';




export default function MyPages() {

    //TODO: NEEDS AUTH FUNCTION THAT VERIFYES HTTP PARAMS


    const navigate = useNavigate();
    const auth = getAuth();
    const match = useMatch("myPages/:id");

    const verifyLogin = () => {
        if(auth.currentUser?.uid !== match?.params.id) {
            navigate("/userNotFound")
        }
    }

    return (
        <div id="myPagesWrapper" style={myPagesWrapperStyle}>
            
            <DashContent />
            <DashMenu />
        </div>
    );
}

const myPagesWrapperStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
}


