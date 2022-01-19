import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Company } from '../../models';
import marungTestBackground from "./../../assets/cartLogoDarker.png"
import FoldableCompanyCard from './foldableCompanyCard';




export default function PendingCompanies() {


    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [pendingCompanies, setPendingCompanies] = useState<Company[]>()


    const getPendingCompanies = async () => {
        const allPendingCompanies = await companyContext.getAllCompanies('pendingCompanies')
        if(allPendingCompanies) {
            setPendingCompanies(allPendingCompanies)
        }
    }

    useEffect(() => {
        getPendingCompanies()
    }, [])
    
    useEffect(() => {
        console.log(pendingCompanies)
    }, [pendingCompanies])



    return (
        <div id="pendingCompanies" style={pendingCompaniesStyle}>
            {pendingCompanies?.length?
                pendingCompanies.map((company, i) => {
                    return (
                        <FoldableCompanyCard company={company} key={i} updateCompanies={getPendingCompanies}/>
                    )
                })
                :
                "no Companies"
            }
            
        </div>
    );
}

const pendingCompaniesStyle: CSSProperties = {
    padding: "1em",
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignContent: "flex-start"
}