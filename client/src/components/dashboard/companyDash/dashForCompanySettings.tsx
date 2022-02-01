import { Elements, useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';
import ActivateStripe from '../../functions/activateStripe';
import ActivatePayments from '../../functions/activatePayments';
import DashForCompanyShipping from './dashForCompanyShipping';




export default function DashForCompanySettings() {

   
    const companyFuncs: CompanyOptions = useContext(CompanyContext)
    const [activatePaymentsOpen, setActivatePaymentsOpen] = useState<boolean>(false)
  

    return (
        <div id="dashForCompanySettings" style={dashForCompanySettings}> 

            <div id="shippingSection" style={shippingSection}>
               <DashForCompanyShipping />
            </div>

            <div id="paymentSection" style={paymentSection}>   
                <Button border='1px solid black' width='50%' onClick={() => setActivatePaymentsOpen(!activatePaymentsOpen)} buttonText='Betalningsalternativ'/>
           
            </div>

            {activatePaymentsOpen?
                    <ActivatePayments setActivatePaymentsOpen={setActivatePaymentsOpen} />
                    : null
            } 
           
        </div>   
        
    );
}

const dashForCompanySettings: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '85%',
    flexDirection: 'column',
}

const paymentSection: CSSProperties = {
    display: "flex",
    width: '100%',
    marginTop: "auto",
    justifyContent: "center",
    padding: "0 0 1em 0"
}

const shippingSection: CSSProperties = {
    width: '100%',
    //height: '50%',
  //  backgroundColor: '#92A8D1'
} 
