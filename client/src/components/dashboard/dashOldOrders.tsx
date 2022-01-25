import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import FoldableOrderCard from './foldableOrderCard';


interface ProductInOrder {
    name: string,
    quantity: number,
    unitPrice: string
}

interface Order {
    companyId: string,
    currency: string,
    customerId: string,
    id: string,
    orderDate: Date,
    payment_status: string,
    products: ProductInOrder[],
    session_status: string,
    stripeCustomerId: string,
    stripe_acc_id: string,
    totalPrice: number
}



export default function DashOldOrders() {

    
    const productContext: ProductOptions = useContext(ProductContext)
    const [oldOrders, setOldOrders] = useState<Order[] | null>(null)

    let match = useMatch({
        path: "/myPages/:userId/oldOrders"
    });
    const userId = match?.params.userId

    const getOrderByUser = async () => {
        if(userId) {
            const allOrders = await productContext.functions.getOrdersByUser(userId)
            setOldOrders(allOrders as Order[])
        }
    }

    useEffect(() => {
        getOrderByUser()
    }, []) 

    useEffect(() => {
        console.log(oldOrders)
    }, [oldOrders]) 




    return (      
        <div className='noScrollBar' style={{height: '100%', overflow: 'auto'}}>
            <FoldableOrderCard order={oldOrders}/>

        </div>
    );
}
