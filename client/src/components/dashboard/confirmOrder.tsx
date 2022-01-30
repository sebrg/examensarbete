import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { JsxElement } from 'typescript';
import { InputType } from 'zlib';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { Product } from '../../models';
import { Order } from '../../types';
import Button from '../UI/button';



type Props = {
    setCheckoutOpen: (bool: boolean) => void,
    order: Order | null
}



export default function ConfirmOrder(props: Props) {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")
    const [cbValue, setCbValue] = useState(false)
    const [isShipped, setIsShipped] = useState<string>()

    const cbIsChecked = async (element: any) => {
        if(element.target.checked) {
            setCbValue(true)
            if(props.order) {
                companyContext.orderIsShipped(props.order?.id, "Yes")
                setIsShipped("Yes")
            }
        }
        else {
            setCbValue(false)
        }
    }

    useEffect(() => {
        console.log(cbValue)
    },[cbValue])

    useEffect(() => {
        setIsShipped(props.order?.shipped)
    },[props.order])

    useEffect(() => {
        console.log(isShipped)
    },[isShipped])
   
	
    return (

		<div onClick={() => props.setCheckoutOpen(false)} id='checkout-wrap' style={checkoutWrapper}>
            <div onClick={(event) => event.stopPropagation()} id='checkout-content' style={checkoutContent}>
                {currentView === "start"?
                    <div>     
                        <Button border='1px solid black' width="25vw" minWidth='50%' height='5vh' buttonText='Boka frakt'></Button>
                        {
                            isShipped === "Yes"?
                            <div>
                                <p style={{marginTop: '1em', marginBottom: '1em'}}>Ordern är skickad</p>
                                <input onChange={(event) => cbIsChecked(event)} type='checkbox' style={{width: '3em', height: '3em'}} checked/>
                            </div>    
                            :
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
                                <p style={{marginTop: '1em', marginBottom: '1em'}}>Markera ordern som skickad</p>
                                <input onChange={(event) => cbIsChecked(event)} type='checkbox' style={{width: '3em', height: '3em'}}/>                    
                            </div>
                        }
                    </div>
                    :
                    null 
                }
        
            </div>
       

        </div>

  
    );
}

const checkoutWrapper: CSSProperties = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "99",
    padding: "2em",
    justifyContent: "center",
    alignItems: "center"
}

const checkoutContent: CSSProperties = {
    width: "50%",
    height: "50%",
    backgroundColor: "gray",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: "center"
}