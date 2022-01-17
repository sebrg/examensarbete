import { DocumentData, documentId } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { Product } from '../../models';
import ProductCard from '../UI/productCard';
import CartProductController from './cartProductController';
import Button from '../UI/button';

type Cart = {
    companyId: string
    companyName: string
    products: Product[]
}

/**
 * The cart synchronize ID'S saved in the localstorage to fetch the correct product data from the DB and 
 * then combine the quantity from localstorage with the product data from DB into state("productsInCart")
 * */ 
export default function Cart() {

    const productContext: ProductOptions = useContext(ProductContext)
    const companyContext: CompanyOptions = useContext(CompanyContext)

    const [productsInCart, setProductsInCart] = useState<Cart[]>()

    const syncCart = async () => {
        //Get products from DB
        let localst: string | null = localStorage.getItem('cart')
        if(localst) {
            let parsedLocal = JSON.parse(localst)
            if(parsedLocal.length) {
                
                let cart = await productContext.functions.getProducts("products", documentId(), 'in', parsedLocal.map((localItem: any) => { return localItem.id }))
                //Merge quantity from localstorage to cart
                cart.forEach((cartItem: any) => {
                    let foundItem = parsedLocal.find((localItem: any) => localItem.id == cartItem.id)
                    if(foundItem) {
                        cartItem.quantity = foundItem.quantity
                    }
                }) 

                //Sorting cart before pushing to state
                const sortedCart: any[] = []
                cart?.forEach( async (itemInCart) => {
                    let foundItem = sortedCart.find((itemInSortedCart) => itemInSortedCart.companyId == itemInCart.company)
                    if(!foundItem) {
                            
                        sortedCart.push({companyId: itemInCart.company})

                    }
                })
               
                //Filter products and sort them with correct company
                sortedCart.forEach((itemInSortedCart) => {
                    const filteredProducts = cart?.filter(item => item.company == itemInSortedCart.companyId)
                    itemInSortedCart.products = filteredProducts
                })

                //Get name for companies as a new array
                const arrayWithCompanyNames = await getCompanyNames(sortedCart)
                setProductsInCart(arrayWithCompanyNames)
            } 
            else {
                setProductsInCart(undefined)
            }
        }
    }

    const getCompanyNames = async (array: any) => {
        if(array) {
            const arrayClone: Cart[] = [...array]
            const arrayWithNames = await Promise.all(arrayClone?.map( async (product) => {
                const company = await companyContext.getCompany(documentId(), "==", product.companyId)
                product.companyName = company[0].name
                return product
            }))
            return arrayWithNames
        }
    }


    useEffect(() => {
        syncCart()  
    }, [])

    useEffect(() => {
        console.log("productsInCart: ", productsInCart)
    }, [productsInCart])


    

    return (
        
		<div id="cartWrapper" className='noScrollBar' style={cartWrapperStyle}>
            { 
                productsInCart?    
                    productsInCart.map((cartItem, i) => {
                        return (
                            <div key={i} className="cartSection" style={cartSectionStyle}> 
                                <h1 style={{width: "100%", textAlign: "center", marginBottom: "1em"}}>{cartItem.companyName}</h1>
                                {/* <div className='cartSectionContent' style={cartSectionContentStyle}> */}
                                    <div className='cartSectionProductWrapper' style={cartSectionProductWrapperStyle}  >
                                        {
                                            cartItem.products.map((product, i) => {
                                                return(
                                                    <ProductCard key={i} 
                                                        product={product}
                                                        direction='row'
                                                        linkTo="asd"
                                                        height='10vh' //NOTE: Vh istället för procent kan skapa problem. Procent skapar dock stretch problem här då närmsta parent inte har en height
                                                        width='100%'
                                                    >     
                                                        <CartProductController product={product} syncCart={syncCart}/>
                                                    </ProductCard>
                                                )
                                            })
                                        }
                                    </div>
                               {/*  </div> */}
                                <div className='paymentSection' style={paymentSectionStyle}>
                                    <p style={{minWidth: "50%", textAlign: "center", fontSize: "1.2em"}}>Total pris: Test12345</p>
                                    <Button width="25vw" minWidth='50%' height='5vh' buttonText='Slutför köp' />
                                </div>
                            </div>
                        )
                    })
                :
                <p>Din varukorg är tom</p>
            }
        </div>
    );
}

const cartWrapperStyle: CSSProperties = { 
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2em",
    overflow: "auto"
}

const cartSectionStyle: CSSProperties = { //FIXME: CSS lastchild margin 0
    //flexDirection: "column",
    //overflow: "auto"
    display: "flex",
    //height: "100%",
    padding: "1em",
    flexWrap: "wrap",
    alignItems: "stretch",
    alignContent: "flex-start",
    backgroundColor: "#EFE1CE",
    marginBottom: "2em",
    borderRadius: "10px"
}

const cartSectionProductWrapperStyle: CSSProperties = {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    minWidth: "350px",
    flexGrow: 1,
}



const paymentSectionStyle: CSSProperties = {
    display: "flex",
    width: "50%",
    //height: "100%",
    minWidth: "350px",
    //backgroundColor: "red",
    flexGrow: 1,
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center"
}