import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useMatch } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { Company } from '../../../models';
import Button from '../../UI/button';
import ShippingPopup from './shippingPopup';


export default function DashForCompanyShipping() {


    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentCompany, setCurrentCompany] = useState<Company>()
    const [openShipping, setShippingOpen] = useState<boolean>(false)  


    const getCurrentCompany = async () => {
        const company = await companyContext.getCurrentUserCompany()
        setCurrentCompany(company[0] as Company)
    }

    useEffect(() => {
        getCurrentCompany()
    }, [])

    useEffect(() => {
        console.log(currentCompany)
    }, [currentCompany])

    return (
        
        <div id="dashForCompanyShipping" style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>

            {openShipping?      
               <ShippingPopup setShippingOpen={(bool: boolean) => setShippingOpen(bool)} company={currentCompany as Company} getCompany={getCurrentCompany}/>
               : null
            }

            <h1 style={{color: 'black', marginTop:'1em'}}>Företagets fraktkostnader</h1>
                {currentCompany !== undefined?
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '1em'}}> 
                        <h1> Fraktpris: {currentCompany.shipping.shippingPrice} kr </h1>
                        <h1> Gratis frakt över: {currentCompany.shipping.freeShippingOver} kr </h1>
                        <Button onClick={() => setShippingOpen(!openShipping)} icon={<BiEdit size="2.5em"/>}></Button>
                    </div>
                    : null
                }

           {/*  <Button icon={<BiEdit size="1.5em"/>}></Button> */}
           {/*  <p style={{marginTop: '1em'}}>Fraktpris:</p>
            <input type='number' style={{...inputStyle, marginBottom: '1em'}} />
            <p>Gratis frakt om över:</p>
            <input type='number' style={inputStyle} /> */}
        </div>

    );
}

  