import { limit } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import ImageSlider from '../UI/sliderCarousel';
import { Product } from '../../models';
import { ProductContext, ProductOptions } from '../../context/products/productContext';
import AddToCartBtn from '../cart/addToCartBtn';
import SpinnerModal from '../functions/spinnerModal';
import { Helmet } from 'react-helmet-async';



export default function SingleProduct() {
    
    const navigate = useNavigate()

    const [product, setProduct] = useState<Product>()
    const [products, setProducts] = useState<Product[]>()
    const [productsInReel, setProductsInReel] = useState<Product[]>()
    const [url, setUrl] = useState<string | undefined>(undefined)
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
    

    //const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const productContext: ProductOptions = useContext(ProductContext)

    const params = useMatch("/company/:companyName/:companyId/product/:productName/:productId")?.params;

    const productName = params?.productName
    const productId = params?.productId
    const companyName = params?.companyName
    const companyId = params?.companyId

    const getProducts = async () => {
        if(companyId && companyId !== undefined) {
            const products = await productContext.functions.getProducts("products", "company", "==", companyId, limit(4))
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
        if(shouldRedirect) {
            getProducts()
            setShouldRedirect(false)
        }
    }, [shouldRedirect])


    useEffect(() => {
        getProducts()
    }, [])
    
    useEffect(() => {
        getCurrentProduct()
        filterAllProducts()
    }, [products])
    
    useEffect(() => {
        setShouldRedirect(true)
    }, [params])




    function renderProduct() {
        return (               
                product?
                    <React.Fragment>
                        <div className='singleProductInfoWrapper' style={productDetails}>
                            <h1> {product.name} </h1>
                            <h3> {product.price + " " + 'kr'} </h3>
                            <p style={marginBottom}> Product info goes here </p>
                            <AddToCartBtn product={product}/>  
                        </div>
                    </React.Fragment>          
                    :
                    <SpinnerModal fullScreen={true} />
        )
    }

   
    //NOTE: 
    function productReel() {
        return (
                productsInReel?
                    productsInReel.map((product, i) => {
                        return (     
                            <div id='reel-div' key={i} style={{width: '100%', height: '25%', display: 'flex', justifyContent: 'center', marginBottom: '1.5em', flexDirection: 'column', padding: '0.5em'}}>
                                <Link key={product.id} to={`/company/${companyName as string}/${companyId as string}/product/${product.name}/${product.id}`} style={{height: '100%', width: '100%', borderRadius: '15px', border: '1px solid #E0B589', backgroundColor: '#EFE1CE'}}>
                                <img  /* onClick={() => setShouldRedirect(true)} */ style={{objectFit: 'contain', height: '100%', width: '100%', borderRadius: '15px'}} src={product.images[0]} alt='produktbild' />
                                </Link>
                                <p style={{textAlign: 'center'}}>  {product.name}  </p>
                            </div>
                        )
                    })    
                    :
                    <SpinnerModal fullScreen={true} />
        )
    }


    return (

        <div className='singleProductWrapper noScrollBar' style={singlePage}>
           
            <Helmet>
                <title>{`Marung - ${product?.name as string}`}</title>
            </Helmet>

            <div id='singleProductDiv' style={singleProductDiv}>
                {renderProduct()}
                <div id='slider-holder' className='sliderForSingleProduct' style={{width: '50%', height: '50%'}}>
                    {
                        product? 
                            <ImageSlider slides={product.images}/>
                            :
                            <p>Kunde inte hitta bilderna</p>    
                    }
                </div>
                
            </div>

            <div className='noScrollBar' id='product-reel' style={productReelStyle}>
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
    backgroundColor: '#DFCFBE',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
}

const productDetails: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
}






