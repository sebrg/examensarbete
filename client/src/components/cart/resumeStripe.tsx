import { Elements, useStripe } from '@stripe/react-stripe-js'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom';
import { Product } from '../../models';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import SpinnerModal from '../functions/spinnerModal';

type Props = {
    sessionId: string
}

export default function ResumeStripe(props: Props) {


    const stripe = useStripe()

    async function RedirectResumedCheckout() {
        if(stripe) {
            stripe.redirectToCheckout({sessionId: props.sessionId})
        }
    }

    useEffect(() => {
        RedirectResumedCheckout()
    }, [stripe])


    return (
        <SpinnerModal fullScreen={true}/>
    );
}
