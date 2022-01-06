import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useState } from 'react';
import { Navigate, useLocation, useMatch } from 'react-router-dom';

type Props = {
    children: JSX.Element
	isLoggedIn: boolean | undefined

}

export default function ReqAuth(props: Props) {
  
    // const navigate = useNavigate();
    //let location = useLocation();
    
    const match = useMatch("myPages/:id/*");
    const auth = getAuth();

    if (props.isLoggedIn === undefined) {
    
        return <p>Spinner</p>        
    
    }
    else if(props.isLoggedIn === true && auth.currentUser?.uid === match?.params.id) {
    
        return props.children
    
    }
    else {
    
        return <Navigate to="/userNotFound" /* state={{ from: location }} */ replace />;
    
    }

    
}

