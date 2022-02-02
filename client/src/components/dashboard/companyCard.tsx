import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Company } from '../../models';
import Button from '../UI/button';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { FbQuery, Order } from '../../types';
import { documentId } from 'firebase/firestore';
import ConfirmOrder from './confirmOrder';

//FIXME: fix styling and closing function. event.propago....


type Props = {
    order: Order | null
}


export default function CompanyCard(props: Props) {

    const [orderOpen, setOrderOpen] = useState<boolean>(false)
    
    const companyContext: CompanyOptions = useContext(CompanyContext)

    const [open, setOpen] = useState<boolean>(false)
   

    return (

        <div className='foldableCompanyOrderCard' style={open? foldableCompanyCardOpen : foldableCompanyCardClosed}  onClick={open? (event) => event.stopPropagation() : () => setOpen(!open)}>
            {orderOpen?      
               <ConfirmOrder setOrderOpen={(bool: boolean) => setOrderOpen(bool)} order={props.order}/>
               : null
            } 
            <div className='foldableCompanyOrderCardHeader' style={foldCardHeader} onClick={() => setOpen(!open)}>
                <h1 style={{fontSize: "1.5em", marginTop: "auto", marginBottom: "auto"}}>{props.order?.orderDate} </h1>
                <p style={{display: "flex", alignItems: "center"}}>Order</p>
                {open? 
                    <BsFillArrowUpCircleFill style={{color: "white", fontSize: "2rem", position: "absolute", /* top: 0, */ right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                    :
                    <BsFillArrowDownCircleFill style={{color: "white", fontSize: "2rem", position: "absolute", /* top: 0, */ right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                }
            </div>
            {open? 
                <div className="foldableCompanyOrderCardContent" style={open? foldableCardContentOpen : foldableCardContentClosed}>
                
                        
                    <div className='orderProductWrapper' style={{backgroundColor: "lightgray", borderRadius: "10px", padding: "1em", width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {props.order?.products.map((product, key) => {
                            return (
                                <div key={key} className='companyOrder' style={{color: "black", backgroundColor: "rgb(221 221 221)", padding: "0.5em", borderRadius: "10px", minWidth: "250px", maxWidth: "500px", /* width: "30%", */ flexGrow: "1", display: "flex", flexWrap: "wrap", justifyContent: "space-between", margin: "1em"}}>
                                    
                                    <div style={{}}>
                                        <p style={{fontSize: "1em"}}>Namn: </p>
                                        <p style={{fontSize: "1.2em"}}>{product.name}</p>
                                    </div>
                                    <div>
                                        <p style={{fontSize: "1em"}}>Pris: </p>
                                        <p style={{fontSize: "1.2em"}}>{product.unitPrice} st</p>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", fontSize: "1.5em"}}>
                                        <p style={{fontSize: "1em"}}>{"x" + product.quantity} </p>
                                    </div>

                                </div>
                            )
                        })}        

                        <div className='companyOrderCardInfo' style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "space-around", marginTop: "1em", fontSize: "1.5em"}}>
                         {/*    <p style={{marginRight: '1em'}}>{"Köpt av: " + "kundnamn"}</p> */}
                            <p>{"Totalpris: " + props.order?.totalPrice + " SEK"}</p>
                            {
                                props.order? 
                                    props.order.shipped === "Yes"?
                                    <div style={{marginLeft: '1em', color: 'Green'}}>Skickad</div>
                                    :
                                    <Button onClick={() => setOrderOpen(!orderOpen)} height='75%' margin='0px 0em 0em 1em' bgColor='green' buttonText='Skicka'/>
                                    :
                                    null
                            }
                        </div>
                    </div>
                        
                 
                </div>
                   
  

            
            : null}
            
        </div>
    )
}

const foldableCompanyCardOpen: CSSProperties = {
    display: "flex",
    flexDirection: "column",  
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    padding: "0.5em 0.5em 0em 0.5em",
    width: "100%",
    //height: "100%",
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
    cursor: "pointer",
}

const foldableCardContentOpen: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "80%",
    padding: "1em",
    alignContent: "flex-start",
    //overflow: "scroll",
    width: "100%"
}

const foldableCardContentClosed: CSSProperties = {
}