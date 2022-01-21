import { stripe } from "../index.js"

export const getAccount = async (req: any, res: any, next: any) => { 
    const stripeId = await req.body.stripeId

    const account = await stripe.accounts.retrieve(
        stripeId
      );
      //Kollar status på stripe konto  
      if(account.details_submitted == false) {
            res.status(201).send({status: 201, message: "Stripe saknar information, färdigställ länkningen" })
            return
      } else if(!account.charges_enabled && !account.payouts_enabled) {
            res.status(202).send({status: 202, message: "Ditt konto verifieras hos Stripe, logga in på stripe för att se så att informationen stämmer." })
            return
      } else {
            res.status(200).send({status: 200, message: "Ditt konto har verifierats, nu kan du ta betalt med stripe" })
      }
      console.log(account)
    return account
}

export const createStripeAcc = async (req: any, res: any, next: any) => {
    const account = await stripe.accounts.create({
        type: 'standard',
        country: 'SE',
      });
      
      res.status(200).json({ id: account.id })
      return account.id
}

export const createStripeLink = async (req: any, res: any, next: any) => {
    const stripeId = await req.body.stripeId

     const accountLink = await stripe.accountLinks.create({
        account: stripeId,
        refresh_url: 'http://localhost:3000',
        return_url: 'http://localhost:3000',
        type: 'account_onboarding',
    }); 
    res.status(200).json({ url: accountLink.url })
    return accountLink 
}

export const checkOut = async (req: any, res: any, next: any) => {

    const stripeId = req.body.stripeId
    console.log(req.body)

    const cartItems = req.body.products
    const companyId = req.body.companyId
    const userId = req.body.userId

    
    const cartItemIds = await cartItems.map(product => {
        //Skickas med i metadata
        let cartItems = {
            productId: product.id,
            quantity: product.quantity
        }
        return cartItems
    })

    const pendingOrderProducts = await cartItems.map(product => {
        //Produkten i ett order object
        const orderProduct = {  
            name: product.name,
            quantity: product.quantity,
            description: product.description,
            unitPrice: product.price
        }
        return orderProduct
    })
 

    const lineItems = await cartItems.map(product => {
    //Map genom cart som tas emot i body å sätt lineitems
        const lineItem = {
            description: "Description - Finns ej ännu",
            price_data: {
                currency: "sek",
                product_data: {
                    name: product.name
                },
                unit_amount: parseInt(product.price) * 100
            },
            quantity: product.quantity,     
        }
        return lineItem
    });
    console.log(lineItems)


    const session = await stripe.checkout.sessions.create({
        success_url: `http://localhost:3000/success/${stripeId}/{CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cancel/${stripeId}/{CHECKOUT_SESSION_ID}`,
        line_items: lineItems,
        mode: 'payment',
        payment_method_types: ['card'],
        payment_intent_data: {
            application_fee_amount: 2000, //NOTE: avgift vi tar per betalning, sätt den procentuell
        },
        expires_at: Math.floor(new Date().getTime()/1000.0) + 3600, //Checkout session blir expired efter 1h
        metadata: {'company_id': companyId, 'user_id': userId, 'cartItem_ids': JSON.stringify(cartItemIds)}
        }, 
        {
            stripeAccount: stripeId, 
    });
    
    let d = new Date(); 
    let NoTimeDate = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate(); 

    //Order object
    const pendingOrder = {
        companyId: session.metadata.company_id,
        customerId: session.metadata.user_id,
        stripeCustomerId:  session.customer, 
        products: pendingOrderProducts,
        totalPrice: session.amount_total / 100,
        orderDate: NoTimeDate,
        currency: session.currency,
        payment_status: session.payment_status,
        session_status: session.status,
        stripe_acc_id: stripeId
    }

    res.status(200).json({ id: session.id, pendingOrder: pendingOrder, cartItemIds: cartItemIds })
    return session
}

//Funktion som används vid success köp
export const verifySession = async (req: any, res: any, next: any) => {
    const allOrders = req.body.getOrders

    const stripeAccountId = req.body.stripeId 

    const sessionId = await req.body.sessionId
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        stripeAccount: stripeAccountId 
    });

    if(session.payment_status === "paid") {
        const foundSessionId = allOrders.find(order => order.id === sessionId)

        if(!foundSessionId) {

            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
                stripeAccount: stripeAccountId 
            });
            const orderProducts = await Promise.all(lineItems.data.map( async (item: any) => {
                const product = await stripe.products.retrieve(item.price.product, {
                    stripeAccount: stripeAccountId 
                });
                const orderProduct = {  
                      name: product.name,
                      quantity: item.quantity,
                      description: item.description,
                      unitPrice: item.price.unit_amount / 100
                  }
                  return orderProduct  
                }))

                let d = new Date(); 
                let NoTimeDate = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate(); 
                const newOrder = {
                    products: orderProducts,
                    totalPrice: session.amount_total / 100,
                    orderDate: NoTimeDate,
                }
                console.log("Order added", session.customer)
                res.status(200).json({
                    status: 200, customer: session.customer, 
                    order: newOrder, 
                    cartItemIds: JSON.parse(session.metadata.cartItem_ids), 
                    message: "Tack för din order."
                })
        }
          else {
            console.log("Finns redan")
            res.status(404).json("Ordern finns redan registrerad")
        }
    }
}
//Funktion som kollar status på session
export const checkSession = async (req: any, res: any, next: any) => {

    const pendingOrders = await req.body.pendingOrders
    
    const sessionObj: any = await Promise.all(  pendingOrders.map (element => {
        const session = stripe.checkout.sessions.retrieve(element.id, {
            stripeAccount: element.stripe_acc_id
        });
        return session
        
    }));

    sessionObj.forEach(element => {
        if(element.status === 'expired') {
            res.status(410).json({
                status: 410, sessionId: element.id, 
                cartItems: JSON.parse(element.metadata.cartItem_ids), 
                message: "Session is expired"
            })
        }
        if(element.status === 'complete' && element.payment_status === "paid") {
            res.status(200).json({
                status: 200, 
                sessionId: element.id,
                stripeCustomer: element.customer, 
                message: "Session is complete, should move to orders."
            })
        }
    });

    return sessionObj
}

export const expireSession = async (req: any, res: any, next: any) => {
    const sessionId = req.body.sessionId
    const stripeAcc = req.body.stripeAccId
    const session = await stripe.checkout.sessions.expire(sessionId, {
        stripeAccount: stripeAcc
    });

      res.status(200).json({
        status: 200, 
        message: "Session expired"
      })
      return session
}
