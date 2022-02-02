export class Product { 
    name: string; 
    price: number;
    images: any[]; //FIXME: this is very very bad
    companyName: string
    company: string
    quantity?: number
    category?: string
    id?: string
    info?: string

    constructor(name: string, price: number, imgs: any, companyName: string, company: string, id?: string, quantity?: number, info?: string, category?: string) {
        this.name = name
        this.price = price
        this.images = imgs
        this.company = company
        this.companyName = companyName
        this.id = id
        this.quantity = quantity
        this.info = info
        this.category = category
    }
}