
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { GeneralContext, GeneralOptions } from '../../context/general/generalContext';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import { Order } from '../../types';
import SpinnerModal from '../functions/spinnerModal';



export default function PaymentSuccess() { //NOTE: Customers may not always reach the success_url after a successful payment. It is possible they close their browser tab before the redirect occurs.

    const productContext: ProductOptions = useContext(ProductContext)
    const general: GeneralOptions = useContext(GeneralContext)
    
    const [ifOrderExist, setIfOrderExist] = useState(false)
    const [order, setOrder] = useState<Order>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    let match = useMatch({
        path: "/success/:stripeId/:sessionId"
    });

    const sessionId = match?.params.sessionId
    const stripeId = match?.params.stripeId

    async function verifySession() {
       const getOrders = await productContext.functions.getAllOrders("orders")

        const response = await fetch(`${general.path}/verifySession`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId, stripeId, getOrders})
        })
        const data = await response.json()
        if(response.status === 404) {
            setIsLoading(true)
            setIfOrderExist(false)
           
        } else if(response.status === 200 && sessionId){
            // flyttar order från pending till orders i db & rensar cart   
            setIfOrderExist(true)
            
            productContext.functions.addOrder(sessionId, data.customer) //NOTE: Hämta sessionId från pendingOrders och uppdatera
            
            setOrder(data.order)

            let localst = localStorage.getItem('cart')
            if(localst) {
                let parsedLocal: any[] = JSON.parse(localst)

                const productIds: any[] = data.cartItemIds

                const idArr = productIds.map(data => {
                    return data.productId
                })
                 
                const newCart = parsedLocal.filter((item: any) => idArr.indexOf(item.id) === -1);
                       
                localStorage.setItem('cart', JSON.stringify(newCart))
                
            }
            setIsLoading(true)
            general.functions.countCart("state")

        }
    }

    
    useEffect(() => {
        verifySession()
    }, [])

    useEffect(() => {
        
    }, [order])

    useEffect(() => {
    }, [isLoading])

    return (
        <div className='wrapper noScrollBar' style={successDiv}>
            {    
                !isLoading?
                    <SpinnerModal fullScreen={true}/>
                    :
                    !ifOrderExist?
                    <h1 style={{padding: '2em', fontSize: '1.5em', marginTop: '2em', color: 'white'}}>Du försöker komma åt en sida som inte finns, har du nyligen lagt en order? Gå in på 'Gamla ordrar' under fliken Mina sidor.</h1>
                    :
                    <div className='sucessWrapp noScrollBar' style={orderCard}>
                        <h2  style={{marginTop: '1em', color: 'white'}}>Tack för din order!</h2>    
                            <h1 style={{marginBottom: '1em'}}> {order?.orderDate} </h1>
                            {order?             
                                order.products.map((product, i) => {
                                        return (
                                            <div key={i} style={{display: "flex", flexDirection: "row", backgroundColor: "lightgray", borderRadius: "10px", padding: "0.5em", margin: "0 1em 1em 1em", flexWrap: "wrap", alignItems: 'center'}}>
                                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> {product.name}</p>
                                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Kvantitet: {product.quantity} </p>
                                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Pris: {product.unitPrice}kr/st </p>                                          
                                            </div>
                                        )
                                    })
                                    :
            
                                    null

                            }
                        <h1 style={{marginBottom: '1em', fontSize: '1.5em'}}> Totalpris: {order?.totalPrice} kr </h1>
                   </div>     
            }
        </div>    
    )
}

const successDiv: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'auto'
}

const orderCard: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(49, 52, 68)',
    overflow: "auto"
}