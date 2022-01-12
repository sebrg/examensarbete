import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, FieldPath, getDoc, getDocs, query, where, WhereFilterOp } from "firebase/firestore";
import React, { Component } from "react"
import firebaseCollection from "../../firebase";
import { ProductContext, ProductOptions, } from "./productContext"
import { Company, Product } from "../../models"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseContext } from "../firebaseContext";

interface Props{}
export default class ProductProvider extends Component<Props, ProductOptions>   {
    static contextType = FirebaseContext

    state: ProductOptions = {
        functions: {
            addProduct: this.addProduct.bind(this),
            //getCurrentUserCompany: this.getCurrentUserCompany.bind(this),
            getProductsFromCompany: this.getProductsFromCompany.bind(this),
            upLoadImg: this.upLoadImg.bind(this),
            getSingleProduct: this.getSingleProduct.bind(this),
            getAllProducts: this.getAllProducts.bind(this),
            getProducts: this.getProducts.bind(this)
        },
        allProducts: []
    }


    async addProduct(product: Product) {

        let currentCompany = await this.context.getCurrentUserCompany()
        //const imgTest = await this.upLoadImg(product.img)

        let productData = {
            name: product.name as string,
            price: product.price as number,
            company: currentCompany[0].id as string,
            images: [] as any[]
        }
        
        await Promise.all(product.images.map( async (img) => {
            const imgTest = await this.upLoadImg(img)
            productData.images.push(imgTest)
        }))

        await addDoc(collection(firebaseCollection.db, "products"), {
            ...productData
        }).then(()=> {
            console.log("product added")
        });
    }

       /** Param description: 
        ** dbCollection: From what collection to fetch
        ** fieldPath: The path to compare
        ** opStr: The operation string (e.g "<", "<=", "==", "<", "<=", "!=").
        ** value: The value for comparison
    **/ 
        async getProducts(dbCollection: string, fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) {
       
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
        const result: DocumentData[] = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots  
            //console.log({id: doc.id, data: doc.data()});
            result.push({id: doc.id, ...doc.data()})
       });

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
        const storageRef = ref(storage, `${currentCompany[0].data.name}/productImages/${imgName + new Date().getTime()}.${imgEnding}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);

        let imgUrl = await getDownloadURL(uploadTask.ref)
        return imgUrl

    }

    async getSingleProduct(docId: string) {
        let result: Product | undefined

        const docRef = doc(firebaseCollection.db, "products", docId);
        const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                result = docSnap.data() as Product
                console.log(result)
            } 
            else {
                console.log("No such document!");
                return
            }
            
            return result
    }





    async getAllProducts() {
        const result: DocumentData[] = []
        const get = await getDocs(collection(firebaseCollection.db, "products"));
        get.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()})
          });
          this.state.allProducts = result as Product[]
    }

    render() {
        return(
            <ProductContext.Provider value={this.state}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}










//NOTE: Continue develop if u dare

    /** Param description: 
        ** dbCollection: From what collection to fetch
        ** fieldPath: The path to compare
        ** opStr: The operation string (e.g "<", "<=", "==", "<", "<=", "!=").
        ** value: The value for comparison
    **/ 
 /*        async getProducts(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) {
       
            const q = query(collection(firebaseCollection.db, "products"), where(fieldPath, opStr, value));
            const querySnapshot = await getDocs(q);
            const result: Product[] = []
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots  
                //console.log({id: doc.id, data: doc.data()});
                result.push({id: doc.id, ...doc.data()} as Product)
           });
    
           return result
        }
     */