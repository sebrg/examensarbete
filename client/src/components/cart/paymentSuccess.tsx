
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { ProductContext, ProductOptions } from '../../context/products/productContext';

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

    let match = useMatch({
        path: "/success/:stripeId/:sessionId"
    });

    const sessionId = match?.params.sessionId
    const stripeId = match?.params.stripeId

    async function verifySession() {
       const getOrders = await productContext.functions.getAllOrders()

        const response = await fetch("http://localhost:3001/verifySession", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId, stripeId, getOrders})
        })
        const data = await response.json()
        console.log(data)
        if(response.status === 404) {
            setIfOrderExist(false)
            console.log(response)
            console.log("in if, ordern finns redan")
           
        }
        else if(response.status === 200 && sessionId){
            setIfOrderExist(true)
            console.log(response)
            productContext.functions.addOrder(sessionId, data.order)
            setOrder(data.order)

        }
    }

    
    useEffect(() => {
        verifySession()
    }, [])

    useEffect(() => {
        console.log(order)
    }, [order])

    return (
        <div>
           {

                !ifOrderExist?
                <p>Din order är redan lagd</p>
                :
                order?
                    order.products.map((product, i) => {
                        console.log(product)
                        return (
                            <div key={i}>
                                <p> {product.name + '' + 'x' + product.quantity} </p>
                                <p> {product.unitPrice} </p>
                            </div>
                        )
                    })
                    :

                    null
                       
           }
        </div>    
    )
}