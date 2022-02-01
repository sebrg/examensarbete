type Payments = {
    enabled: boolean,
    stripe_acc_id?: string
}
type Shipping = {
    shippingPrice: number,
    freeShippingOver: number,
}
export type Company = { 
    name: string; 
    school: string;
    region: string;
    category: string;
    payments: Payments
    shipping: Shipping
    id?: string //NOTE: not sure to keep
    creator?: string

}