import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { Company } from '../../models';
import DashContent from '../dashboard/dashContent';
import DashNav from '../dashboard/dashNav';
import { Helmet } from 'react-helmet-async';


export default function MyPages() {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentCompany, setCurrentCompany] = useState<Pick<Company, "name" | "id"> | undefined>() //FIXME: fix type "any"
    const [companyLoaded, setCompanyLoaded] = useState<boolean>(false)
    
    const checkCompany = async () => {
        const currentCompany = await companyContext.getCurrentUserCompany() as Company[]
        if(currentCompany.length && currentCompany[0].id) {
            setCurrentCompany({name: currentCompany[0].name, id: currentCompany[0].id})
        }
        setCompanyLoaded(true)
    }   

    useEffect(() => {
        checkCompany()    
    }, [])


    return (
        <div id="myPagesWrapper" style={myPagesWrapperStyle}>
            <Helmet>
                <title>Marung - Mina sidor</title>
            </Helmet>
            
            <DashContent currentCompany={currentCompany} companyLoaded={companyLoaded} /> {/* FIXME: turn props into object */}
            <DashNav currentCompany={currentCompany}/>
        </div>
    );
}

const myPagesWrapperStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative"
}


