import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Button from './button';
import { DocumentData } from 'firebase/firestore';



export default function CompanyList() {

    const [companies, setCompanies] = useState<DocumentData[]>()

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

    const getCompanies = async () => {
        const companies = await fbFuncs.getAllCompanies()
        setCompanies(companies) /* FIXME: Dont set all company data in state */
    }

    function renderCompanies() {
        return ( 
            <div>
                { 
                companies?    
                    companies.map((company, i) => {
                        return( 
                            <Button key={i} linkTo={`/company/${company.id}`} buttonText={`${company.data.name}`}></Button>
                        )
                    })
                    :
                    <p>Något fel inträffade.. det finns inga företag att hämta</p>
                } 
            </div>
        )
    }

    useEffect(() => {
        getCompanies()
    }, [])


    return (
        renderCompanies()   
    );
}