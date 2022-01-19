
import { Elements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { Product } from '../../models';
import Button from '../UI/button';
import CheckoutStripe from './checkoutStripe';

type Cart = {
    companyId: string
    companyName: string
    stripeId: string
    products: Product[]
}

type Props = {
    setCheckoutOpen: (bool: boolean) => void,
    stripeAccountId: string,
    cartItem: Cart
}

export default function ToCheckout(props: Props) {

    const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'
	const stripePromise = loadStripe(stripePK, {
		stripeAccount: props.stripeAccountId
	}) 

    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")

	
    return (

		<div onClick={() => props.setCheckoutOpen(false)} id='checkout-wrap' style={checkoutWrapper}>
            <div onClick={(event) => event.stopPropagation()} id='checkout-content' style={checkoutContent}>
                {currentView === "start"?   
                    <Button onClick={() => setCurrentView("stripe")} width="25vw" minWidth='50%' height='5vh' buttonText='Stripe'></Button>
                    : currentView === "stripe"? 
                    <Elements stripe={stripePromise} key={props.stripeAccountId}>
                        <CheckoutStripe stripeAccountId={props.stripeAccountId} cartItem={props.cartItem} />
                    </Elements>    
                    : null
                }
        
            </div>
       

        </div>

  
    );
}

const checkoutWrapper: CSSProperties = {
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

const checkoutContent: CSSProperties = {
    width: "50%",
    height: "70%",
    backgroundColor: "rgb(239, 225, 206)",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}