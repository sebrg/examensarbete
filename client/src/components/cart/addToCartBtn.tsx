import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Button from '../UI/button'
import { Product } from '../../models'
import { DocumentData } from 'firebase/firestore';
type Props = { //FIXME Fix correct types
    product: Product
}

export default function AddToCartBtn(props: Props) {

    const addToLocal = (product: Product) => {
        let newCart = []
        let currentCart = []
        let localst: string | null = localStorage.getItem('cart')
        
        if(localst) {
            currentCart = JSON.parse(localst)
       }

        if(!currentCart.length) {
            newCart.push({id: product.id, quantity: 1})
        } else {
            newCart = [...currentCart]
            let foundProduct = newCart.find(oldProduct => oldProduct.id == product.id)
            if(foundProduct) {
                foundProduct.quantity++
            } else {
                newCart.push({id: product.id, quantity: 1})
            }
        }

        localStorage.setItem('cart', JSON.stringify(newCart))
    }
    
    return (
		<Button border='1px solid black' width='100%' onClick={() => addToLocal(props.product)} buttonText='Lägg till i kundvagn'/>
    );
}