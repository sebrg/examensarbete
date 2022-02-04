import { createContext } from 'react'



export interface GeneralOptions {
        path: string//for stripe api
        amountInCart: number | null | undefined
        functions: Functions
}

interface Functions {
        countCart: (setStateOrReturn: "state" | "return") => number | null | void
}


export const GeneralContext = createContext({
        path: "",
        amountInCart: null,
        functions: {
                countCart: (setStateOrReturn) => {}
        }


        
} as GeneralOptions)