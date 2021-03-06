import { createContext } from 'react'
import { StatusObject, UserInfo } from '../../types'


export interface UserOptions {
 /*    addUser: () => void */
    getUsers: (setState: any) => void
    signInWithGooglePopup: (callBack?: () => void) => void
    signInWithEmail: (email: string | undefined, password: string | undefined, callBack?: () => void) => void
    createUserWithEmail: (email: string | undefined, password: string | undefined, callback: () => void) => void
    logOut: () => void
    userAuth: (state?: (bool: boolean) => void) => void
    checkAdmin: () => Promise<Boolean> 
    addOrUpdateUserInfo: (newUserInfo: UserInfo, id: string) => Promise<StatusObject>
    getUserInfo: (id: string) => Promise<UserInfo[]>
}


export const UserContext = createContext({
  /*   addUser: () => {}, */
    getUsers: (setState: any) => {},
    signInWithGooglePopup: (callBack?: () => void) => {},
    signInWithEmail: (email: string | undefined, password: string | undefined, callBack?: () => void) => {},
    createUserWithEmail: (email: string | undefined, password: string | undefined,  callback: () => void) => {},
    logOut: () => {},
    userAuth: (state?: (bool: boolean) => void) => {},
    checkAdmin: () => {},
    addOrUpdateUserInfo: (newUserInfo: UserInfo, id: string) => {},
    getUserInfo: (id: string) => {},
        
} as UserOptions)