import { getAuth } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useMatch } from 'react-router-dom';
import { UserContext, UserOptions } from '../../context/users/userContext';
import SpinnerModal from './spinnerModal';


type Props = {
    children: JSX.Element
}

export default function ReqAdminAuth(props: Props) {
  
	const userContext: UserOptions = useContext(UserContext)
    const [auth, setAuth] = useState<Boolean>(false)
    const [loadingComplete, setLoadingComplete] = useState<Boolean>(false)

    let authenticate = async () => {
        const checkAdmin = await userContext.checkAdmin()
        setAuth(checkAdmin)
        setLoadingComplete(true)
    }
  
    useEffect(() => {
        if(loadingComplete === false) {
            authenticate()
        }
    }, [])

    useEffect(() => {
        console.log(auth)
    }, [auth])
      
    if(loadingComplete === false) {
        return <SpinnerModal />
    }
    else if(loadingComplete === true && auth === true ) {
        console.log("Admin authenticated")
        return props.children
    
    }
    else {
        return <Navigate to={"/"} /* state={{ from: location }} */ replace />
    }

    
}

