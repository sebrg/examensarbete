import { DocumentData, documentId } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import ImageSlider from '../UI/sliderCarousel';
import Button from '../UI/button';
import { FaCartPlus } from 'react-icons/fa';
import { Product } from '../../models';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import AddToCartBtn from '../cart/addToCartBtn';


export default function SingleProduct() {

    const [product, setProduct] = useState<Product>()
    const [products, setProducts] = useState<Product[]>()
    const [productsInReel, setProductsInReel] = useState<Product[]>()

    //const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const productContext: ProductOptions = useContext(ProductContext)

    const params = useMatch("/company/:companyName/:companyId/product/:productName/:productId")?.params;

    console.log(params)

    const productName = params?.productName
    const productId = params?.productId
    const companyName = params?.companyName
    const companyId = params?.companyId
    



    const getProducts = async () => {
        if(companyId && companyId !== undefined) {
            const products = await productContext.functions.getProducts("products", "company", "==", companyId)
            setProducts(products) 
        }
    }

    const getCurrentProduct = async () => { // FIXME: Remove getSingleProduct func
        if(products?.length) {
            let filteredProducts = products.filter(product => product.id == productId)
            setProduct(filteredProducts[0])
        }
    }

    const filterAllProducts = async () => {
        if(products) {
            let filteredProducts = products.filter(product => product.id !== productId)
            setProductsInReel(filteredProducts)
        }
    }



    useEffect(() => {
        getProducts()
    }, [])
    
    useEffect(() => {
        console.log(products, "all products")
        getCurrentProduct()
        filterAllProducts()
    }, [products])
    
    useEffect(() => {
       console.log(product, "single product")
    }, [product])
    


    function renderProduct() {
        return (               
                product?
                    <React.Fragment>
                        <div style={productDetails}>
                            <h1> {product.name} </h1>
                            <h3> {product.price + " " + 'kr'} </h3>
                            <p style={marginBottom}> Product info goes here </p>
                            <AddToCartBtn product={product}/>  
                        </div>
                    </React.Fragment>          
                    :
                    <h1>Hämtar produkt..</h1>
        )
    }

   

    function productReel() {
        return (               
                productsInReel?
                    productsInReel.map((products, i) => {
                        return (
                            <div>
                                <h1> {products.name} </h1>
                                <h3> {products.price + " " + 'kr'} </h3>
                                <p style={marginBottom}> Product info goes here </p>
                            </div>
                        )
                    })    
                    :
                    <h1>Hämtar produkt..</h1>
        )
    }


    return (
        <div className='noScrollBar' style={singlePage}>
            <div id='singleProductDiv' style={singleProductDiv}>
                {renderProduct()}
                <div id='slider-holder' style={{width: '50%', height: '50%'}}>
                    {
                        product? 
                            <ImageSlider slides={product.images}/>
                            :
                            <p>Kunde inte hitta bilderna</p>    
                    }
                </div>
                
            </div>

            <div id='product-reel' style={productReelStyle}>
                {productReel()}
            </div> 
        </div>

        
    );
}

const singlePage: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
    flexWrap: 'wrap-reverse'
} 


const singleProductDiv: CSSProperties = {
    width: '80%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'row',
}

const marginBottom: CSSProperties = {
    marginBottom: '2em'
}

const productReelStyle: CSSProperties = {
    display: 'flex',
    width: '20%',
    height: '100%',
    backgroundColor: '#79C753',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const productDetails: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
}






