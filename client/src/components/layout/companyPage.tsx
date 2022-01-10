import { defaultMaxListeners } from 'events';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { FirebaseOptions, FirebaseContext } from '../../context/firebaseContext';


export default function CompanyPage() {

    const [products, setProducts] = useState<DocumentData[]>()
    /* const [companyId, setCompanyId] = useState<string>() */

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
            <div>
                { 
                products?    
                    products.map((product, i) => {
                        return(
                            <div> 
                            <p>{product.data.name}</p>
                            <p>{product.data.price}</p>
                            </div>
                            )
                    })
                    :
                    <p>Något fel inträffade.. det finns inga företag att hämta</p>
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

