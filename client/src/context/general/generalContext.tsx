import { DocumentData } from 'firebase/firestore'
import { createContext } from 'react'



export interface GeneralOptions {
        path: string//for stripe api
}



export const GeneralContext = createContext({
        path: "",

        
} as GeneralOptions)