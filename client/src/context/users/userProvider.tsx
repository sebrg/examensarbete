import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { UserContext, UserOptions, } from "./userContext"
import { Company, Product } from "../../models"
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
interface Props{}
export default class UserProvider extends Component<Props, UserOptions>   {

    state: UserOptions = {
        addUser: this.addUser.bind(this),
        getUsers: this.getUsers.bind(this),
        signInWithGooglePopup: this.signInWithGooglePopup.bind(this),
        signInWithEmail: this.signInWithEmail.bind(this),
        createUserWithEmail: this.createUserWithEmail.bind(this),
        logOut: this.logOut.bind(this),
        userAuth: this.userAuth.bind(this),
        checkAdmin: this.checkAdmin.bind(this)
    }

    addUser() {

    }

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
        const adminList = data.docs.map(doc => ({...doc.data()} as DocumentData));
        const foundAdmin = adminList.find((admin) => admin.id === auth.currentUser?.uid)
        
        if(foundAdmin && foundAdmin !== undefined) {
            return true
        } else {
            return false
        }
    }





    render() {
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
