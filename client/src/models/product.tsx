export class Product { 
    name: string; 
    price: number;
    images: any[];

    constructor(name: string, price: number, imgs: any) {
        this.name = name
        this.price = price
        this.images = imgs
    }
}