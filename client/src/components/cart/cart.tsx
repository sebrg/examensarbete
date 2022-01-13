import { DocumentData, documentId } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import { Product } from '../../models';
import ProductCard from '../UI/productCard';
import CartProductController from './cartProductController';

/**
 * The cart synchronize ID'S saved in the localstorage to fetch the correct product data from the DB and 
 * then combine the quantity from localstorage with the product data from DB into state("productsInCart")
 * */ 
export default function Cart() {

    const [productsInCart, setProductsInCart] = useState<Product[]>()
    const productContext: ProductOptions = useContext(ProductContext)

    const syncCart = async () => {
        let localst: string | null = localStorage.getItem('cart')
        if(localst) {
            let parsedLocal = JSON.parse(localst)
            if(parsedLocal.length) {
                
                let cart = await productContext.functions.getProducts("products", documentId(), 'in', parsedLocal.map((localItem: any) => { return localItem.id }))
                cart.map((cartItem: any) => {
                    let foundItem = parsedLocal.find((localItem: any) => localItem.id == cartItem.id)
                    if(foundItem) {
                        cartItem.quantity = foundItem.quantity
                    }
                }) 
                setProductsInCart(cart)
            } 
            else {
                setProductsInCart(undefined)
            }
        }
    }

    useEffect(() => {
        syncCart()
    }, [])

    useEffect(() => {
        console.log(productsInCart)
    }, [productsInCart])


    

    return (
		<div id="cartProductsWrapper" style={cartProductsWrapperStyle}>
            { 
                productsInCart?    
                    productsInCart.map((product, i) => {
                            return(
                                <ProductCard key={i} 
                                    bgColor='#EFE1CE'
                                    product={product as Product} 
                                    width='15%'
                                    height='100%'
                                    imgWidth='100%'
                                    imgHeight='auto'
                                    linkTo={`${product.name}-${product.id}`}
                                    displayProductInfo={false}
                                >     
                                    
                                    <CartProductController product={product} syncCart={syncCart}/>

                                </ProductCard>
                            )
                        })
                    :
                    <p>*SPINNER* ELLER "VARUKORGEN ÄR TOM"</p>
            } 
        </div>
    );
}

const cartProductsWrapperStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    
}