import { stripe } from "../index.js"

export const getCustomers = async () => { //Testfunktion, returnerar stripe customers.. 
    const allCustomers = await stripe.customers.list({
        limit: 3
    })
    console.log(allCustomers)
}

export const checkOut = async (req: any, res: any, next: any) => {
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
      line_items:[{
        
                        description: 'This is a imaginary product',
                            price_data: {
                                currency: "sek",
                                product_data: {
                                    name: 'Imaginary product name'
                                },
                                unit_amount: 1000
                            },
                            quantity: 5,     
                }],
                    mode: 'payment',
                    payment_method_types: ["card"],
    });
    res.status(200).json({ id: session.id })
    return session
}
