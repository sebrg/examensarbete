import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { ProductContext, ProductOptions } from "../../context/products/productContext";

import ProductCard from '../UI/productCard';
import { Product } from '../../models'
import AddToCartBtn from '../cart/addToCartBtn';


export default function CompanyPage() {

    const productContext: ProductOptions = useContext(ProductContext)
    const [products, setProducts] = useState<Product[]>()


    
    const params = useMatch("/company/:companyName/:companyId")?.params;
    const companyName = params?.companyName
    const companyId = params?.companyId

    const getProducts = async () => {
        if(companyId && companyId !== undefined) {
            const products = await productContext.functions.getProducts("products", "company", "==", companyId)
            setProducts(products) 
        }
    }
   
    function renderProducts() {
        return ( 
            <div className='produtWrapper noScrollBar' style={coPage}>
                { 
                products?    
                    products.map((product, i) => {
                        return(
                            <ProductCard key={i} 
                                bgColor='#EFE1CE'
                                product={product as Product} 
                                direction="column"
                                width='20vw'
                                linkTo={`/company/${companyName}/${companyId}/product/${product.name}/${product.id}`} //NOTE: maybe use replace on blank spaces
                                minWidth='250px'
                                //imgWidth='100%'
                                //imgHeight='auto'
                            >   
                              
                                <AddToCartBtn product={product}/>  

                            </ProductCard>
                        )
                    })
                    :
                    <p>Hämtar produkter..</p>
                } 
            </div>
        )
    }
    
    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        console.log(products)
    }, [products])

    return (
        <div id="companyPageWrapper" className='noScrollBar' style={companyPageWrapper}>


            <div id="companyPageHeader" style={companyPageHeader}> 
                <h3>
                    {companyName}
                </h3>
            </div>


            {renderProducts()}

        </div>
   
    );    
}

const companyPageHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%", 
    height: "10%",
    backgroundColor: '#92A8D1',
    fontSize: '3em',
    color: 'white',
    borderBottom: "1px solid black",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px"
}

const coPage: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //alignItems: 'center',
    width: '100%', 
    flexWrap: "wrap",
    padding: "1em"
}

const companyPageWrapper: CSSProperties = {
    height: '100%',
    overflow: "auto",


}