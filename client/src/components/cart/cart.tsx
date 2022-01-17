import { DocumentData, documentId } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { Product } from '../../models';
import ProductCard from '../UI/productCard';
import CartProductController from './cartProductController';
import { useStripe } from '@stripe/react-stripe-js';
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

    const stripe = useStripe()

	async function toCheckOut(cartItem: any) {
		if(stripe) {
      		const response = await fetch("http://localhost:3001/checkout", {
          		method: "POST",
          		headers: {"content-type": "application/json"},
          		credentials: 'include',
                body: JSON.stringify({products: cartItem})
      		})

			const { id } = await response.json()
			console.log(id)
			stripe.redirectToCheckout({sessionId: id})
		}  
	}


    

    return (
        
		<div id="cartWrapper" style={cartWrapperStyle}>
            { 
                productsInCart?    
                    productsInCart.map((cartItem, i) => {
                        return (
                            <div key={i} className="cartSection" style={cartSectionStyle}>
                                <h1>{cartItem.companyName}</h1>

                                <Button onClick={() => toCheckOut(cartItem.products)} buttonText='Till checkout' width='20%'></Button>

                                <div className='cartSectionProductWrapper' style={cartSectionProductWrapperStyle}  >
                                    {
                                        cartItem.products.map((product, i) => {
                                            return(
                                                <ProductCard key={i} 
                                                    bgColor='#EFE1CE'
                                                    product={product as Product} 
                                                    width='15%'
                                                    height='100%'
                                                    imgWidth='100%'
                                            
                                                    linkTo={`/${product.name}-${product.id}`} //FIXME: gör om routing, singleProduct behöver inte vara child till company pages
                                                    displayProductInfo={false}
                                                >     

                                                    <CartProductController product={product} syncCart={syncCart}/>

                                                </ProductCard>
                                            )
                                        })
                                    }
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
    display: "flex",
    flexDirection: "column"
}

const cartSectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
}

const cartSectionProductWrapperStyle: CSSProperties = {
    display: "flex",
    height: "100%"
}