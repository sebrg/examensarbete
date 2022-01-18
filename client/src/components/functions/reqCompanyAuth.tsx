import { getAuth } from 'firebase/auth';
import { Navigate, useLocation, useMatch } from 'react-router-dom';

type CurrentCompany = {
    name: string
    id: string
}
type Props = {
    children: JSX.Element
    currentCompany: CurrentCompany | undefined
    companyLoaded: boolean
}

export default function ReqCompanyAuth(props: Props) {
  

    const match = useMatch("myPages/:userId/:companyId/*");
    const auth = getAuth();
    let location = useLocation();
    

    if (props.companyLoaded === false) {
    
        return <p>Spinner</p>     
    }
    else if(props.currentCompany?.id === match?.params.companyId   ) {
        console.log("Company authenticated")
        return props.children
    
    }
    else {
        return <Navigate to={`/myPages/${match?.params.userId}/registerCompany`} state={{ from: location }} replace />
    }

    
}

