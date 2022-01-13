import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Button from '../UI/button';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Product } from '../../models';

type Props = {
    product: Product
    syncCart: () => void
}

type AddOrRemove = "plus" | "minus" | "remove"
export default function CartProductController(props: Props) {


    const changeQuantity = (addOrRemove?: AddOrRemove) => {
        let localst: string | null = localStorage.getItem('cart')
        
        if(localst) {
            let parsedLocal = JSON.parse(localst)
            let foundProduct = parsedLocal.find((oldProduct: any) => oldProduct.id == props.product.id)
            if(foundProduct) {
                if(addOrRemove === "plus") {
                    foundProduct.quantity++
                }
                else if(addOrRemove === "minus") {
                    if(foundProduct.quantity <= 1) { 
                        let index = parsedLocal.findIndex((parsedItem: any) => parsedItem.id === foundProduct.id)
                        parsedLocal.splice(index, 1)
                    }
                    else {
                        foundProduct.quantity--
                    }
                }
                else if(addOrRemove === "remove") {
                    let index = parsedLocal.findIndex((parsedItem: any) => parsedItem.id === foundProduct.id)
                    parsedLocal.splice(index, 1)
                }
            }
            localStorage.setItem('cart', JSON.stringify(parsedLocal))
            props.syncCart()
        }
    }


    return (
        <div style={cartProductControllerStyle}>
            <Button height="20%" width='30%' icon={<FaPlus />} onClick={() => {changeQuantity("plus")}}/>
            <div style={{width: "30%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p>{props.product.quantity}</p>
            </div>
            <Button height="20%" width="30%" icon={<FaMinus />} onClick={() => {changeQuantity("minus")}}/>
            <Button height="20%" width='100%' bgColor='red' icon={<RiDeleteBin5Fill/>} onClick={() => {changeQuantity("remove")}}/>
        </div>
    );
}

const cartProductControllerStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between"
}