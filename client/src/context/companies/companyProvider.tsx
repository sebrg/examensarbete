import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, DocumentData, documentId, FieldPath, getDoc, getDocs, query, where, WhereFilterOp } from "firebase/firestore";
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
        aproveCompany: this.aproveCompany.bind(this),
        removeCompany: this.removeCompany.bind(this)
    }

    async addCompany(company: Company, to: "companies" | "pendingCompanies") {
        //TODO: Fix better failsafe
       
        let companyData: Omit<Company, "id"> = { // FORTSÄTT HÄR
            category: company.category,
            name: company.name,
            region: company.region,
            school: company.school
        }

        const auth = getAuth();

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

    async getCompany(from: "companies" | "pendingCompanies", fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) {
        //FIXME: remove param dbCollection and replace with "products"
        const q = query(collection(firebaseCollection.db, from), where(fieldPath, opStr, value));
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
        const currentPendingCompany: Company[] = await this.getCompany("pendingCompanies", documentId(), "==", id)
        console.log(currentPendingCompany)
        
        await this.addCompany(new Company(currentPendingCompany[0].name, currentPendingCompany[0].school, currentPendingCompany[0].region, currentPendingCompany[0].category ), "companies")
        await this.removeCompany(id)
        console.log("company aproved")
    }
    
    async removeCompany(id: string) {
        await deleteDoc(doc(firebaseCollection.db, "pendingCompanies", id));
        console.log("company deleted")
    }
    
    render() {
        return(
            <CompanyContext.Provider value={this.state}>
                {this.props.children}
            </CompanyContext.Provider>
        )
    }
}

