import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useState } from 'react';
import { Navigate, useLocation, useMatch } from 'react-router-dom';
import SpinnerModal from './spinnerModal';

type Props = {
    children: JSX.Element
	isLoggedIn: boolean | undefined

}

export default function ReqUserAuth(props: Props) {
  
    // const navigate = useNavigate();
    //let location = useLocation();
    
    const match = useMatch("myPages/:userId/*");
    const auth = getAuth();

    if (props.isLoggedIn === undefined) {
    
        return <SpinnerModal />       
    }
    else if(props.isLoggedIn === true && auth.currentUser?.uid === match?.params.userId) {
        console.log("User authenticated")
        return props.children
    
    }
    else {
    
        return <Navigate to="/userNotFound" /* state={{ from: location }} */ replace />;
    
    }

    
}

