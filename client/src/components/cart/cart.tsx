import { DocumentData, documentId, limit } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { Product } from '../../models';
import CartProductController from './cartProductController';
import Button from '../UI/button';
import ToCheckout from './toCheckout';
import SpinnerModal from '../functions/spinnerModal';
import { GeneralContext, GeneralOptions } from '../../context/general/generalContext';
import CartProductCard from '../UI/cartProductCard';
import { Helmet } from 'react-helmet-async';





type Cart = {
    companyId: string
    companyName: string
    shippingPrice: number,
    freeShippingOver: number
    stripeId: string
    products: Product[]
}

type Props = {
    isLoggedIn: any
    setLoginToggle: any
}

/**
 * The cart synchronize ID'S saved in the localstorage to fetch the correct product data from the DB and 
 * then combine the quantity from localstorage with the product data from DB into state("productsInCart")
 * */ 
export default function Cart(props: Props) {

    const productContext: ProductOptions = useContext(ProductContext)
    const companyContext: CompanyOptions = useContext(CompanyContext)
    const general: GeneralOptions = useContext(GeneralContext)
   
    const [productsInCart, setProductsInCart] = useState<Cart[]>()
    const [stripeAccountId, setStripeAccountId] = useState<string>("")
    const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false)
    const [checkoutItems, setCheckoutItems] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [statusMsg, setStatusMsg] =useState<string | undefined>(undefined)
    const localst: string | null = localStorage.getItem('cart')
   
    const syncCart = async () => {
        //Get products from DB     
        if(localst) {
            let parsedLocal = JSON.parse(localst)
            if(parsedLocal.length) {
                
                let cart = await productContext.functions.getProducts("products", documentId(), 'in', parsedLocal.map((localItem: any) => { return localItem.id }), limit(1000))
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
                const arrayWithCompanyNames = await getCompanyData(sortedCart)
                setProductsInCart(arrayWithCompanyNames)
            } 
            else {
                console.log("elseee")
                setProductsInCart([])
            }
        }
    }

    const getCompanyData = async (array: any) => {
        if(array) {
            const arrayClone: Cart[] = [...array]
            const arrayWithNames = await Promise.all(arrayClone?.map( async (product) => {
                const company = await companyContext.getCompany("companies", {fieldPath: documentId(), opStr: "==", value: product.companyId})
                product.stripeId = company[0].payments.stripe_acc_id as string
                product.companyName = company[0].name
                product.shippingPrice = company[0].shipping.shippingPrice
                product.freeShippingOver = company[0].shipping.freeShippingOver
                return product
            }))
            return arrayWithNames
        }
    }

    const calculateTotalPrice = (products: Product[]) => {
        let total: number = 0
        products.map((product) => {
            if(product.quantity) {
                let priceTimesQuantity = product.price * product.quantity
                total = (total + priceTimesQuantity)
            }
        })
        return total
    }


    useEffect(() => {
        productContext.functions.verifyCheckoutSession(general.path as string) 
    }, [])


    useEffect(() => {
        syncCart()  
        general.functions.countCart("state")
    }, [localst])


    useEffect(() => {
        //console.log("productsInCart: ", productsInCart)
        if(productsInCart !== undefined || localst === null) {
            setLoading(false)
        }
    }, [productsInCart])
 
