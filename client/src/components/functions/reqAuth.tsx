import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useState } from 'react';
import { Navigate, useLocation, useMatch } from 'react-router-dom';

type Props = {
    children: JSX.Element

}

export default function ReqAuth(props: Props) {
  
    // const navigate = useNavigate();
    
    const match = useMatch("myPages/:id");
    const auth = getAuth();
    let location = useLocation();
    let [numberOfTries, setNumberOfTries] = useState(3)


    console.log("running auth")
    if (!auth.currentUser) {
/*         console.log("tjoho")
        const test = setInterval(() => {
            if(auth.currentUser) {
                console.log("if")
                setNumberOfTries(3)
                clearInterval(test)
            } else if(!auth.currentUser) {
                if(numberOfTries > 0) {
                    setNumberOfTries(numberOfTries--)
                } else {
                    return <Navigate to="/userNotFound" state={{ from: location }} replace />
                }
            }
        }, 1000) */


        
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


  /*     const verifyLogin = () => {
        if(auth.currentUser?.uid !== match?.params.id) {
            //navigate("/userNotFound")
            return <Navigate to="/userNotFound" state={{ from: location }} replace />;
        }
    } */