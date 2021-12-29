import { createContext } from 'react'

export interface FirebaseOptions {
    addUser: () => void
    getUsers: (setState: any) => void

   // users?: User[]
}

/* export interface User {
    firstName: string,
    lastName: string,
    userName: string,
	id: string
} */

export const FirebaseContext = createContext({
    addUser: () => {},
    getUsers: (setState: any) => {},
    /* users: undefined */
        
} as FirebaseOptions)