import { createContext } from 'react'

export interface FirebaseOptions {
    addUser: () => void
    getUsers: (setState: any) => void
    signInWithGooglePopup: () => void
    signInWithEmail: (email: string | undefined, password: string | undefined) => void
    createUserWithEmail: (email: string | undefined, password: string | undefined) => void
    logOut: () => void
    userAuth: (state?: (bool: boolean) => void) => void

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
    signInWithGooglePopup: () => {},
    signInWithEmail: (email: string | undefined, password: string | undefined) => {},
    createUserWithEmail: (email: string | undefined, password: string | undefined) => {},
    logOut: () => {},
    userAuth: (state?: (bool: boolean) => void) => {}
    /* users: undefined */
        
} as FirebaseOptions)