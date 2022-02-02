import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, documentId, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { UserContext, UserOptions, } from "./userContext"
import { Company, Product } from "../../models"
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
import { StatusObject, UserInfo } from "../../types";
interface Props{}
export default class UserProvider extends Component<Props, UserOptions>   {

    state: UserOptions = {
        /* addUser: this.addUser.bind(this), */
        getUsers: this.getUsers.bind(this),
        signInWithGooglePopup: this.signInWithGooglePopup.bind(this),
        signInWithEmail: this.signInWithEmail.bind(this),
        createUserWithEmail: this.createUserWithEmail.bind(this),
        logOut: this.logOut.bind(this),
        userAuth: this.userAuth.bind(this),
        checkAdmin: this.checkAdmin.bind(this),
        addOrUpdateUserInfo: this.addOrUpdateUserInfo.bind(this),
        getUserInfo: this.getUserInfo.bind(this),
    }

/*     addUser() {

    } */

    async getUsers(setState: any) {    
        const userCollectionRef = collection(firebaseCollection.db, "users")
        const data = await getDocs(userCollectionRef);
        const userList = data.docs.map(doc => ({...doc.data(), id: doc.id}) /* as User */);
        setState(userList)
    }


    //Login, Logout & Signup functions
    signInWithGooglePopup(callBack?: () => void) { //TODO: Add redirect login for mobile size
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential? credential.accessToken : null
            // The signed-in user info.
            const user = result.user;
            //console.log(user)
            //console.log("token= ", token)
            if(callBack) {
                callBack()
            }
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    signInWithEmail(email: string | undefined, password: string | undefined, callBack?: () => void ) {
        if(password == undefined || email == undefined) {
            return
        }

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //console.log(user)
            if(callBack) {
                callBack()
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    createUserWithEmail(email: string | undefined, password: string | undefined) {
        if(password == undefined || email == undefined) {
            return
        }

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });

    }
    logOut() {
        const auth = getAuth();
        
        console.log(auth.currentUser)

        signOut(auth).then(() => {
            console.log("signed out")
            console.log(auth.currentUser)
        }).catch((error) => {
            console.log(error)
        });
    }

    userAuth(state?: (bool: boolean) => void) {
        
        const auth = getAuth();
    
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //const uid = user.uid;
                //console.log("signed in= ", user)
                if(state) {
                    state(true)
                }
                // ...
            } else {
                // User is signed out
                // ...
                //console.log("user signdout")
                if(state) {
                    state(false)
                }
            }
        });
    }

    
    async checkAdmin() {
        const auth = getAuth();
        const userCollectionRef = collection(firebaseCollection.db, "admin")
        const data = await getDocs(userCollectionRef);
        const adminList = data.docs.map(doc => (doc.id));
        const foundAdmin = adminList.find((admin) => admin === auth.currentUser?.uid)
        
        if(foundAdmin && foundAdmin !== undefined) {
            return true
        } else {
            return false
        }
    }


    async addOrUpdateUserInfo(newUserInfo: UserInfo, id: string) { //NOTE: maybe split this into two functions
        try {
/*             const auth = getAuth();
            if(!auth.currentUser) {
                return {status: 400, message: "Du saknar behörighet" } as StatusObject
            } */

            const userInfo = await this.getUserInfo(id)
            console.log("length userInfo: ", userInfo.length)
            const checkString = (str: string) => {
                return str === null || str === undefined || str.match(/^ *$/) !== null;
            }

            const checkNr = (nr: number) => {
                return nr === null || nr === undefined || !nr.toString().length;
            }
            //Update userInfo
            if(userInfo.length) {

                const clonedUserInfo = {...userInfo[0]}

                console.log("clonedUser b4", clonedUserInfo)
                if(newUserInfo.firstName !== undefined) {
                    clonedUserInfo.firstName = newUserInfo.firstName
                }

                if(newUserInfo.surName !== undefined) {
                    clonedUserInfo.surName = newUserInfo.surName
                }

                if(newUserInfo.city !== undefined) {
                    clonedUserInfo.city = newUserInfo.city
                }

                if(newUserInfo.municipality !== undefined) {
                    clonedUserInfo.municipality = newUserInfo.municipality
                }

                if(newUserInfo.zipCode !== undefined) {
                    clonedUserInfo.zipCode = newUserInfo.zipCode
                }

                if(newUserInfo.adress !== undefined) {
                    clonedUserInfo.adress = newUserInfo.adress
                }

                if(newUserInfo.phoneNr !== null || undefined) {
                    clonedUserInfo.phoneNr = newUserInfo.phoneNr
                }

                if(newUserInfo.co !== null || undefined) {
                    clonedUserInfo.co = newUserInfo.co
                }

                if(newUserInfo.pendingCompany !== null && newUserInfo.pendingCompany !== undefined) {
                    console.log("in if: ", newUserInfo.pendingCompany)
                    clonedUserInfo.pendingCompany = newUserInfo.pendingCompany
                } 
                else {
                    if(!clonedUserInfo.pendingCompany) {
                        clonedUserInfo.pendingCompany = false
                    } 
                }
                //Problem is here in the ifs
                if(newUserInfo.company !== null  && newUserInfo.company !== undefined) {
                    clonedUserInfo.company = newUserInfo.company
                } else if (clonedUserInfo.company === undefined/* newUserInfo.company === undefined */) {
                    clonedUserInfo.company = null
                }

                console.log(clonedUserInfo)
                //Update userInfo
                await setDoc(doc(firebaseCollection.db, "userInfo", id), {
                    firstName: clonedUserInfo.firstName,
                    surName: clonedUserInfo.surName,
                    city: clonedUserInfo.city,
                    municipality: clonedUserInfo.municipality,
                    zipCode: clonedUserInfo.zipCode,
                    adress: clonedUserInfo.adress,
                    phoneNr: clonedUserInfo.phoneNr as number | null,
                    co: clonedUserInfo.co,
                    pendingCompany: clonedUserInfo.pendingCompany,
                    company: clonedUserInfo.company,                      
                    
                });

                return {status: 200, message: `UserInfo has been updated` } as StatusObject    
            } 

            //Add userInfo
            else {

                const clonedUserInfo = {...newUserInfo}
                if(checkString(clonedUserInfo.firstName) || checkString(clonedUserInfo.surName) || checkString(clonedUserInfo.city) || checkString(clonedUserInfo.municipality) || checkNr(clonedUserInfo.zipCode) || checkString(clonedUserInfo.adress)) {
                    return {status: 400, message: "Du måste fylla i alla uppgifter som krävs" } as StatusObject
                } 
                
                if(clonedUserInfo.phoneNr === undefined) {
                    clonedUserInfo.phoneNr = null
                } 
    
                if(clonedUserInfo.co === undefined) {
                    clonedUserInfo.co = null
                } 

                //Add userInfo
                await setDoc(doc(firebaseCollection.db, "userInfo", id), {
                    firstName: clonedUserInfo.firstName,
                    surName: clonedUserInfo.surName,
                    city: clonedUserInfo.city,
                    municipality: clonedUserInfo.municipality,
                    zipCode: clonedUserInfo.zipCode,
                    adress: clonedUserInfo.adress,
                    phoneNr: clonedUserInfo.phoneNr,
                    co: clonedUserInfo.co,
                    pendingCompany: false
                });

                return {status: 200, message: `UserInfo has been added` } as StatusObject
            }

        } catch(err) {

            return {status: 400, message: err } as StatusObject
        }
        

    }

    async getUserInfo(id: string) {
        const q = query(collection(firebaseCollection.db, "userInfo"), where(documentId(), "==", id));
        const querySnapshot = await getDocs(q);
        const result: UserInfo[] = []

        querySnapshot.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()} as UserInfo)
       });

       return result
    }



    render() {
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
