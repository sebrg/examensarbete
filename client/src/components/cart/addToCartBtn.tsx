import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Button from '../UI/button'
import { Product } from '../../models'
import { DocumentData } from 'firebase/firestore';
type Props = { //FIXME Fix correct types
    product: DocumentData
}

export default function AddToCartBtn(props: Props) {

    const addToLocal = (product: DocumentData) => {
        let newCart = []
        let currentCart = []
        let localst: string | null = localStorage.getItem('cart')
        
        if(localst) {
            currentCart = JSON.parse(localst)
       }

        if(!currentCart.length) {
            newCart.push(product.id)
        }
        
        else {
            newCart = [...currentCart]
            newCart.push(product.id)
        }

        localStorage.setItem('cart', JSON.stringify(newCart))
    }
    
    return (
		<Button width='100%' onClick={() => addToLocal(props.product)} buttonText='Lägg till i kundvagn'/>
    );
}