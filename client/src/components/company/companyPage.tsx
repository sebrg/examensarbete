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


    
    const params = useMatch(":param")?.params;
    const companyName = params?.param?.split("-")[0]
    const companyId = params?.param?.split("-")[1]

    console.log(companyId)


    const getProducts = async () => {
        if(companyId && companyId !== undefined) {
            const products = await productContext.functions.getProducts("products", "company", "==", companyId)
            setProducts(products) 
        }
    }
   
    function renderProducts() {
        return ( 
            <div style={coPage}>
                { 
                products?    
                    products.map((product, i) => {
                        return(
                            <ProductCard key={i} 
                                bgColor='#EFE1CE'
                                product={product as Product} 
                                width='20vw'
                                height='auto'
                                linkTo={`${product.name}-${product.id}`}
                                imgWidth='100%'
                                imgHeight='auto'
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
        <React.Fragment>
            <div style={companyPageHeader}> 
                <h3>
                    UF NAMN
                </h3>
            </div>


        {renderProducts()}
        </React.Fragment>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '90%',
}

