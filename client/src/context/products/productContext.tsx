import { DocumentData } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"


export interface ProductOptions {
    functions: ProductFunctions
   // allProducts: 
}

export interface ProductFunctions {
    addProduct: (product: Product) => void
    getProductsFromCompany: (companyId: string) => Promise<DocumentData[]>
    upLoadImg: (file: any) => void 
    getSingleProduct: (docId: string) => Promise<Product>
    getAllProducts: () => Promise<DocumentData[]>
}


export const ProductContext = createContext({
    functions: {
        addProduct: (product: Product) => {},
        getProductsFromCompany: (companyId: string) => {},
        upLoadImg: (file: any) => {},
        getSingleProduct: (docId: string) => {},
        getAllProducts: () => {}        
    }
    
        
} as ProductOptions)