import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import DashContent from './dashboard/dashContent';
import DashMenu from './dashboard/dashMenu';


type Props = {
    isLoggedIn: boolean
  }

export default function MyPages(props: Props) {

    //TODO: NEEDS AUTH FUNCTION THAT VERIFYES HTTP PARAMS


    const navigate = useNavigate();

    const match = useMatch("myPages/:id");
   

    const verifyLogin = () => {
        const session: any = localStorage.getItem('firebase:authUser:AIzaSyC_mG7t9yBPiy65IpJYEb6poabhAPSoBl0:[DEFAULT]')
        const loggedObj = JSON.parse(session)     
        if(loggedObj?.uid !== match?.params.id) {       
            navigate("/userNotFound")
        } 
    }
    
    useEffect(() => { 
        verifyLogin() 
    }, [props.isLoggedIn])


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


