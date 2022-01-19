import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import Button from '../UI/button';

type Status = {
    status: number,
    message: string
}

export default function ActivateStripe() {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [stripeId, setStripeId] = useState<string | null>(null)
    const [accountStatus, setAccountStatus] = useState<Status>()

    const setState = async () => {
        let currentCompany = await companyContext.getCurrentUserCompany()
        if(currentCompany[0].payments.stripe_acc_id) {
            setStripeId(currentCompany[0].payments.stripe_acc_id)
        }
        if(currentCompany[0].payments.enabled === false) { //NOTE: Ska den ligga här?? 
            if(accountStatus?.status === 200) {
                companyContext.setPaymentEnabled(true)
            }
        }
    }

    useEffect(() => {
        setState()
    }, []) 

    useEffect(() => {
        getAccount()
        console.log("state = ", stripeId)
    }, [stripeId])

    useEffect(() => {
        console.log("accStatus:", accountStatus)
    }, [accountStatus])


    const stripe = useStripe()

    async function getAccount() {
        if(stripe && stripeId) {
            const response = await fetch("http://localhost:3001/getStripeAcc", {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({stripeId: stripeId})
            })

            const status = await response.json()
            console.log(status.status)
            setAccountStatus(status)
      }
      
    }

    async function createStripeAcc() {
		if(stripe) {
      		const response = await fetch("http://localhost:3001/createStripe", {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
      		})

			const { id } = await response.json()
			console.log("stripe acc id:" , id)
            companyContext.updateCompany(id)
        			
		}  
	}

    async function createStripeLink() {
		if(stripe && stripeId) {
      		const response = await fetch("http://localhost:3001/createStripeLink", {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
                body: JSON.stringify({stripeId: stripeId})
      		})
            console.log(stripeId)
			const { url } = await response.json()
            window.location.href = url
			
		}  
	}

    return (
    
        <div style={StripeActivation}> 
            {
                !stripeId? 
                    <div>
                        <p>Steg 1: Skapa ditt stripe konto för att ta emot kortbetalningar</p>
                        <Button onClick={createStripeAcc} buttonText='Skapa stripe konto'/>
                        <p> {accountStatus?.message} </p>
                    </div>

                    :
                    accountStatus?.status === 201?
                        <div>
                            <p>Steg 2: Länka ditt stripe konto till oss för att ta betalt</p>
                            <Button onClick={createStripeLink} buttonText='Länka konto'/>
                            <p> {accountStatus?.message} </p>
                        </div>
                        :
                        accountStatus?.status === 202?
                            <p> {accountStatus?.message} </p>
                        : 
                        accountStatus?.status === 200?
                            <p> {accountStatus?.message} </p>
                        :
                        null    
            }
        </div>    
  
    );
}

const StripeActivation: CSSProperties = {
    backgroundColor: 'black'
}