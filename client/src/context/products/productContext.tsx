import { DocumentData, FieldPath, WhereFilterOp } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"


export interface ProductOptions {
    functions: ProductFunctions
    allProducts: Product[] | [] //FIXME: type?
}

export interface ProductFunctions {
    addProduct: (product: Product) => void
    getProductsFromCompany: (companyId: string) => Promise<DocumentData[]>
    upLoadImg: (file: any) => void 
    //getSingleProduct: (docId: string) => Promise<Product | undefined> //FIXME: should not be allowed to be undefined
    getAllProducts: () => void//Promise<DocumentData[]>
    getProducts: (dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => Promise<Product[]>
}


export const ProductContext = createContext({
    functions: {
        addProduct: (product: Product) => {},
        getProductsFromCompany: (companyId: string) => {},
        upLoadImg: (file: any) => {},
        //getSingleProduct: (docId: string) => {},
        getAllProducts: () => {},
        getProducts: (dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {}        
    },
    allProducts: []
        
} as ProductOptions)