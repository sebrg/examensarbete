import { getAuth } from 'firebase/auth';
import { Navigate, useLocation, useMatch } from 'react-router-dom';
import { Company } from '../../models';
import SpinnerModal from './spinnerModal';

type CurrentCompany = {
    name: string
    id: string
}
type Props = {
    children: JSX.Element
    currentCompany: Pick<Company, "name" | "id"> | undefined
    companyLoaded: boolean
}

export default function ReqCompanyAuth(props: Props) {
  

    const match = useMatch("myPages/:userId/:companyId/*");
    const auth = getAuth();
    let location = useLocation();
    

    if (props.companyLoaded === false) {
    
        return <SpinnerModal />   
    }
    else if(props.currentCompany?.id === match?.params.companyId   ) {
        console.log("Company authenticated")
        return props.children
    
    }
    else {
        return <Navigate to={`/myPages/${match?.params.userId}/registerCompany`} state={{ from: location }} replace />
    }

    
}

