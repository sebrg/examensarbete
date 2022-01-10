import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';
import ProductCard from './productCard';


export default function CompanyPage() {

    const [products, setProducts] = useState<DocumentData[]>()

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

    
    const match = useMatch("company/:id");
    const companyId = match?.params.id

    const getProducts = async () => {
        if(companyId && companyId !== undefined) {
            const products = await fbFuncs.getProductsFromCompany(companyId)
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
                                productTitle={product.data.name} 
                                productPrice={product.data.price}
                                width='20vw'
                                height='auto'
                                linkTo={`/company/${product.id}/${product.data.name}`}
                                imgWidth='100%'
                                imgHeight='auto'
                                productImgUrl={product.data.imgUrl}
                            />     
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
