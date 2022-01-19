import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import Button from '../UI/button';

type Status = {
    status: number,
    message: string
}

type Props = {
    stripeId: string
    stripeAccountStatus: Status | undefined
    setStripeAccountStatus: (status: Status) => void
}

export default function ActivateStripe(props: Props) {

    
    const companyContext: CompanyOptions = useContext(CompanyContext)
   
    const stripe =  useStripe()
    
   /*  async function getAccount() {
        if(stripe) {
            const response = await fetch("http://localhost:3001/getStripeAcc", {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({stripeId: props.stripeId})
            })
            
            const status = await response.json()
            props.setStripeAccountStatus(status)
        }
        
    } */
    
    async function createStripeAcc() {
        if(stripe) {
            const response = await fetch("http://localhost:3001/createStripe", {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
            })
            
			const { id } = await response.json()
            companyContext.updateCompany(id)
            
		}  
	}
    
    async function createStripeLink() {
        if(stripe && props.stripeId) {
            const response = await fetch("http://localhost:3001/createStripeLink", {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({stripeId: props.stripeId})
            })
			const { url } = await response.json()
            window.location.href = url
			
		}  
	}

    useEffect(() => {
       /*  if(props.stripeId) {
            getAccount()
        } */
    }, [stripe])


    return (
        <div style={StripeActivation}> 
            {
                !props.stripeId? 
                    <div>
                        <p>Steg 1: Skapa ditt stripe konto för att ta emot kortbetalningar</p>
                        <Button onClick={createStripeAcc} buttonText='Skapa stripe konto'/>
                        <p> {props.stripeAccountStatus?.message} </p>
                    </div>

                    :
                    props.stripeAccountStatus?.status === 201?
                        <div>
                            <p>Steg 2: Länka ditt stripe konto till oss för att ta betalt</p>
                            <Button onClick={createStripeLink} buttonText='Länka konto'/>
                            <p> {props.stripeAccountStatus?.message} </p>
                        </div>
                        :
                        props.stripeAccountStatus?.status === 202?
                            <p> {props.stripeAccountStatus?.message} </p>
                        : 
                        props.stripeAccountStatus?.status === 200?
                            <p> {props.stripeAccountStatus?.message} </p>
                        :
                        null    
            }
        </div>    
            
    );
}

const StripeActivation: CSSProperties = {
    backgroundColor: 'black'
}