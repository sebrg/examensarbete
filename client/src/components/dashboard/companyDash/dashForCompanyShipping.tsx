import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useMatch } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { Company } from '../../../models';
import Button from '../../UI/button';


export default function DashForCompanyShipping() {


    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentCompany, setCurrentCompany] = useState<[] | undefined>() //company   

    let match = useMatch({
        path: "/myPages/:userId/:companyId/*"
    });

    const companyId = match?.params.companyId
    
    const test = async () => {
        const company = await companyContext.getCurrentUserCompany()
        /* setCurrentCompany(company) */
    }

    useEffect(() => {
        test()
    }, [])

    useEffect(() => {
        console.log(currentCompany)
    }, [currentCompany])

    return (
        
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1>Företagets fraktkostnader</h1>

            {
                currentCompany?
                    currentCompany.map((company, i) => {
                        <p> {company} </p>
                    })
                    : null
            }

            <Button icon={<BiEdit size="1.5em"/>}></Button>
           {/*  <p style={{marginTop: '1em'}}>Fraktpris:</p>
            <input type='number' style={{...inputStyle, marginBottom: '1em'}} />
            <p>Gratis frakt om över:</p>
            <input type='number' style={inputStyle} /> */}
        </div>

    );
}


const inputStyle: CSSProperties = {
    border: "none", 
    width: "40%",
    height: "15%",
    borderRadius: '10px'
}      