/* 
    useEffect(() => {
        
    }, [loading])

    useEffect(() => {
        
    }, [statusMsg]) */

    return (
        
            
            <div id="cartWrapper" className='noScrollBar' style={cartWrapperStyle}>
                <Helmet>
                    <title>{`Marung - Kundvagn`}</title>
                </Helmet>

                <div className="contentHeader" style={contentHeader}> 
                    <h3>
                        Kundvagn
                    </h3>
                </div>

                {loading? //FIXME: Spinner
                    <SpinnerModal fullScreen={true} message={statusMsg as string} />
                : null}
                
                {checkoutOpen?      
                    <ToCheckout setCheckoutOpen={(bool: boolean) => setCheckoutOpen(bool)} stripeAccountId={stripeAccountId} cartItem={checkoutItems} isLoggedIn={props.isLoggedIn} setLoginToggle={props.setLoginToggle} />
                    : null
                }
                    
                <div id="cartContentWrapper" className="noScrollBar" style={{padding: "0 2em"}}>    
                    {productsInCart !== undefined && productsInCart.length > 0?   
                        productsInCart.map((cartItem, i) => {
                                return (
                                    <div key={i} className="cartSection" style={cartSectionStyle}> 
                                        <h1 style={{width: "100%", textAlign: "center", marginBottom: "1em"}}>{cartItem.companyName}</h1>
                                            <div className='cartSectionProductWrapper' style={cartSectionProductWrapperStyle}  >
                                                {
                                                    cartItem.products.map((product, i) => {
                                                        return(
                                                            <CartProductCard key={i} product={product} linkTo={`/company/${cartItem.companyName}/${cartItem.companyId}/product/${product.name}/${product.id}`}>
                                                                <CartProductController product={product} syncCart={syncCart}/>
                                                            </CartProductCard>
                                                        )
                                                    })
                                                }
                                           
                                            </div>
                                                
                                        <div className='paymentSection' style={paymentSectionStyle}>
                                            <div id="paymentSectionInfo" style={{minWidth: "50%", fontSize: "1.2em"}}>
                                                
                                                <p>Frakt: {calculateTotalPrice(cartItem.products) > cartItem.freeShippingOver && cartItem.freeShippingOver !== 0? 0 : cartItem.shippingPrice}kr</p>
                                                <p>Produkter: {calculateTotalPrice(cartItem.products)}kr </p>
                                                <p>Totalt: {calculateTotalPrice(cartItem.products) > cartItem.freeShippingOver && cartItem.freeShippingOver !== 0? calculateTotalPrice(cartItem.products) : cartItem.shippingPrice + calculateTotalPrice(cartItem.products)}kr</p>
                                            </div>

                                            <Button border='1px solid black' width="25vw" minWidth='50%' height='5vh' buttonText='Slutför köp' margin="0.5em 0 0 0" onClick= { async () => {
                                                setLoading(true); 
                                                const result = await productContext.functions.checkQuantityBeforePurchase(cartItem.products)
                                                if(result?.status === 410) {  
                                                    console.log("in 400 if")                          
                                                    setStatusMsg('Opps, det fanns inte tillräckligt med produkter')
                                                    console.log(result.status , result.message)
                                                }
                                                setTimeout(() => {
                                                    setStatusMsg(undefined)
                                                    setLoading(false)
                                                }, 1500);

                                                if(result?.status === 200) {
                                                    setStripeAccountId(cartItem.stripeId);
                                                    setCheckoutItems(cartItem);
                                                    setCheckoutOpen(!checkoutOpen); 
                                                }
                                              
                                            }}/>
                   
                                        </div>
                                    </div>
                                )
                            })
                            :   productsInCart !== undefined && productsInCart?.length < 1 || localst === null?
                                    <p>Din varukorg är tom</p>
                                    : null}
                        
                </div>

       
            </div>
    );
}

const cartWrapperStyle: CSSProperties = { 
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    //padding: "0 2em",
    overflow: "auto"
    //overflow: "auto",
    //position: "relative"
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
    //width: "50%",
    //height: "100%",
    minWidth: "350px",
    //backgroundColor: "red",
    flexGrow: 1,
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "flex-end",
    margin: "0 0 1.5em 0",
}

const contentHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%", 
   // height: "10%",
    backgroundColor: '#92A8D1',
    fontSize: '1.5em',
    color: 'white',
    borderBottom: "1px solid black",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    position: "sticky",
    top: 0,
    marginBottom: "1em"
}