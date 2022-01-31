import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { Company } from '../../../models';
import SpinnerModal from '../../functions/spinnerModal';
import Button from '../../UI/button';



type Props = {
    setShippingOpen: (bool: boolean) => void,
    company: Company,
    getCompany: () => Promise<void>
}


export default function ShippingPopup(props: Props) {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")
    const [shippingPrice, setShippingPrice] = useState<string>(props.company? props.company.shipping.shippingPrice.toString() : "0")
    const [freeShippingOver, setFreeShippingOver] = useState<string>(props.company? props.company.shipping.freeShippingOver.toString() : "0")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [statusMsg, setStatusMsg ] = useState<string | undefined>(undefined)

    const updateShippingPrice = (event: any) => {
        event? setShippingPrice(event.target.value) : setShippingPrice(props.company? props.company.shipping.shippingPrice.toString() : "0")
    }

    const updateFreeShippingOver = (event: any) => {
        event? setFreeShippingOver(event.target.value) : setFreeShippingOver(props.company? props.company.shipping.freeShippingOver.toString() : "0") 
    }

    return (

		<div onClick={() => props.setShippingOpen(false)} id='shippingPopup-wrap' style={checkoutWrapper}>
            <div onClick={(event) => event.stopPropagation()} id='shipping-popup' style={checkoutContent}>
                {props.company !== undefined?
                    <div>     
                        <p style={{marginTop: '1em'}}>Fraktpris:</p>
                        <input onChange={(event) => updateShippingPrice(event)} type='number' placeholder={props.company.shipping.shippingPrice.toString()}  style={{...inputStyle, marginBottom: '1em'}} />
                        <p>Gratis frakt om över:</p>
                        <input onChange={(event) => updateFreeShippingOver(event)} type='number' placeholder={props.company.shipping.freeShippingOver.toString()} style={inputStyle} />
                        <Button bgColor='#04AA6D' border='1px solid black' margin='1em 0 1em 0' buttonText='Uppdatera' onClick={ async () => {
                        setIsLoading(true)
                        let result = await companyContext.updateShipping(shippingPrice, freeShippingOver)
                        if(result.status) {
                            setStatusMsg(result.message)
                            setTimeout(() => {
                                if(result.status === 200) {
                                    props.setShippingOpen(false)
                                    props.getCompany()
                                    setStatusMsg(undefined)
                                    setIsLoading(false)
                                } else { 
                                    props.getCompany()
                                    setStatusMsg(undefined)
                                    setIsLoading(false)
                                }
                            }, 2000);
                        }

                    }}/> 
                        <Button onClick={() => props.setShippingOpen(false)} bgColor='#DD4124' border='1px solid black' margin='0em 0 1em 0' buttonText='Stäng' />
                    </div>
                    
                    :
                    null 
                }
        
            </div>
                {isLoading? 
                    <SpinnerModal fullScreen={true} message={statusMsg} />
                    : null
                }

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
    width: "70%",
/*     height: "50%", */
    backgroundColor: "#5B5EA6",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '0.5em'
}

const inputStyle: CSSProperties = {
    border: "none", 
    width: "100%",
    /* height: "20%", */
    fontSize: "1.5em",
    borderRadius: '5px',
    textAlign: 'center',
    backgroundColor: '#DFCFBE'
}    