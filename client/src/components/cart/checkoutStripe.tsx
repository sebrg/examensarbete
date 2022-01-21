
import { Elements, useStripe } from '@stripe/react-stripe-js'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom';
import { Product } from '../../models';
import { ProductContext, ProductOptions } from '../../context/products/productContext';

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

    const productContext: ProductOptions = useContext(ProductContext)

    const stripe = useStripe()
   
    let match = useMatch({
        path: "/cart/:id"
    });

    const userId = match?.params.id

    async function toCheckOut() {
        // Går til stripe checkout å skickar upp en pendingOrder till db
		if(stripe) {
      		const response = await fetch("http://localhost:3001/checkout", {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
                body: JSON.stringify({products: props.cartItem.products, companyId: props.cartItem.companyId, userId: userId, stripeId: props.stripeAccountId})
      		})

			const data = await response.json()

            console.log(data.pendingOrder)
            const setPendingOrder = productContext.functions.addPendingOrder(data.id, data.pendingOrder)
            const productIds: any[] = data.cartItemIds
            let localst = localStorage.getItem('cart')
            if(localst) {
                let parsedLocal: [] | any = JSON.parse(localst)

                productIds.forEach(data => {
                    const filteredIds = parsedLocal.find((item: any) => item.id == data.productId)
                    productContext.functions.updateQuantityOnPurchase(data.productId, filteredIds.quantity)
                })

                await Promise.all([setPendingOrder, productIds])
            }  
            stripe.redirectToCheckout({sessionId: data.id})
        }
    }


    useEffect(() => {
        toCheckOut()
    }, [stripe])


	
    return (
            <p>..spinner</p>
    );
}
