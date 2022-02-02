import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { Order } from '../../../types';
import SpinnerModal from '../../functions/spinnerModal';
import CompanyCard from '../companyCard';


export default function DashForCompanyShippedOrders() {


    const companyContext: CompanyOptions = useContext(CompanyContext)    
    const [oldOrders, setOldOrders] = useState<Order[] | null>()

    let match = useMatch({
        path: "/myPages/:userId/:companyId/*"
    });

    const companyId = match?.params.companyId
    
    const getShippedOrders = async () => {
        if(companyId) {
            const allOrders = await companyContext.getOrdersByCompany(companyId, "Yes")
            setOldOrders(allOrders as Order[])
        }
    }

    useEffect(() => {
        getShippedOrders()
    }, []) 

    useEffect(() => {
    }, [oldOrders]) 




    return (
        
        oldOrders === undefined? 
        <SpinnerModal fullScreen={true}/>
            : oldOrders?.length?
            <div id="dashShowShipped" className='noScrollBar' style={dashShowShipped}>
                {oldOrders?.map((order, key) => {
                    return (
                            <CompanyCard key={key} order={order}/>
                    )
                })}

            </div>
            : !oldOrders?.length? 
                <div style={{display: "flex"}}>
                    <p style={{margin: "2em", fontSize: "1.3em"}}>Det finns inga skickade ordrar.</p>
                </div>
                : null

    );
}

const dashShowShipped: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    padding: "0px 1em",
    overflow: "auto"
}