import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { GeneralContext, GeneralOptions } from '../../../context/general/generalContext';
import { Company } from '../../../models';
import DashCompanyNav from './dashCompanyNav';
import DashForCompanyOrders from './dashForCompanyOrders';
import DashForCompanyProducts from './dashForCompanyProducts';
import DashForCompanySettings from './dashForCompanySettings';
import DashForCompanyStart from './dashForCompanyStart';

type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
}

export default function DashForCompany(props: Props) {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const generalContext: GeneralOptions = useContext(GeneralContext)
    

    const syncIdAndStatus = async () => {
        let currentCompany = await companyContext.getCurrentUserCompany()
        if(currentCompany[0].payments.stripe_acc_id && currentCompany[0].payments.enabled === false) {
            const response = await fetch(`${generalContext.path}/getStripeAcc` , {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({stripeId: currentCompany[0].payments.stripe_acc_id})
            })
            const status = await response.json()
            if(status.status === 200) {
                companyContext.setPaymentEnabled(true)
            }
        }
    }

    useEffect(() => {
        syncIdAndStatus()
    }, [])

    return (
        <div id="dashContentForCompany" className='noScrollBar' style={{width: "100%", height: "100%", overflow: "auto"}}>
            <DashCompanyNav />    
            <Routes>
                <Route index element={<DashForCompanyStart/>} />
                <Route path="settings" element={<DashForCompanySettings/>} />
                <Route path="products" element={<DashForCompanyProducts currentCompany={props.currentCompany}/>} />
                <Route path="companyOrders" element={<DashForCompanyOrders/>} />
                
                
            </Routes>
        </div>
    );
}

