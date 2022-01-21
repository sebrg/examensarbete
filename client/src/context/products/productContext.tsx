import { DocumentData, FieldPath, WhereFilterOp } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"
import { StatusObject } from '../../types'


export interface ProductOptions {
    functions: ProductFunctions
    allProducts: Product[] | [] //FIXME: type?
}

export interface ProductFunctions {
    addProduct: (product: Product) => Promise<StatusObject>
    getProductsFromCompany: (companyId: string) => Promise<Product[]>
    upLoadImg: (file: any) => void 
    //getSingleProduct: (docId: string) => Promise<Product | undefined> //FIXME: should not be allowed to be undefined
    getAllProducts: () => void//Promise<DocumentData[]>
    getProducts: (dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => Promise<Product[]>
    addOrder: (sessionId: string, data: any) => void
    getAllOrders: () =>  Promise<DocumentData[]>
    deleteProduct: (product: Product) => void
    updateProduct: (oldProduct: Product, newProduct: Product) => void
}


export const ProductContext = createContext({
    functions: {
        addProduct: (product: Product) => {},
        getProductsFromCompany: (companyId: string) => {},
        upLoadImg: (file: any) => {},
        //getSingleProduct: (docId: string) => {},
        getAllProducts: () => {},
        getProducts: (dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {},
        addOrder: (sessionId: string, data: any) => {},
        getAllOrders: () => {},
        deleteProduct: (product: Product) => {},
        updateProduct: (oldProduct: Product, newProduct: Product) => {},
    },
    allProducts: []
        
} as ProductOptions)