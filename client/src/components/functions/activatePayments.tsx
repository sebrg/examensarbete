import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import Button from '../UI/button';
import ActivateStripe from './activateStripe';

type Status = {
    status: number,
    message: string
}


export default function ActivatePayments() {

    const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'	

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")
    const [stripeId, setStripeId] = useState<string>()
    const [stripeAccountStatus, setStripeAccountStatus] = useState<Status | undefined>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [stripePromise, setStripePromise] = useState(() => loadStripe(stripePK))

    //const stripePromise = loadStripe(stripePK) 

    const syncIdAndStatus = async () => {
        console.log("running syncIdAndStatus")
        let currentCompany = await companyContext.getCurrentUserCompany()
        if(currentCompany[0].payments.stripe_acc_id) {
            setStripeId(currentCompany[0].payments.stripe_acc_id)
        } 
        if(currentCompany[0].payments.enabled === false) { //NOTE: Ska den ligga här?? 
            if(stripeAccountStatus?.status === 200) {
                companyContext.setPaymentEnabled(true)
            }
        }
    }

    async function getAccount() {
        if(stripeId) {
            const response = await fetch("http://localhost:3001/getStripeAcc", {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({stripeId: stripeId})
            })
            
            const status = await response.json()
            setStripeAccountStatus(status)
        }
        setLoading(false)
    }
   


    useEffect(() => {
        getAccount()
    }, [stripeId]) 

    useEffect(() => {
        syncIdAndStatus()
    }, []) 


    return (
       <div id='activate-payments'>

           {currentView === 'start'?
                loading? 
                    <p>spinner..</p>
                    :
                    stripeAccountStatus?.status === 200? 
                        <p>Du har aktiverat Stripe</p>
                        :
                        <Button onClick={() => setCurrentView("stripe")} buttonText='stripe'/>
                        : currentView === 'stripe'? 
                            <Elements stripe={stripePromise}> 
                                <ActivateStripe stripeAccountStatus={stripeAccountStatus} setStripeAccountStatus={(status: Status) => setStripeAccountStatus(status)} stripeId={stripeId as string} syncIdAndStatus={() => syncIdAndStatus()}/>
                            </Elements>
                            : null
           }

       </div>    
            
    );
}

