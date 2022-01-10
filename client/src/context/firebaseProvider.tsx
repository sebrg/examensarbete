import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../firebase";
import { FirebaseContext, FirebaseOptions, } from "./firebaseContext"
import { Company, Product } from "../models"
interface Props{}

export default class FirebaseProvider extends Component<Props, FirebaseOptions>   {

    state: FirebaseOptions = {
        addUser: this.addUser.bind(this),
        getUsers: this.getUsers.bind(this),
        signInWithGooglePopup: this.signInWithGooglePopup.bind(this),
        signInWithEmail: this.signInWithEmail.bind(this),
        createUserWithEmail: this.createUserWithEmail.bind(this),
        logOut: this.logOut.bind(this),
        userAuth: this.userAuth.bind(this),
        addCompany: this.addCompany.bind(this),
        addProduct: this.addProduct.bind(this),
        getCurrentUserCompany: this.getCurrentUserCompany.bind(this),
        getProductsFromCompany: this.getProductsFromCompany.bind(this),
        getAllCompanies: this.getAllCompanies.bind(this),
        getSingleProduct: this.getSingleProduct.bind(this)
    }

    //User functions
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

    
    //ADD/GET/REMOVE FROM DB
    async addCompany(company: Company) {
        //TODO: Fix better failsafe
        /* if(company.category == "" || company.name == "" || company.region == "" || company.school == "") {
            console.log("Fill all inputs")
        } */

        const auth = getAuth();

        if(auth.currentUser) {
            await addDoc(collection(firebaseCollection.db, "companies"), {
                ...company, creator: auth.currentUser.uid
            });
        }
        else {
            console.log("couldnt verify user")
        }
    }

    async addProduct(product: Product) {
        
        let currentCompany = await this.getCurrentUserCompany()
   
        await addDoc(collection(firebaseCollection.db, "products"), {
            ...product, company: currentCompany[0].id
        });
    }

    async getCurrentUserCompany() {
        const auth = getAuth();
        const q = query(collection(firebaseCollection.db, "companies"), where("creator", "==", auth.currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const result: DocumentData[] = []

        querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots  
             //console.log({id: doc.id, data: doc.data()});
             result.push({id: doc.id, data: doc.data()})
        });

        return result
    }

    async getProductsFromCompany(companyId: string) {

        const q = query(collection(firebaseCollection.db, "products"), where("company", "==", companyId));
        const querySnapshot = await getDocs(q);
        const result: DocumentData[] = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push({id: doc.id, data: doc.data()})
       });

       return result
    }

    async getProductsForCurrentCompanyPage() {
        const q = query(collection(firebaseCollection.db, "products"), where("company", "==", "url-param"));
        const querySnapshot = await getDocs(q);   
    }

    async getAllCompanies() {
        const result: DocumentData[] = []
        const get = await getDocs(collection(firebaseCollection.db, "companies"));
        get.forEach((doc) => {
            result.push({id: doc.id, data: doc.data()})
          });
          return result
    }

    async getProductsForCompanyPage() {
        const q = query(collection(firebaseCollection.db, "products"), where("company", "==", "daa"));
        const querySnapshot = await getDocs(q);
        const result: DocumentData[] = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push({id: doc.id, data: doc.data()})
       });

       return result
    }

    async getSingleProduct(docId: string) {
        const result: DocumentData[] = []
        const docRef = doc(firebaseCollection.db, "products", docId);
        const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                result.push(docSnap.data())
            } else {
                console.log("No such document!");
                }
                
            return result
    }


    render() {
        return(
            <FirebaseContext.Provider value={this.state}>
                {this.props.children}
            </FirebaseContext.Provider>
        )
    }
}