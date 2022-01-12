export class Product { 
    name: string; 
    price: number;
    images: any[];

    company?: string

    id?: string

    constructor(name: string, price: number, imgs: any, company?: string, id?: string) {
        this.name = name
        this.price = price
        this.images = imgs
        this.company = company
        this.id = id
    }
}