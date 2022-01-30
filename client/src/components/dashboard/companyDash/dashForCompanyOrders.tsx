import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { ProductContext, ProductOptions } from '../../../context/products/productContext';
import { Order } from '../../../types';
import SpinnerModal from '../../functions/spinnerModal';
import Button from '../../UI/button';
import CompanyCard from '../companyCard';
import FoldableOrderCard from '../foldableOrderCard';

export default function DashForCompanyOrders() {


    const companyContext: CompanyOptions = useContext(CompanyContext)    
    const [oldOrders, setOldOrders] = useState<Order[] | null>()

    let match = useMatch({
        path: "/myPages/:userId/:companyId/*"
    });

    const companyId = match?.params.companyId
    
    const getNonShippedOrders = async () => {
        if(companyId) {
            const allOrders = await companyContext.getOrdersByCompany(companyId, "No")
            setOldOrders(allOrders as Order[])
        }
    }

    useEffect(() => {
        getNonShippedOrders()
    }, []) 

    useEffect(() => {
    }, [oldOrders]) 




    return (
        
        oldOrders === undefined? 
        <SpinnerModal/>
            : oldOrders?.length?
            <div id="orderWrapp" className='noScrollBar' style={{height: '85%', overflow: 'auto', padding: "1em"}}>
                {oldOrders?.map((order, key) => {
                    return (
                            <CompanyCard key={key} order={order}/>
                    )
                })}

            </div>
            : !oldOrders?.length? 
                <div style={{display: "flex"}}>
                    <p style={{margin: "2em", fontSize: "1.3em"}}>Det finns inga inkomna ordrar.</p>
                </div>
                : null

    );
}
