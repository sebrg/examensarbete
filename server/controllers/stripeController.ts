import { stripe } from "../index.js"

export const getAccount = async (req: any, res: any, next: any) => { 
    const stripeId = await req.body.stripeId

    const account = await stripe.accounts.retrieve(
        stripeId
      );

      if(account.details_submitted == false) {
            res.status(201).send({status: 201, message: "Stripe saknar information, färdigställ länkningen" })
            return
      } else if(!account.charges_enabled && !account.payouts_enabled) {
            res.status(202).send({status: 202, message: "Ditt konto verifieras hos Stripe, logga in på stripe för att se så att informationen stämmer." })
            return
      } else {
            res.status(200).send({status: 200, message: "Ditt konto har verifierats, nu kan du ta betalt med stripe" })
      }

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

    const cartItems = req.body.products

    const lineItems = await cartItems.map(product => {
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
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
        line_items: lineItems,
        mode: 'payment',
        payment_method_types: ['card'],
        payment_intent_data: {
            application_fee_amount: 10000, //NOTE: avgift vi tar per betalning, sätt den procentuell
        },
        }, 
        {
            stripeAccount: 'acct_1KIDcY2X2rY6BoyU',
    });

    res.status(200).json({ id: session.id })
    return session
}
