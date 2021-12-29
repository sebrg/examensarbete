import { collection, getDocs } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../firebase";
//import { findRenderedDOMComponentWithTag } from "react-dom/test-utils"
import { FirebaseContext, FirebaseOptions, } from "./firebaseContext"


interface Props{}

export default class FirebaseProvider extends Component<Props, FirebaseOptions>   {

    state: FirebaseOptions = {
        addUser: this.addUser.bind(this),
        getUsers: this.getUsers.bind(this)
    }

    addUser() {

    }

    async getUsers(setState: any) {    
        const userCollectionRef = collection(firebaseCollection.db, "users")
        const data = await getDocs(userCollectionRef);
        const userList = data.docs.map(doc => ({...doc.data(), id: doc.id}) /* as User */);
        setState(userList)
    }
    render() {
        return(
            <FirebaseContext.Provider value={this.state}>
                {this.props.children}
            </FirebaseContext.Provider>
        )
    }
}