
type Payments = {
    enabled: boolean,
    stripe_acc_id?: string
}
export class Company { 
    name: string; 
    school: string;
    region: string;
    category: string;
    payments: Payments
    id?: string //NOTE: not sure to keep
    creator?: string
   constructor(name: string, school: string, region: string, category: string, payments: Payments, id?: string, creator?: string) {
        this.name = name
        this.school = school
        this.region = region
        this.category = category
        this.id = id
        this.payments = payments
        this.creator = creator
    }
}