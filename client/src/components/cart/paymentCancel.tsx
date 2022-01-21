import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useState } from 'react'
import { useMatch } from 'react-router-dom';
import Button from '../UI/button';
import ResumeStripe from './resumeStripe';
import { ProductContext, ProductOptions } from '../../context/products/productContext';


export default function PaymentCancel() {

    const productContext: ProductOptions = useContext(ProductContext)

    let match = useMatch({
        path: "/cancel/:stripeId/:sessionId"
    });
    const sessionId = match?.params.sessionId
    const stripeId = match?.params.stripeId

    const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'
    const [stripePromise, setStripePromise] = useState(() => loadStripe(stripePK, {stripeAccount: stripeId}))

    const [currentView, setCurrentView] = useState<"start" | "resumeStripe">("start")

    async function expireCheckoutSession() {
      		const response = await fetch("http://localhost:3001/expireSession", {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
                body: JSON.stringify({sessionId: sessionId, stripeAccId: stripeId})
      		})

			const data = await response.json()
            console.log(data)
            productContext.functions.verifyCheckoutSession() 
    }


    return (

		<div>
     
            {currentView === "start"?
                <div>
                    <Button linkTo={'/'} onClick={expireCheckoutSession} width="25vw" minWidth='50%' height='5vh' buttonText='Gå tillbaka till start'></Button> 
                    <Button onClick={() => setCurrentView("resumeStripe")} width="25vw" minWidth='50%' height='5vh' buttonText='Återuppta köp'></Button>      
                </div>
                    : currentView === "resumeStripe" && sessionId?     
                        <Elements stripe={stripePromise} key={stripeId}>
                            <ResumeStripe sessionId={sessionId}/> 
                        </Elements>
                        : null            
            }

        </div>

  
    );
}