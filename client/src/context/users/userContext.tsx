import { DocumentData } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"


export interface UserOptions {
    addUser: () => void
    getUsers: (setState: any) => void
    signInWithGooglePopup: (callBack?: () => void) => void
    signInWithEmail: (email: string | undefined, password: string | undefined, callBack?: () => void) => void
    createUserWithEmail: (email: string | undefined, password: string | undefined) => void
    logOut: () => void
    userAuth: (state?: (bool: boolean) => void) => void
    checkAdmin: () => Promise<Boolean> 
}


export const UserContext = createContext({
    addUser: () => {},
    getUsers: (setState: any) => {},
    signInWithGooglePopup: (callBack?: () => void) => {},
    signInWithEmail: (email: string | undefined, password: string | undefined, callBack?: () => void) => {},
    createUserWithEmail: (email: string | undefined, password: string | undefined) => {},
    logOut: () => {},
    userAuth: (state?: (bool: boolean) => void) => {},
    checkAdmin: () => {}

        
} as UserOptions)