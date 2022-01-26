import { Elements, useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';
import ActivateStripe from '../../functions/activateStripe';
import ActivatePayments from '../../functions/activatePayments';




export default function DashForCompanySettings() {

   
    const companyFuncs: CompanyOptions = useContext(CompanyContext)
    const [activatePaymentsOpen, setActivatePaymentsOpen] = useState<boolean>(false)
  

    return (
        <div style={dashSettings}> 
        {/* <h1 style={{fontSize: '1.5em'}}>this is DashForCompanySettings</h1> */}

            <div style={settingsDiv}>
                Nånting annat ...
            </div>

            <div style={stripeDiv}>   
                <Button border='1px solid black' width='50%' onClick={() => setActivatePaymentsOpen(!activatePaymentsOpen)} buttonText='Betalningsalternativ'/>
                {activatePaymentsOpen?
                    <ActivatePayments />
                    : null
                }
            </div>  
        </div>   
    );
}

const dashSettings: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '85%',
    flexDirection: 'column',
}

const stripeDiv: CSSProperties = {
    width: '100%',
    height: '50%',
    backgroundColor: '#34568B',
}

const settingsDiv: CSSProperties = {
    width: '100%',
    height: '50%',
    backgroundColor: '#92A8D1'
} 
