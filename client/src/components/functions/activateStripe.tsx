import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { GeneralContext, GeneralOptions } from '../../context/general/generalContext';
import Button from '../UI/button';

type Status = {
    status: number,
    message: string
}

type Props = {
    stripeId: string
    stripeAccountStatus: Status | undefined
    setStripeAccountStatus: (status: Status) => void
    syncIdAndStatus: () => void 
}

export default function ActivateStripe(props: Props) {

    
    const companyContext: CompanyOptions = useContext(CompanyContext)
    const general: GeneralOptions = useContext(GeneralContext)
       
    let stripe = useStripe()
   

    
    async function createStripeAcc() {
        if(stripe) {
            const response = await fetch(`${general.path}/createStripe`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
            })
            
			const { id } = await response.json()
            //const updateCompany = async () => { await Promise.all([companyContext.updateCompany(id)])}
            //await updateCompany()
            await Promise.all([companyContext.updateCompany(id)])
            props.syncIdAndStatus()
		}  
	}
    
    async function createStripeLink() {
        if(stripe && props.stripeId) {
            const response = await fetch(`${general.path}/createStripeLink`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({stripeId: props.stripeId, path: window.location.origin})
            })
			const { url } = await response.json()
            window.location.href = url
            props.syncIdAndStatus()
		}  
	}

    useEffect(() => {
        console.log(props.stripeAccountStatus)
    }, [props.stripeAccountStatus])

    useEffect(() => {
        console.log(props.stripeId)
     }, [props.stripeId])


    return (
        <div id="stripeActivationWrapp" style={StripeActivation}> 
            {!props.stripeId? 
                <div>
                    <p style={textStyle}>Steg 1: Skapa ditt stripe konto för att ta emot kortbetalningar</p>
                    <Button border='1px solid black' onClick={createStripeAcc} buttonText='Skapa stripe konto'/>
               {/*      <p> {props.stripeAccountStatus?.message} </p> */}
                </div>
                : props.stripeAccountStatus?.status === 201?
                    <div>
                        <p style={textStyle}>Steg 2: Länka ditt stripe konto till oss för att ta betalt</p>
                        <p style={textStyle}> {props.stripeAccountStatus.message} </p>
                        <Button border='1px solid black' onClick={createStripeLink} buttonText='Länka konto'/>
                    </div>
                    : props.stripeAccountStatus?.status === 202?
                        <p style={textStyle}> {props.stripeAccountStatus?.message} </p>
                        : props.stripeAccountStatus?.status === 200?
                            <p style={textStyle}> {props.stripeAccountStatus?.message} </p>
                            : null    
            }
        </div>    
            
    );
}

const StripeActivation: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    //marginTop: '1em',
    width: "100%",
    height: "100%",
}

const textStyle: CSSProperties = {
    margin: "0 0 1em 0"
}