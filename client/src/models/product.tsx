export class Product { 
    name: string; 
    price: number;
    img: any[];

    constructor(name: string, price: number, img: any) {
        this.name = name
        this.price = price
        this.img = img
    }
}