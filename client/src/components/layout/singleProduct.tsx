import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import ProductCard from './productCard';
import ImageSlider from './sliderCarousel';


export default function SingleProduct() {

    const [product, setProduct] = useState<DocumentData[]>()

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const match = useMatch("company/:productId/:productName");
    const productId = match?.params.productId

    const getProduct = async () => {
        if(productId && productId !== undefined) {
            const product = await fbFuncs.getSingleProduct(productId)
            setProduct(product)  
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        console.log(product)
    }, [product])

    function renderProduct() {
        return ( 
            <div>
                {
                    product? 
                        <React.Fragment>
                            <h1> {product[0].name} </h1>
                            <h3> {product[0].price + " " + 'kr'} </h3>
                            <p> Product info goes here </p>
                        </React.Fragment>

                        
                       
                    :
                      <h1>Hämtar produkt..</h1>
                }
        
            </div>
        )
    }


    return (
        <div style={singlePage}>
            <div style={productInfoDiv}>
                {renderProduct()}
            </div>

            <div style={imageSliderHolder}>
                <ImageSlider/>
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
} 

const imageSliderHolder: CSSProperties = {
    display: 'flex',
    marginRight: '20%',
    width: '50%',
}

const productInfoDiv: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'

}
