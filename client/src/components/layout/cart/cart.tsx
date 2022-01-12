import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseOptions, FirebaseContext } from '../../../context/firebaseContext';

export default function Cart() {

    const [products, setProducts] = useState<DocumentData[]>()
    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

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