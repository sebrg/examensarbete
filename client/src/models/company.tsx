
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
        
   constructor(name: string, school: string, region: string, category: string, payments: Payments) {
        this.name = name
        this.school = school
        this.region = region
        this.category = category
        this.payments = payments
    }
}