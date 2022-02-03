import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, documentId, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Component } from "react"
import firebaseCollection from "../../firebase";
import { CompanyContext, CompanyOptions, } from "../companies/companyContext"
import { Company, Product } from "../../models"
import { FbQuery, Order, StatusObject, UserInfo } from "../../types"
import { UserContext } from "../users/userContext";

interface Props{}
export default class CompanyProvider extends Component<Props, CompanyOptions>   {
    static contextType = UserContext

    state: CompanyOptions = {
        addCompany: this.addCompany.bind(this),
        getCurrentUserCompany: this.getCurrentUserCompany.bind(this),
        getAllCompanies: this.getAllCompanies.bind(this),
        getCompany: this.getCompany.bind(this),
        aproveCompany: this.aproveCompany.bind(this),
        removeCompany: this.removeCompany.bind(this),
        updateCompany: this.updateCompany.bind(this),
        setPaymentEnabled: this.setPaymentEnabled.bind(this),
        getOrdersByCompany: this.getOrdersByCompany.bind(this),
        orderIsShipped: this.orderIsShipped.bind(this),
        getOrder: this.getOrder.bind(this),
        denyCompany: this.denyCompany.bind(this),
        updateShipping: this.updateShipping.bind(this)


    }

    async addCompany(company: Omit<Company, "category">, to: "companies" | "pendingCompanies") {
        try{
            const auth = getAuth();
 
            let companyData: Omit<Company, "id" | "category"> = {
                name: company.name,
                school: company.school,
                region: company.region, 
                // category: company.category, 
                email: company.email, 
                payments: {
                    enabled: company.payments.enabled,
                },
                shipping: {
                    shippingPrice: company.shipping.shippingPrice,
                    freeShippingOver: company.shipping.freeShippingOver
                },
                creator: to == "companies"? company.creator : auth.currentUser?.uid
            }
    
            if(!auth.currentUser) {
                return {status: 400, message: `Behörighet saknas` } as StatusObject
            }

            if(companyData.name.length < 2 || /* companyData.category.length < 2 || */ companyData.region.length < 2 || companyData.school.length < 2) {
                return {status: 400, message: `Alla uppgifter behöver fyllas i` } as StatusObject

            }

            if(companyData.email.length < 4) {
                return {status: 400, message: `Någonting var fel med mail adressen` } as StatusObject
            }

            
            if(to === "pendingCompanies") {
                await addDoc(collection(firebaseCollection.db, to), {
                
                    ...companyData
                });

                const userInfo = await this.context.getUserInfo(auth.currentUser?.uid)
                const clonedUserInfo: UserInfo = {...userInfo[0]}
                clonedUserInfo.pendingCompany = true


                await this.context.addOrUpdateUserInfo({...clonedUserInfo}, auth.currentUser?.uid)
                
                return {status: 200, message: `Din ansökan har lagts till och väntar på att godkännas` } as StatusObject
            }
            else { //to === "companies"
                await setDoc(doc(firebaseCollection.db, "companies", company.id as string), {
                    ...companyData
                })

                const userInfo = await this.context.getUserInfo(company.creator)
                const clonedUserInfo: UserInfo = {...userInfo[0]}
                clonedUserInfo.pendingCompany = false
                clonedUserInfo.company = company.id


                await this.context.addOrUpdateUserInfo(clonedUserInfo, company.creator)
    
                return {status: 200, message: `Din ansökan har lagts till och väntar på att godkännas` } as StatusObject
            }

         

        } catch(err) {
            return {status: 400, message: err } as StatusObject
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
        
        //FIXME: make to object as company as param instead
        //await this.addCompany(new Company(currentPendingCompany[0].name, currentPendingCompany[0].school, currentPendingCompany[0].region, currentPendingCompany[0].category, {enabled: false}, undefined, currentPendingCompany[0].creator), "companies")
       
        await this.addCompany({name: currentPendingCompany[0].name, /* category: currentPendingCompany[0].category, */ region: currentPendingCompany[0].region, school: currentPendingCompany[0].school, email: currentPendingCompany[0].email, creator: currentPendingCompany[0].creator, id: id, payments: {enabled: false}, shipping: {shippingPrice: 0, freeShippingOver: 0}}, "companies")
        await this.removeCompany(id)
    }

    async denyCompany(companyId: string) {
        const currentCompany: Company[] = await this.getCompany("pendingCompanies", {fieldPath: documentId(), opStr: "==", value: companyId})
        const currentUser: UserInfo[] = await this.context.getUserInfo(currentCompany[0].creator)
        const clonedUserInfo: UserInfo = {...currentUser[0]}

        clonedUserInfo.pendingCompany = false

        await this.context.addOrUpdateUserInfo(clonedUserInfo, currentCompany[0].creator)
        await this.removeCompany(companyId)
    }
    
    async removeCompany(id: string) { //NOTE: add param "from: 'pendingComapnies' | 'companies'"
        await deleteDoc(doc(firebaseCollection.db, "pendingCompanies", id));
    }

    async updateCompany(stripeId: string) { // NOTE: Kanske göra mer flexibel funktion?
        let getCompany = await this.getCurrentUserCompany()
        let currentCompanyClone = getCompany[0] as Company

        const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id as string);
        currentCompanyClone.payments.stripe_acc_id = stripeId
        await updateDoc(companyRef, {
        ...currentCompanyClone as Company
        });        
    }

    async setPaymentEnabled(enabled: boolean) {
        let getCompany = await this.getCurrentUserCompany()
        let currentCompanyClone = getCompany[0] as Company
        currentCompanyClone.payments.enabled = enabled
        const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id as string);
        await updateDoc(companyRef, {
        ...currentCompanyClone as Company
        });       
    }

    async updateShipping(shippingPrice: string, freeShippingOver: string) { 
        try {
            let getCompany = await this.getCurrentUserCompany()
            let currentCompanyClone = getCompany[0] as Company

            const companyRef = doc(firebaseCollection.db, "companies", getCompany[0].id as string);
            currentCompanyClone.shipping.shippingPrice = parseInt(shippingPrice)
            currentCompanyClone.shipping.freeShippingOver = parseInt(freeShippingOver)
            await updateDoc(companyRef, {
            ...currentCompanyClone as Company
            });     
            return {status: 200, message: `Uppdateringen lyckades` } as StatusObject 
        } catch(err) {
            return {status: 400, message: err } as StatusObject
        }
        
    }

    async getOrdersByCompany(companyId: string, shippingStatus: string) {
       
        const q = query(collection(firebaseCollection.db, "orders"), where("companyId", "==", companyId), where("shipped", "==", shippingStatus));
        const querySnapshot = await getDocs(q);
        const result: any = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push({id: doc.id, ...doc.data()})
       });
       //console.log("test: ", result)
       return result
    }

    async getOrder(orderId: string) {
        const result: Order[] = []
        const q = query(collection(firebaseCollection.db, "orders"), where(documentId(), "==", orderId));
        const order = await getDocs(q);
        order.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()} as Order) 
          });
          return result
    }

    async orderIsShipped(orderId: string, shipped: string) { 
        let getOrder = await this.getOrder(orderId)
        let clonedOrder = getOrder[0] as Order

        const orderRef = doc(firebaseCollection.db, "orders", clonedOrder.id);
        clonedOrder.shipped = shipped
        await updateDoc(orderRef, {
        ...clonedOrder as Order
        });     
        return {status: 200, message: `Ordern är markerad som skickad` } as StatusObject   
    }

    
    render() {
        return(
            <CompanyContext.Provider value={this.state}>
                {this.props.children}
            </CompanyContext.Provider>
        )
    }
}

