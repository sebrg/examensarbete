import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, FieldPath, getDoc, getDocs, query, setDoc, where, WhereFilterOp, WithFieldValue, deleteDoc, documentId, updateDoc } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { ProductContext, ProductOptions, } from "./productContext"
import { Company, Product } from "../../models"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CompanyContext } from "../companies/companyContext";
import { StatusObject } from '../../types'

//import { match } from "react-router-dom";

interface Props{}
export default class ProductProvider extends Component<Props, ProductOptions>   {
    static contextType = CompanyContext

    state: ProductOptions = {
        functions: {
            addProduct: this.addProduct.bind(this),
            //getCurrentUserCompany: this.getCurrentUserCompany.bind(this),
            getProductsFromCompany: this.getProductsFromCompany.bind(this),
            upLoadImg: this.upLoadImg.bind(this),
            //getSingleProduct: this.getSingleProduct.bind(this),
            getAllProducts: this.getAllProducts.bind(this),
            getProducts: this.getProducts.bind(this),
            addOrder: this.addOrder.bind(this),
            getAllOrders: this.getAllOrders.bind(this),
            deleteProduct: this.deleteProduct.bind(this),
            updateProduct: this.updateProduct.bind(this)
            updateQuantityOnPurchase: this.updateQuantityOnPurchase.bind(this),
            addPendingOrder: this.addPendingOrder.bind(this),
            addQuantityOnExpiredOrder: this.addQuantityOnExpiredOrder.bind(this),
            verifyCheckoutSession: this.verifyCheckoutSession.bind(this)
        },
        allProducts: []
    }
    async addProduct(product: Product) {
        try {
            let currentCompany = await this.context.getCurrentUserCompany()
            //const imgTest = await this.upLoadImg(product.img)
    
            let productData = {
                name: product.name as string,
                price: product.price as number,
                company: currentCompany[0].id as string,
                images: [] as any[],
                quantity: product.quantity as number
            }
    
            if(product.images) {
                await Promise.all(product.images.map( async (img) => {
                    const imgUrl = await this.upLoadImg(img)
                    productData.images.push(imgUrl)
                }))
            }
    
            //Failsafe, require atleast one image
            if(!productData.images.length) {
                return {status: 400, message: "Your product requires atleast one image" } as StatusObject
            }
    
            await addDoc(collection(firebaseCollection.db, "products"), {
                ...productData
            })
                
            return {status: 202, message: "Product added" } as StatusObject
            

        } catch(err) {
            return {status: 400, message: err } as StatusObject
        }
 
    }




