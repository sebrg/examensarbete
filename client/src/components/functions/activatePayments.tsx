import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { GeneralContext, GeneralOptions } from '../../context/general/generalContext';
import Button from '../UI/button';
import ActivateStripe from './activateStripe';
import SpinnerModal from './spinnerModal';

type Status = {
    status: number,
    message: string
}

type Props = {
    setActivatePaymentsOpen: any //FIXME: any type?
}


export default function ActivatePayments(props: Props) {

    const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'	

    const general: GeneralOptions = useContext(GeneralContext)
    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")
    const [stripeId, setStripeId] = useState<string>()
    const [stripeAccountStatus, setStripeAccountStatus] = useState<Status | undefined>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [stripePromise, setStripePromise] = useState(() => loadStripe(stripePK))

    //const stripePromise = loadStripe(stripePK) 

    const syncIdAndStatus = async () => {
        let currentCompany = await companyContext.getCurrentUserCompany()
        if(currentCompany[0].payments.stripe_acc_id) {
            setStripeId(currentCompany[0].payments.stripe_acc_id)
        } 
        if(currentCompany[0].payments.enabled === false) { 
            if(stripeAccountStatus?.status === 200) {
                companyContext.setPaymentEnabled(true)
            }
        }
    }

    async function getAccount() {
        if(stripeId) {
            const response = await fetch(`${general.path}/getStripeAcc` , {
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
        <div className='popUpWrapp' style={popUpWrapp} onClick={() => props.setActivatePaymentsOpen(false)}>
            <div id='activate-payments' style={activatePayments}>

                {currentView === 'start'?
                        loading || stripeAccountStatus?.status == undefined? 
                            <SpinnerModal fullScreen={true}/>
                            :
                            stripeAccountStatus?.status === 200? 
                                <p style={{textAlign: 'center', marginTop: '1.5em'}}>Du har aktiverat Stripe</p>
                                :
                                <Button border='1px solid black' color='black' width='50%' onClick={() => setCurrentView("stripe")} buttonText='Ta emot betalningar med Stripe'/>
                                : currentView === 'stripe'? 
                                    <Elements stripe={stripePromise}> 
                                        <ActivateStripe stripeAccountStatus={stripeAccountStatus} setStripeAccountStatus={(status: Status) => setStripeAccountStatus(status)} stripeId={stripeId as string} syncIdAndStatus={() => syncIdAndStatus()}/>
                                    </Elements>
                                    : null
                }

            </div> 
        </div>   
            
    );
}


const activatePayments: CSSProperties = {
    width: "50%",
    minHeight: "50%",
    backgroundColor: "rgb(239, 225, 206)",
}

const popUpWrapp: CSSProperties = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "99",
    padding: "2em",
    justifyContent: "center",
    alignItems: "center"

}