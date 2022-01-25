
import { wrap } from 'node:module';
import { parse } from 'node:path/win32';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import FoldableOrderCard from '../dashboard/foldableOrderCard';
import SpinnerModal from '../functions/spinnerModal';

interface orderInterface {
    totalPrice: number
    customerId: string,
    stripeCustomerId: string, 
    products: productInterface[]
    orderDate: string,
    currency: string,
    companyId: string
}

interface productInterface {
    description: string
    name: string
    quantity: number
    unitPrice: number
}


export default function PaymentSuccess() { //NOTE: Customers may not always reach the success_url after a successful payment. It is possible they close their browser tab before the redirect occurs.

    const productContext: ProductOptions = useContext(ProductContext)
    
    const [ifOrderExist, setIfOrderExist] = useState(false)
    const [order, setOrder] = useState<orderInterface>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    let match = useMatch({
        path: "/success/:stripeId/:sessionId"
    });

    const sessionId = match?.params.sessionId
    const stripeId = match?.params.stripeId

    async function verifySession() {
       const getOrders = await productContext.functions.getAllOrders("orders")

        const response = await fetch("http://localhost:3001/verifySession", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId, stripeId, getOrders})
        })
        const data = await response.json()
        console.log(data)
        if(response.status === 404) {
            setIsLoading(true)
            setIfOrderExist(false)
            console.log(response)
           
        } else if(response.status === 200 && sessionId){
            // flyttar order från pending till orders i db & rensar cart   
            setIfOrderExist(true)
            console.log(response)
            
            productContext.functions.addOrder(sessionId, data.customer) //NOTE: Hämta sessionId från pendingOrders och uppdatera
            
            setOrder(data.order)

            let localst = localStorage.getItem('cart')
            if(localst) {
                let parsedLocal: any[] = JSON.parse(localst)
                console.log("cart:", parsedLocal)

                const productIds: any[] = data.cartItemIds
                console.log(productIds, "ghererere")

                const idArr = productIds.map(data => {
                    return data.productId
                })
                 
                const newCart = parsedLocal.filter((item: any) => idArr.indexOf(item.id) === -1);
                       
                console.log("newCart:", newCart);
                localStorage.setItem('cart', JSON.stringify(newCart))
                
            }
            setIsLoading(true)
        }
    }

    
    useEffect(() => {
        verifySession()
    }, [])

    useEffect(() => {
        console.log(order)
    }, [order])

    useEffect(() => {
    }, [isLoading])

    return (
        <div className='noScrollBar' style={successDiv}>
            {    
                !isLoading?
                    <SpinnerModal fullScreen={true}/>
                    :
                    !ifOrderExist?
                    <h1 style={{padding: '2em', fontSize: '1.5em', marginTop: '2em', color: 'white'}}>Du försöker komma åt en sida som inte finns, har du nyligen lagt en order? Gå in på 'Gamla ordrar' under fliken Mina sidor.</h1>
                    :
                    <div style={orderCard}>
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
    backgroundColor: '#45B8AC'
}