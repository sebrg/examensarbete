import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Company } from '../../models';
import Button from '../UI/button';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';

//FIXME: fix styling and closing function. event.propago....

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

type Props = {
    order: Order[] | null
}


export default function FoldableOrderCard(props: Props) {
    
    const [open, setOpen] = useState<boolean>(false)

 
    return (
        <div style={orderDiv}> 
            {props.order?.map((data, i) => {
               //NOTE: Sort array efter datum ... 
                return (
                    <div key={i} id="foldableCompanyCard" className='foldableCompanyCard' style={open? foldableCompanyCardOpen : foldableCompanyCardClosed}  onClick={open? (event) => event.stopPropagation() : () => setOpen(!open)}>
                        <div className='foldCardHeader' style={foldCardHeader}>
                        <h1 style={{fontSize: "1.5em", marginTop: "auto", marginBottom: "auto"}}> Order </h1>
                        <p style={{display: "flex", alignItems: "center"}}> {data.orderDate} </p>
                        {open? 
                            <BsFillArrowUpCircleFill style={{fontSize: "2rem", position: "absolute", right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                            :
                            <BsFillArrowDownCircleFill style={{fontSize: "2rem", position: "absolute", right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                        }
                        </div>
                        {open? 
                            <div className="foldableCardContent noScrollBar" style={open? foldableCardContentOpen : foldableCardContentClosed}>
                                {data.products.map((product, i) => {
                                    return (  
                                        <div key={i} style={{display: "flex", flexGrow: 1, flexDirection: "row", backgroundColor: "lightgray", borderRadius: "10px", padding: "0.5em", margin: "0 1em 1em 1em", flexWrap: "wrap"}}>
                                            <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> {product.name}</p>
                                            <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Kvantitet: {product.quantity} </p>
                                            <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Pris: {product.unitPrice}kr/st </p>                                          
                                        </div>
                                    )
                                        
                                })}
                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Köpt av: UF namn</p>
                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> </p>
                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Totalpris: {data.totalPrice} {data.currency} </p>
                        </div>
                    :
                    null
                }
                </div>

                        
                       
                )             
                        

            })}

        </div>
                      
)}

const orderDiv: CSSProperties = {

}

const foldableCompanyCardOpen: CSSProperties = {
    display: "flex",
    flexDirection: "column",  
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    padding: "0.5em 0.5em 0em 0.5em",
    width: "100%",
    height: "100%",
    marginBottom: "1em",
    
}

const foldableCompanyCardClosed: CSSProperties = {
    display: "flex", 
    flexDirection: "column",  
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    padding: "0 0.5em",
    width: "100%",
    height: "10%",
    cursor: "pointer",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: "1em",
}

const foldCardHeader: CSSProperties = {
    display: "flex", 
    width: "100%", 
    maxHeight: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
    padding: "0 5em 0 0",
}

const foldableCardContentOpen: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    height: "80%",
    padding: "1em",
    alignContent: "flex-start",
    justifyContent: "center",
    overflow: "scroll",

}

const foldableCardContentClosed: CSSProperties = {
}
