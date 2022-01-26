interface ProductInOrder {
    name: string,
    quantity: number,
    unitPrice: string
}

export interface Order {
    companyId: string,
    currency: string,
    customerId: string,
    id: string,
    orderDate: Date,
    payment_status: string,
    products: ProductInOrder[],
    purchaseTerms: boolean,
    session_status: string,
    stripeCustomerId: string,
    stripe_acc_id: string,
    totalPrice: number
}