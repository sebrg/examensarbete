import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, DocumentData, documentId, FieldPath, getDoc, getDocs, query, updateDoc, where, WhereFilterOp } from "firebase/firestore";

import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { CompanyContext, CompanyOptions, } from "../companies/companyContext"
import { Company, Product } from "../../models"
import { getDownloadURL, getStorage, ref, uploadBytesResumable,  } from "firebase/storage";
//import { promises } from "stream";
import { FbQuery } from "../../types"
interface Props{}
export default class CompanyProvider extends Component<Props, CompanyOptions>   {

    state: CompanyOptions = {
        addCompany: this.addCompany.bind(this),
        getCurrentUserCompany: this.getCurrentUserCompany.bind(this),
        getAllCompanies: this.getAllCompanies.bind(this),
        getCompany: this.getCompany.bind(this),
        aproveCompany: this.aproveCompany.bind(this),
        removeCompany: this.removeCompany.bind(this),
        updateCompany: this.updateCompany.bind(this),
        setPaymentEnabled: this.setPaymentEnabled.bind(this)
    }

    async addCompany(company: Company, to: "companies" | "pendingCompanies") {
        //TODO: Fix better failsafe

        const auth = getAuth();

        let companyData: Omit<Company, "id"> = {
            name: company.name,
            school: company.school,
            region: company.region, 
            category: company.category,
            payments: {
                enabled: company.payments.enabled,
            }
        }

        if(auth.currentUser) {
            await addDoc(collection(firebaseCollection.db, to), {

                ...companyData, creator: auth.currentUser.uid
            });
        }
        else {
            console.log("couldnt verify user")
        }
    }


    async getCurrentUserCompany() {
        const auth = getAuth();
        
        const q = query(collection(firebaseCollection.db, "companies"), where("creator", "==", auth?.currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const result: Company[] = []

        querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots  
             //console.log({id: doc.id, data: doc.data()});
             result.push({id: doc.id, ...doc.data()} as Company)
        });

        return result as Company[]
    }

    async getAllCompanies(company: "companies" | "pendingCompanies") {
        const result: Company[] = [] 
        const get = await getDocs(collection(firebaseCollection.db, company));
        get.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()} as Company) 
          });
          return result
    }

    async getCompany(from: "companies" | "pendingCompanies", queryOne: FbQuery, queryTwo?: FbQuery) {
        
        let q

        if(queryTwo) {
            q = query(collection(firebaseCollection.db, from), 
                where(queryOne.fieldPath, queryOne.opStr, queryOne.value), 
                where(queryTwo.fieldPath, queryTwo.opStr, queryTwo.value));
        } else {
            q = query(collection(firebaseCollection.db, from), where(queryOne.fieldPath, queryOne.opStr, queryOne.value));

        }
        
        const querySnapshot = await getDocs(q);
        const result: Company[] = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push(doc.data() as Company)
       });

       return result
    }

    async aproveCompany(id: string) {
        const currentPendingCompany: Company[] = await this.getCompany("pendingCompanies", {fieldPath: documentId(), opStr: "==", value: id})
        console.log(currentPendingCompany)
        
        await this.addCompany(new Company(currentPendingCompany[0].name, currentPendingCompany[0].school, currentPendingCompany[0].region, currentPendingCompany[0].category, {enabled: false} ), "companies")
        await this.removeCompany(id)
        console.log("company aproved")
    }
    
    async removeCompany(id: string) {
        await deleteDoc(doc(firebaseCollection.db, "pendingCompanies", id));
        console.log("company deleted")
    }

    async updateCompany(stripeId: string) { // NOTE: Kanske göra mer flexibel funktion?
        let getCompany = await this.getCurrentUserCompany()
        let currentCompanyClone = getCompany[0] as Company

        const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id as string);
        currentCompanyClone.payments.stripe_acc_id = stripeId
        await updateDoc(companyRef, {
        ...currentCompanyClone as Company
        });     
        console.log("Added stripe id:", stripeId, "to current company")   
    }

    async setPaymentEnabled(enabled: boolean) { // NOTE: Kanske göra mer flexibel funktion?
        let getCompany = await this.getCurrentUserCompany()
        let currentCompanyClone = getCompany[0] as Company

        const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id as string);
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

