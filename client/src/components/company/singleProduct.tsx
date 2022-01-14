import { DocumentData, documentId } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import ImageSlider from '../UI/sliderCarousel';
import Button from '../UI/button';
import { FaCartPlus } from 'react-icons/fa';
import { Product } from '../../models';
import { ProductContext, ProductOptions } from '../../context/products/productContext';


export default function SingleProduct() {

    const [product, setProduct] = useState<Product>()
    const [products, setProducts] = useState<Product[]>()

    //const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const productContext: ProductOptions = useContext(ProductContext)

    const params = useMatch(":company/:product")?.params;
    const productName = params?.product?.split("-")[0]
    const productId = params?.product?.split("-")[1]
    const companyName = params?.company?.split("-")[0]
    const companyId = params?.company?.split("-")[1]
    



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



    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        console.log(products, "all products")
        getCurrentProduct()
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
                            <Button
                                width='100%' 
                                buttonText='Lägg till i kundvagn'
                                icon={<FaCartPlus fontSize={"1.2em"}/>}
                                bgColor='#363945'
                                iconMargin='0 0 0 0.5em'
                            />  
                        </div>
                    </React.Fragment>          
                    :
                    <h1>Hämtar produkt..</h1>
        )
    }

   

    function productReel() {
        return (               
                products?
                    <React.Fragment>
                        
                    </React.Fragment>          
                    :
                    <h1>Hämtar produkt..</h1>
        )
    }


    return (
        <div style={singlePage}>
            <div style={productInfoDiv}>
                {renderProduct()}
                <div>
                    {
                        product? 
                            <ImageSlider slides={product.images}/>
                            :
                            <p>Kunde inte hitta bilderna</p>    
                    }
                </div>
                
            </div>

            <div style={productReelStyle}>
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


const productInfoDiv: CSSProperties = {
    width: '80%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'row',
    backgroundColor: '#9896A4',

}

const marginBottom: CSSProperties = {
    marginBottom: '2em'
}

const productReelStyle: CSSProperties = {
    display: 'flex',
    width: '20%',
    height: '100%',
    backgroundColor: '#79C753'
}

const productDetails: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
}






