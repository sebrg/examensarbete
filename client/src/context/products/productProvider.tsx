import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, FieldPath, getDoc, getDocs, query, setDoc, where, WhereFilterOp, WithFieldValue, deleteDoc, documentId, updateDoc, limit, QueryConstraint } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { ProductContext, ProductOptions, } from "./productContext"
import { Company, Product } from "../../models"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CompanyContext } from "../companies/companyContext";
import { StatusObject } from '../../types'


interface Props{}
export default class ProductProvider extends Component<Props, ProductOptions>   {
    static contextType = CompanyContext

    /* static contextType =  */

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
            updateProduct: this.updateProduct.bind(this),
            updateQuantityOnPurchase: this.updateQuantityOnPurchase.bind(this),
            addPendingOrder: this.addPendingOrder.bind(this),
            addQuantityOnExpiredOrder: this.addQuantityOnExpiredOrder.bind(this),
            verifyCheckoutSession: this.verifyCheckoutSession.bind(this),
            getOrdersByUser: this.getOrdersByUser.bind(this),
            getProductCategories: this.getProductCategories.bind(this),
            checkQuantityBeforePurchase: this.checkQuantityBeforePurchase.bind(this)
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
                quantity: product.quantity as number,
                category: product.category as string,
                companyName: currentCompany[0].name as string
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
        async getProducts(dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[], limit: QueryConstraint) {
            //FIXME: remove param dbCollection and replace with "products"
            const q = query(collection(firebaseCollection.db, dbCollection), where(fieldPath, opStr, value), limit);
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
            result.push({id: doc.id, ...doc.data()}) //NOTE: Ta bort doc.id f??r att inte s??tta id i fields
          });
          
          return result
    }

    async addOrder(sessionId: string, stripeCustomer: string) {
        const getAllPendingOrders = await this.getAllOrders("pendingOrders")
        const foundOrder = getAllPendingOrders.find(order => order.id === sessionId) //NOTE: S??tter ett extra id som ??r samma som doc id.. ?
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
    }


    async addQuantityOnExpiredOrder(sessionId: string, productId: string, QuantityToAdd: number) {
        let getProduct = await this.getProducts("products", documentId(), "==", productId, limit(1000))
        const productClone = getProduct[0] as Product
    
        const productRef = doc(firebaseCollection.db, "products", productId as string);
        if(productClone.quantity) { 
            let quantity = productClone.quantity + QuantityToAdd
            productClone.quantity = quantity
            await updateDoc(productRef, {
            ...productClone as Product
            });        
            await deleteDoc(doc(firebaseCollection.db, "pendingOrders", sessionId));
        }
    }
    
    async verifyCheckoutSession(param: string) {
        //Failsafe, verifierar session status
        //Tar bort utg??ngna checkout sessions och skickar tillbaka produkt quantity
        try {
            const pendingOrders = await this.getAllOrders("pendingOrders")
            const response = await fetch(`${param}/checkSession`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({pendingOrders})
            })
            
            const data = await response.json()
            const sessionItems: any[] = data.cartItems
    
            if(data.status === 200) { 
                //Failsafe om en order ej har blivit flyttad fr??n pending till orders..
                this.addOrder(data.sessionId, data.stripeCustomer)
                return {status: 200} as StatusObject 
            }
    
            else if(data.status === 410) {
                    sessionItems.forEach(items => {                     
                        this.addQuantityOnExpiredOrder(data.sessionId , items.productId, items.quantity)
                    })
                return {status: 410} as StatusObject    
            }
           
            return  {status: 200} as StatusObject
        }catch(err) {
            return {status: 400, message: err} as StatusObject 
        }
       
    }

    async getOrdersByUser(userId: string) {
       
        const q = query(collection(firebaseCollection.db, "orders"), where("customerId", "==", userId));
        const querySnapshot = await getDocs(q);
        const result: any = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push({id: doc.id, ...doc.data()})
       });
       return result
    }


    async getAllProducts() {
        const result: Product[] = []
        const get = await getDocs(collection(firebaseCollection.db, "products"));
       
        get.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()} as Product)
          });
          /* this.state.allProducts = result as Product[] */
          return result as Product[]
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
        try {
            if(product.images) {
                await Promise.all(product.images.map( async (img) => {
                    await this.deleteImg(img as string)
                }))
            }
    
            await deleteDoc(doc(firebaseCollection.db, "products", product.id as string));
            return {status: 200, message: `${product.name} has been deleted` } as StatusObject    
            
        } catch(err) {

            return {status: 400, message: err } as StatusObject
        }
        
    }

    async updateProduct(oldProduct: Product, newProduct: Product) {
        try {
            const updatedProduct: Omit<Product, "company" | "companyName"> = {
                name: newProduct.name? newProduct.name : oldProduct.name,
                price: newProduct.price? newProduct.price : oldProduct.price,
                info: newProduct.info? newProduct.info : oldProduct.info != undefined? oldProduct.info : "",
                quantity: newProduct.quantity? newProduct.quantity : oldProduct.quantity,
                images: [] as string[] /* | Blob[] | MediaSource[] | object[] */,
                category: newProduct.category? newProduct.category : oldProduct.category
                //companyName: newProduct.category? newProduct.category : oldProduct.category
            }
    
            //Failsafe, require atleast one image
            if(!newProduct.images) {
                return {status: 400, message: "Your product requires atleast one image" } as StatusObject

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
            

            return {status: 200, message: `Uppdateringen lyckades` } as StatusObject    

        }   catch(err) {
                return {status: 400, message: err } as StatusObject
        }
   
    }   


    async updateQuantityOnPurchase(productId: string, QuantityToRemove: number) { 
        let getProduct = await this.getProducts("products", documentId(), "==", productId, limit(1000))
        const productClone = getProduct[0] as Product
    
        const productRef = doc(firebaseCollection.db, "products", productId as string);
        if(productClone.quantity) { 
            let quantity = productClone.quantity - QuantityToRemove
            productClone.quantity = quantity
            await updateDoc(productRef, {
            ...productClone as Product
            });      
        }
    }

    async checkQuantityBeforePurchase(products: any) {
        try {
            //NOTE: L??gg till product name i status om tid
            const checkQuantity = products.map( async (product: any) => {
                let getProduct = await this.getProducts("products", documentId(), "==", product.id, limit(1000))
                const currentProduct = getProduct[0] as Product

                const quantity = currentProduct.quantity as number - product.quantity
                if(quantity < 0) {
                    return false
                }
                else {
                    return true
                }   
            }); 
              
                const checkingBooleans = await Promise.all(checkQuantity)
                
                if(checkingBooleans.includes(false)) {
                    return {status: 410, message: `Det finns bara  kvar i lager..` } as StatusObject
                } else {
                    return {status: 200, message: `Det finns bara kvar i lager..` } as StatusObject
                }

        } catch(err) {
            return {status: 400, message: err } as StatusObject
        }
        
    }

    async getProductCategories() {
        const result: DocumentData[] = []
        const q = query(collection(firebaseCollection.db, "categories"), where(documentId(), "==", "productCategories"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()})
          });

          return result
    }

    render() {
        return(
            <ProductContext.Provider value={this.state}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

