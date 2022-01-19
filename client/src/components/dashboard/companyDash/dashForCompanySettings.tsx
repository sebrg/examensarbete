import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';
import ActivateStripe from '../../functions/activateStripe';




export default function DashForCompanySettings() {

    const companyFuncs: CompanyOptions = useContext(CompanyContext)

    return (
        <div> 
        <p>this is DashForCompanySettings</p>
    
        <ActivateStripe />

        </div>    
    );
}

