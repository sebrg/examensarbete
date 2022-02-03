import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import { Order } from '../../types';
import SpinnerModal from '../functions/spinnerModal';
import FoldableOrderCard from './foldableOrderCard';

export default function DashOldOrders() {

    
    const productContext: ProductOptions = useContext(ProductContext)
    const [oldOrders, setOldOrders] = useState<Order[] | null>()

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
 

    return (      
        oldOrders === undefined? 
            <SpinnerModal/>
                : oldOrders?.length?
                <div id="orderWrapp" className='noScrollBar' style={{height: '100%', overflow: 'auto', padding: "1em"}}>
                    {oldOrders?.map((order, key) => {
                        return <FoldableOrderCard key={key} order={order}/>
                    })}

                </div>
                : !oldOrders?.length? 
                    <div style={{display: "flex"}}>
                        <p style={{margin: "2em", fontSize: "1.3em"}}>Du har inga gamla ordrar.</p>
                    </div>
                    : null
    );
}
