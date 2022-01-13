import { DocumentData } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../models"


export interface FirebaseOptions {
    addUser: () => void
    getUsers: (setState: any) => void
    signInWithGooglePopup: (callBack?: () => void) => void
    signInWithEmail: (email: string | undefined, password: string | undefined, callBack?: () => void) => void
    createUserWithEmail: (email: string | undefined, password: string | undefined) => void
    logOut: () => void
    userAuth: (state?: (bool: boolean) => void) => void

    addCompany: (company: Company) => void
    addProduct: (product: Product) => void
    getCurrentUserCompany: () => Promise<DocumentData[]>
    getProductsFromCompany: (companyId: string) => Promise<DocumentData[]>
    getAllCompanies: () => Promise<DocumentData[]>
    upLoadImg: (file: any) => void 
    getSingleProduct: (docId: string) => Promise<DocumentData[]>
    getAllProducts: () => Promise<DocumentData[]>

   // users?: User[]
}


export const FirebaseContext = createContext({
    addUser: () => {},
    getUsers: (setState: any) => {},
    signInWithGooglePopup: (callBack?: () => void) => {},
    signInWithEmail: (email: string | undefined, password: string | undefined, callBack?: () => void) => {},
    createUserWithEmail: (email: string | undefined, password: string | undefined) => {},
    logOut: () => {},
    userAuth: (state?: (bool: boolean) => void) => {},
    addCompany: (company: Company) => {},
    addProduct: (product: Product) => {},
    getCurrentUserCompany: () => {},
    getProductsFromCompany: (companyId: string) => {},
    getAllCompanies: () => {},
    upLoadImg: (file: any) => {},
    getSingleProduct: (docId: string) => {},
    getAllProducts: () => {}

    /* users: undefined */
        
} as FirebaseOptions)