export class Product { 
    name: string; 
    price: number;
    images: any[];

    company?: string

    id?: string

    quantity?: number

    constructor(name: string, price: number, imgs: any, company?: string, id?: string, quantity?: number) {
        this.name = name
        this.price = price
        this.images = imgs
        this.company = company
        this.id = id
        this.quantity = quantity
    }
}