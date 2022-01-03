import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: JSX.Element

}

export default function ReqAuth(props: Props) {
    
    const auth = getAuth();
    let location = useLocation();

    if (!auth.currentUser) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/userNotFound" state={{ from: location }} replace />;
    }

    return props.children
    
}





/* export default RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  } */