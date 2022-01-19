export class Product { 
    name: string; 
    price: number;
    images: any[];
    quantity?: number
    company?: string

    id?: string

    info?: string

    constructor(name: string, price: number, imgs: any, company?: string, id?: string, quantity?: number, info?: string) {
        this.name = name
        this.price = price
        this.images = imgs
        this.company = company
        this.id = id
        this.quantity = quantity
        this.info = info
    }
}