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
    deleteProduct: (product: Product) => Promise<StatusObject>
    updateProduct: (oldProduct: Product, newProduct: Product) => Promise<StatusObject>
    addOrder: (sessionId: string, stripeCustomer: string) => void
    getAllOrders: (fieldPath: string) =>  Promise<DocumentData[]>
    updateQuantityOnPurchase: (productId: string, QuantityToRemove: number) => void
    addPendingOrder: (sessionId: string, data: any) => void
    addQuantityOnExpiredOrder: (sessionId: string, productId: string, QuantityToAdd: number) => void
    verifyCheckoutSession: () => Promise<StatusObject>,
    getOrdersByUser: (userId: string) => Promise<DocumentData>
}


export const ProductContext = createContext({
    functions: {
        addProduct: (product: Product) => {},
        getProductsFromCompany: (companyId: string) => {},
        upLoadImg: (file: any) => {},
        //getSingleProduct: (docId: string) => {},
        getAllProducts: () => {},
        getProducts: (dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {},
        deleteProduct: (product: Product) => {},
        updateProduct: (oldProduct: Product, newProduct: Product) => {},
        addOrder: (sessionId: string, stripeCustomer: string) => {},
        getAllOrders: (fieldPath: string) => {},
        updateQuantityOnPurchase: (productId: string, QuantityToRemove: number) => {},
        addPendingOrder: (sessionId: string, data: any) => {},
        addQuantityOnExpiredOrder: (sessionId: string, productId: string, QuantityToAdd: number) => {},
        verifyCheckoutSession: () => {},
        getOrdersByUser: (userId: string) => {}    
 
    },
    allProducts: []
        
} as ProductOptions)