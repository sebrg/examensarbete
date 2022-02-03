import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { Order } from '../../types';
import SpinnerModal from '../functions/spinnerModal';
import Button from '../UI/button';


type Props = {
    setOrderOpen: (bool: boolean) => void,
    order: Order | null
    getNonShippedOrders: () => void
}


export default function ConfirmOrder(props: Props) {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [cbValue, setCbValue] = useState(false)
    const [isShipped, setIsShipped] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const [statusMsg, setStatusMsg] =useState<string | undefined>(undefined)


    const cbIsChecked = async (element: any) => {
        if(element.target.checked) {
            setCbValue(true)
        }
        else {
            setCbValue(false)
        }
    }

    const markOrder = async () => {
        if(props.order && cbValue === true) {
            const result = await companyContext.orderIsShipped(props.order?.id, "Yes")
            setIsShipped("Yes")
            
            console.log(result.message)
            setStatusMsg(result.message)
            return result.status
        }

        else {
            setStatusMsg('Inga ändringar har gjorts..')
        }

    }

    useEffect(() => {
        console.log(cbValue)
    },[cbValue])

   /*  useEffect(() => {
        setIsShipped(props.order?.shipped)
    },[props.order]) */

    useEffect(() => {
        console.log(isShipped)
    },[isShipped])

  /*   useEffect(() => {
        console.log(props.order)
    },[props.order]) */



	
    return (

		<div onClick={() => props.setOrderOpen(false)} id='markorder-wrap' style={checkoutWrapper}>

            {isLoading?
                <SpinnerModal fullScreen={true} message={statusMsg} />
                : null
            }

            <div onClick={(event) => event.stopPropagation()} id='markorder-content' style={checkoutContent}>
                        <h4>Adress till köpare</h4>
                        <p> {props.order?.userInfo.firstName} </p>
                        <p> {props.order?.userInfo.surName} </p>
                        <p> {props.order?.userInfo.city} </p>
                        <p> {props.order?.userInfo.municipality} </p>
                        <p> {props.order?.userInfo.adress} </p>
                        <p style={{marginBottom: '1em'}}> {props.order?.userInfo.zipCode} </p>
                        {/* <Button border='1px solid black' minWidth='50%' height='5vh' buttonText='Boka frakt'></Button>   NOTE: Boka frakt nångång   */} 
                        
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: '5em'}}> 
                                <input onChange={(event) => cbIsChecked(event)} type='checkbox' style={{width: '3em', height: '3em', marginRight: '1em'}}/>
                                <Button border='1px solid black' minWidth='50%' buttonText='Markera ordern som skickad' onClick={ async () => {
                                    setIsLoading(true)
                                    const result = await markOrder()
                                    if(result === 200) {
                                        setTimeout(() => {
                                            setIsLoading(false) 
                                            setStatusMsg(undefined)
                                            props.setOrderOpen(false)
                                            props.getNonShippedOrders()
                                        }, 1500);
                                    } 
                                    else {
                                        setTimeout(() => {
                                            setIsLoading(false) 
                                            setStatusMsg(undefined)
                                        }, 1000);
                                    }

                                    }}/>                    
                            </div>
                                  
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
    backgroundColor: "#EFE1CE",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: "center",
    padding: '2em',
    color: 'black'
}