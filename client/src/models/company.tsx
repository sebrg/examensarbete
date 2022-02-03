
type Payments = {
    enabled: boolean,
    stripe_acc_id?: string
}

type Shipping = {
    shippingPrice: number,
    freeShippingOver: number,
}
export class Company { 
    name: string; 
    school: string;
    region: string;
    category: string;
    payments: Payments;
    shipping: Shipping
    email: string
    id?: string //NOTE: not sure to keep
    creator?: string
   constructor(name: string, school: string, region: string, category: string, payments: Payments, shipping: Shipping, email: string, id?: string, creator?: string) {
        this.name = name
        this.school = school
        this.region = region
        this.category = category
        this.id = id
        this.payments = payments
        this.shipping = shipping
        this.creator = creator
        this.email = email
    }
}