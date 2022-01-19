
import { Elements, useStripe } from '@stripe/react-stripe-js'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom';
import { Product } from '../../models';

type Cart = {
    companyId: string
    companyName: string
    stripeId: string
    products: Product[]
}

type Props = {
    stripeAccountId: string,
    cartItem: Cart
}


export default function CheckoutStripe(props: Props) {

    const stripe = useStripe()
   
    let match = useMatch({
        path: "/cart/:id"
    });

    const userId = match?.params.id

    async function toCheckOut() {
		if(stripe) {
      		const response = await fetch("http://localhost:3001/checkout", {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
                body: JSON.stringify({products: props.cartItem.products, companyId: props.cartItem.companyId, userId: userId, stripeId: props.stripeAccountId})
      		})

			const { id } = await response.json()
			console.log(id)
			stripe.redirectToCheckout({sessionId: id})
		}  
	}

    useEffect(() => {
        toCheckOut()
    }, [stripe])


	
    return (
            <p>..spinner</p>
    );
}
