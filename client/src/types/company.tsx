type Payments = {
    enabled: boolean,
    stripe_acc_id?: string
}
export type Company = { 
    name: string; 
    school: string;
    region: string;
    category: string;
    payments: Payments
    id?: string //NOTE: not sure to keep
    creator?: string
}