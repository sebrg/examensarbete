import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import ImageSlider from './sliderCarousel';
import Button from './button';
import { FaCartPlus } from 'react-icons/fa';
import { Product } from '../../models';


export default function SingleProduct() {

    const [product, setProduct] = useState<Product>()
    const [products, setProducts] = useState<Product[]>()

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const match = useMatch("company/:productId/:productName");
    const productId = match?.params.productId

    const getProduct = async () => { // FIXME: Remove getSingleProduct func
        if(productId && productId !== undefined) {
            const product = await fbFuncs.getSingleProduct(productId)
            setProduct(product[0] as Product)  
         
         
            if(product && product !== undefined) {
                const prods = await fbFuncs.getProductsFromCompany(product[0].company)
                let filteredArray = prods.filter(i => i.name !== product[0].name)
                setProducts(filteredArray) 
            }
        }
    }

    useEffect(() => {
        getProduct()
    }, [])
    
    useEffect(() => {
       /*  console.log(product, "single product") */
    }, [product])
    
    useEffect(() => {
        console.log(products, "all products")
    }, [products])

    function renderProduct() {
        return (               
                product?
                        <React.Fragment>
                            <div style={productDetails}>
                            <h1> {product.name} </h1>
                            <h3> {product.price + " " + 'kr'} </h3>
                            <p style={marginBottom}> Product info goes here </p>
                        <Button
                            width='30%' 
                            buttonText={<FaCartPlus/>}
                            bgColor='#363945'
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
                        <p>Kunde inte hitta images</p>    
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






