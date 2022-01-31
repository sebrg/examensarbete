import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import Button from '../../UI/button';



type Props = {
    setShippingOpen: (bool: boolean) => void,
}


export default function ConfirmOrder(props: Props) {

    /* const companyContext: CompanyOptions = useContext(CompanyContext) */
    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")
  
   
	
    return (

		<div onClick={() => props.setShippingOpen(false)} id='checkout-wrap' style={checkoutWrapper}>
            <div onClick={(event) => event.stopPropagation()} id='checkout-content' style={checkoutContent}>
                {currentView === "start"?
                    <div>     
                        <Button border='1px solid black' width="25vw" minWidth='50%' height='5vh' buttonText='Boka frakt'></Button>
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