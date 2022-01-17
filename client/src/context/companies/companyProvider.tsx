import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, FieldPath, getDoc, getDocs, query, updateDoc, where, WhereFilterOp } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { CompanyContext, CompanyOptions, } from "../companies/companyContext"
import { Company, Product } from "../../models"
import { getDownloadURL, getStorage, ref, uploadBytesResumable,  } from "firebase/storage";
import { promises } from "stream";
interface Props{}
export default class CompanyProvider extends Component<Props, CompanyOptions>   {

    state: CompanyOptions = {
        addCompany: this.addCompany.bind(this),
        getCurrentUserCompany: this.getCurrentUserCompany.bind(this),
        getAllCompanies: this.getAllCompanies.bind(this),
        getCompany: this.getCompany.bind(this),
        updateCompany: this.updateCompany.bind(this),
        setPaymentEnabled: this.setPaymentEnabled.bind(this)
    }




    
    async addCompany(company: Company) {
        //TODO: Fix better failsafe
        /* if(company.category == "" || company.name == "" || company.region == "" || company.school == "") {
            console.log("Fill all inputs")
        } */

        const auth = getAuth();

        let companyData = {
            name: company.name,
            school: company.school,
            region: company.region, 
            category: company.category,
            payments: {
                enabled: company.payments.enabled,
            }
        }

        if(auth.currentUser) {
            await addDoc(collection(firebaseCollection.db, "companies"), {
                ...companyData, creator: auth.currentUser.uid
            });
        }
        else {
            console.log("couldnt verify user")
        }
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

    async getAllCompanies() {
        const result: DocumentData[] = []
        const get = await getDocs(collection(firebaseCollection.db, "companies"));
        get.forEach((doc) => {
            result.push({id: doc.id, data: doc.data()})
          });
          return result
    }

    async getCompany(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) {
        //FIXME: remove param dbCollection and replace with "products"
        const q = query(collection(firebaseCollection.db, "companies"), where(fieldPath, opStr, value));
        const querySnapshot = await getDocs(q);
        const result: Company[] = []
        
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push(doc.data() as Company)
       });

       return result
    }

    async updateCompany(stripeId: string) { // NOTE: Kanske göra mer flexibel funktion?
        let getCompany = await this.getCurrentUserCompany()
        let currentCompanyClone = getCompany[0].data as Company

        const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id);
        currentCompanyClone.payments.stripe_acc_id = stripeId
        await updateDoc(companyRef, {
        ...currentCompanyClone as Company
        });     
        console.log("Added stripe id:", stripeId, "to current company")   
    }

    async setPaymentEnabled(enabled: boolean) { // NOTE: Kanske göra mer flexibel funktion?
        let getCompany = await this.getCurrentUserCompany()
        let currentCompanyClone = getCompany[0].data as Company

        const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id);
        currentCompanyClone.payments.enabled = enabled
        await updateDoc(companyRef, {
        ...currentCompanyClone as Company
        });     
        console.log("Enabled is set to:", enabled)   
    }

    
    render() {
        return(
            <CompanyContext.Provider value={this.state}>
                {this.props.children}
            </CompanyContext.Provider>
        )
    }
}

