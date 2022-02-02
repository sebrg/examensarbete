export type Product = { 
    name: string; 
    price: number;
    images: any[]; //FIXME: this is very very bad
    category: string
    quantity?: number
    company?: string
    id?: string
    info?: string
}    