
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
                let parsedLocal: [] | any = JSON.parse(localst)
                console.log("cart:", parsedLocal)

                const productIds: string[] = data.cartItemIds

                let newCart = parsedLocal.filter((item: any) => productIds.indexOf(item.id) === -1);
               
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
        console.log(isLoading)
    }, [isLoading])

    return (
        <div>
            {    
                !isLoading?
                    <p>spinner.... stäng inte ner fliken..</p>
                    :
                    !ifOrderExist?
                    <p>Din order är redan lagd</p>
                    :
                    order?
                        order.products.map((product, i) => {
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