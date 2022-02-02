export class Product { 
    name: string; 
    price: number;
    images: any[]; //FIXME: this is very very bad
    quantity?: number
    category?: string
    company?: string
    id?: string
    info?: string

    constructor(name: string, price: number, imgs: any, company?: string, id?: string, quantity?: number, info?: string, category?: string) {
        this.name = name
        this.price = price
        this.images = imgs
        this.company = company
        this.id = id
        this.quantity = quantity
        this.info = info
        this.category = category
    }
}