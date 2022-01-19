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
        <div> 
        <p>this is DashForCompanySettings</p>
        
        <Button onClick={() => setActivatePaymentsOpen(!activatePaymentsOpen)} buttonText='Betalningsalternativ'/>
        {activatePaymentsOpen?
            <ActivatePayments />
            : null
        }

        </div>    
    );
}