       /** Param description: 
        ** dbCollection: From what collection to fetch
        ** fieldPath: The path to compare
        ** opStr: The operation string (e.g "<", "<=", "==", "<", "<=", "!=").
        ** value: The value for comparison
    **/ 
        async getProducts(dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) {
            //FIXME: remove param dbCollection and replace with "products"
            const q = query(collection(firebaseCollection.db, dbCollection), where(fieldPath, opStr, value));
            const querySnapshot = await getDocs(q);
            const result: Product[] = []
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots  
                //console.log({id: doc.id, data: doc.data()});
                result.push({id: doc.id, ...doc.data()} as Product)
           });
    
           return result
        }
    


    async getProductsFromCompany(companyId: string) {

        const q = query(collection(firebaseCollection.db, "products"), where("company", "==", companyId));
        const querySnapshot = await getDocs(q);
        const result: Product[] = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push({id: doc.id, ...doc.data()} as Product)
       });
       //console.log("test: ", result)
       return result
    }

   
    async upLoadImg(file: any) {

        const currentCompany = await this.context.getCurrentUserCompany() //NOTE: This is being used multiple times in different functions. Find one solution?
        //Check if user authenticated with company
        if(!currentCompany[0]) {
            console.log("YOU ARE NOT AUTHENTICATED")
            return
        }

        // Check if uploaded file is an image
        if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/gif") {
            alert("You can only upload .jpeg, .jpg, .png and .gif under 10mb")
            return
        }

        // Check image file size
        if (file.size/1024/1024>10) {
            alert("The image size must be under 10mb")
            return
        }
        
        const storage = getStorage();
        const imgName = file.name.split(".")[0]
        const imgEnding = file.name.split(".")[1]
        const storageRef = ref(storage, `${currentCompany[0].name}/productImages/${imgName + new Date().getTime()}.${imgEnding}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);

        let imgUrl = await getDownloadURL(uploadTask.ref)
        return imgUrl

    }

    async getAllOrders(fieldPath: string) {
        const result: DocumentData[] = []
        const get = await getDocs(collection(firebaseCollection.db, fieldPath));
        get.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()}) //NOTE: Ta bort doc.id för att inte sätta id i fields
          });
          
          return result
    }

    async addOrder(sessionId: string, stripeCustomer: string) {
        const getAllPendingOrders = await this.getAllOrders("pendingOrders")
        const foundOrder = getAllPendingOrders.find(order => order.id === sessionId) //NOTE: Sätter ett extra id som är samma som doc id.. ?
        console.log(foundOrder," den hittade ")
        if(foundOrder) {
            const pendingOrderRef = doc(firebaseCollection.db, "pendingOrders", sessionId as string);
            foundOrder.payment_status = "paid"
            foundOrder.session_status = "done"
            foundOrder.stripeCustomerId = stripeCustomer
            await updateDoc(pendingOrderRef, {
                ...foundOrder
            });     

            await setDoc(doc(firebaseCollection.db, "orders", sessionId), foundOrder);
            await deleteDoc(doc(firebaseCollection.db, "pendingOrders", sessionId));
        }
    }

    async addPendingOrder(sessionId: string, data: any) {
        await setDoc(doc(firebaseCollection.db, "pendingOrders", sessionId), data);
        console.log('order added')
    }


    async addQuantityOnExpiredOrder(sessionId: string, productId: string, QuantityToAdd: number) {
        let getProduct = await this.getProducts("products", documentId(), "==", productId)
        const productClone = getProduct[0] as Product
    
        const productRef = doc(firebaseCollection.db, "products", productId as string);
        if(productClone.quantity) { 
            let quantity = productClone.quantity + QuantityToAdd
            productClone.quantity = quantity
            await updateDoc(productRef, {
            ...productClone as Product
            });     
            console.log("Added", QuantityToAdd, "on product:", productId)   

            await deleteDoc(doc(firebaseCollection.db, "pendingOrders", sessionId));
        }
    }

    async verifyCheckoutSession() {
        //Failsafe, verifierar session status
        //Tar bort utgångna checkout sessions och skickar tillbaka produkt quantity
        const pendingOrders = await this.getAllOrders("pendingOrders")
		const response = await fetch("http://localhost:3001/checkSession", {
			method: "POST",
			headers: {"content-type": "application/json"},
			credentials: 'include',
			body: JSON.stringify({pendingOrders})
		})
		
		const data = await response.json()
        const sessionItems: any[] = data.cartItems

        if(data.status === 410) {
            console.log(data)
                sessionItems.forEach(items => {                     
                    this.addQuantityOnExpiredOrder(data.sessionId , items.productId, items.quantity)
                })
	    }
        if(data.status === 200) { 
            //Failsafe om en order ej har blivit flyttad från pending till orders..
            this.addOrder(data.sessionId, data.stripeCustomer)
            console.log(data, "denna order är betalad och klar.")
        }
    }


    async getAllProducts() {
        const result: DocumentData[] = []
        const get = await getDocs(collection(firebaseCollection.db, "products"));
        get.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()})
          });
          this.state.allProducts = result as Product[]
    }
    async deleteImg(imgName: string) {

        //const currentCompany = await this.context.getCurrentUserCompany()
        const storage = getStorage();
        //`${currentCompany[0].name}/productImages/${imgName}`
        // Create a reference to the file to delete
        const desertRef = ref(storage, imgName);
        // Delete the file
        deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log(imgName, " has been deleted from DB")
        }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log("Uh Oh something went wrong in the process of deleting ", imgName)
        });
    }
    async deleteProduct(product: Product) {
        
        if(product.images) {
            await Promise.all(product.images.map( async (img) => {
                await this.deleteImg(img as string)
            }))
        }

        await deleteDoc(doc(firebaseCollection.db, "products", product.id as string));
        console.log("Product deleted")
    }

    async updateProduct(oldProduct: Product, newProduct: Product) {
       
        const updatedProduct: Product = {
            name: newProduct.name? newProduct.name : oldProduct.name,
            price: newProduct.price? newProduct.price : oldProduct.price,
            info: newProduct.info? newProduct.info : oldProduct.info != undefined? oldProduct.info : "",
            quantity: newProduct.quantity? newProduct.quantity : oldProduct.quantity,
            images: [] as string[] /* | Blob[] | MediaSource[] | object[] */
        }

        //Failsafe, require atleast one image
        if(!newProduct.images) {
            console.log("Your product requires atleast one image")
            return
        }
       

        const imagesToKeep = newProduct.images.filter(image => image == oldProduct.images.find(img => img === image))
        const imagesToAdd = newProduct.images.filter(image => image !== oldProduct.images.find(img => img === image))
        const imagesToRemove = oldProduct.images.filter(image => image !== newProduct.images.find(img => img === image)  )

        if(imagesToKeep.length) {
            updatedProduct.images = [...imagesToKeep]
        }

        if(imagesToAdd.length) {
            await Promise.all(imagesToAdd.map( async (img) => {
                const imgUrl = await this.upLoadImg(img)
                updatedProduct.images.push(imgUrl as string)
            }))
        }

        if(imagesToRemove.length) {
            await Promise.all(imagesToRemove.map( async (img) => {
                await this.deleteImg(img as string)
            }))
        } 

        const productRef = doc(firebaseCollection.db, "products", oldProduct.id as string)
        await updateDoc(productRef, 
            {...updatedProduct}
        );    
        


    async updateQuantityOnPurchase(productId: string, QuantityToRemove: number) { 
        let getProduct = await this.getProducts("products", documentId(), "==", productId)
        const productClone = getProduct[0] as Product
    
        const productRef = doc(firebaseCollection.db, "products", productId as string);
        if(productClone.quantity) { 
            let quantity = productClone.quantity - QuantityToRemove
            productClone.quantity = quantity
            await updateDoc(productRef, {
            ...productClone as Product
            });     
            console.log("Removed", QuantityToRemove, "on product:", productId)   
        }
    }

    render() {
        return(
            <ProductContext.Provider value={this.state}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

