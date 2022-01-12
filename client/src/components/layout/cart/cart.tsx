import { DocumentData, documentId } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseOptions, FirebaseContext } from '../../../context/firebaseContext';
import { ProductContext, ProductOptions } from '../../../context/products/productContext';

export default function Cart() {

    const [products, setProducts] = useState<DocumentData[]>()
    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const productContext: ProductOptions = useContext(ProductContext)

    //productContext.functions.getAllProducts()
    
    const test = async () => {
        let localst: string | null = localStorage.getItem('cart')
        if(localst) {
            let parsedLocal = JSON.parse(localst)
        
        }
    }

    useEffect(() => {
        test()
    }, [])

    useEffect(() => {
        console.log(productContext.allProducts)
    }, [productContext.allProducts])


    const getProducts = async () => {
            const products = await fbFuncs.getAllProducts()
            setProducts(products) 
    }

    return (
		<div>
            dad
        </div>
    );
}