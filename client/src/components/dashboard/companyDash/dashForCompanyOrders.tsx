import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { Order } from '../../../types';
import SpinnerModal from '../../functions/spinnerModal';
import Button from '../../UI/button';
import CompanyCard from '../companyCard';
import DashForCompanyShippedOrders from './dashForCompanyShippedOrders';

type Alternatives = "show" | "showShipped"

export default function DashForCompanyOrders() {


    const companyContext: CompanyOptions = useContext(CompanyContext)    
    const [oldOrders, setOldOrders] = useState<Order[] | null>()
    const [viewAlternative, setViewAlternative] = useState<Alternatives>("show")

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
        <div id="companyDashOrdersWrapp" style={companyDashOrderWrappStyle}>

            <div id="companyDashOrderBtnDiv" style={companyDashOrderBtnDivStyle}>
                            <Button 
                                margin='0 0 0.5em 0' 
                                /*   width="50%"   */
                                border="2.5px solid white"
                                buttonText='Inkomna ordrar' 
                                bgColor={viewAlternative === "show"? "white" : ""}
                                color={viewAlternative === "show"?  "black" : "white"}
                                onClick={() => setViewAlternative('show')} 
                                
                            />

                            <Button 
                                onClick={() => setViewAlternative('showShipped')} 
                                margin='0 0 0.5em 0' 
                             /*    width="50%"  */
                                border="2.5px solid white"
                                buttonText='Skickade ordrar'
                                bgColor={viewAlternative === "showShipped"? "white" : ""}
                                color={viewAlternative === "showShipped"?  "black" : "white"}

                            />
            </div>

                    {viewAlternative === "show"? 
                        
                        oldOrders === undefined? 
                            <SpinnerModal fullScreen={true}/>
                            : oldOrders?.length?
                            <div id="dashShowOrders" className='noScrollBar' style={dashShowOrdersStyle}>
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

                            : viewAlternative === "showShipped"? 
                                <DashForCompanyShippedOrders/>
                            : null
                    }
        </div>
               



    );
}

const companyDashOrderWrappStyle: CSSProperties = {
    width: "100%",
    height: "85%",
    padding: "1em",
    display: "flex",

}

const companyDashOrderBtnDivStyle: CSSProperties = {
    width: "30%"
}

const dashShowOrdersStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    padding: "0px 1em",
    overflow: "auto"
}

