import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useState } from 'react'
import { Navigate, useMatch } from 'react-router-dom';
import Button from '../UI/button';
import ResumeStripe from './resumeStripe';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import SpinnerModal from '../functions/spinnerModal';
import GeneralProvider from '../../context/general/generalProvider';
import { GeneralContext, GeneralOptions } from '../../context/general/generalContext';



export default function PaymentCancel() {

    const general: GeneralOptions = useContext(GeneralContext)
    const productContext: ProductOptions = useContext(ProductContext)

    let match = useMatch({
        path: "/cancel/:stripeId/:sessionId"
    });
    const sessionId = match?.params.sessionId
    const stripeId = match?.params.stripeId

    const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'
    const [stripePromise, setStripePromise] = useState(() => loadStripe(stripePK, {stripeAccount: stripeId}))

    const [currentView, setCurrentView] = useState<"start" | "resumeStripe">("start")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [redirect, setRedirect] = useState<boolean>(false)

    async function expireCheckoutSession() {
      		const response = await fetch(`${general.path}/expireSession` , {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
                body: JSON.stringify({sessionId: sessionId, stripeAccId: stripeId})
      		})

			const data = await response.json()
            console.log(data)
            const result = await productContext.functions.verifyCheckoutSession(general.path as string) 
            return result
    }

   
    return (
        
        redirect?
            <Navigate to={"/"} replace />
            :
            isLoading?
                <SpinnerModal fullScreen={true}/>
            :
                 
            <div style={cancelDiv}>
    
                {currentView === "start"?
                    <div style={{marginTop: '2em', padding: '1em'}}>
                        <h1 style={{marginBottom: '1em'}}>Oj.. ser ut som att du avbröt ditt köp</h1>
                        <Button  border='1px solid black' margin='0 0 1em 0' bgColor='#88B04B' onClick={() => setCurrentView("resumeStripe")} width="100%" minWidth='50%' height='5vh' buttonText='Återuppta köp'></Button>      
                        <Button  border='1px solid black' bgColor='#BC243C' width="100%" minWidth='50%' height='5vh' buttonText='Gå tillbaka till start' onClick={ async () => {  
                            setIsLoading(true) 
                            const test = await expireCheckoutSession()
                            if(test) { 
                                setIsLoading(false)
                                setRedirect(true)
                                
                            }
                            }}/>
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

const cancelDiv: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
}