import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';
import { Product } from "../../../models"
import { DocumentData } from 'firebase/firestore';
import DashForCompanyAddProducts from './dashForCompanyAddProduct';

type Alternatives = "show" | "add"

export default function DashForCompanyProducts() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const [productAlternativ, setProductAlternativ] = useState<Alternatives>("show")
    
    const [products, setProducts] = useState<DocumentData[]>()

    const getProducts = async () => {
        const currentUserCompany = await fbFuncs.getCurrentUserCompany()
        const products = await fbFuncs.getProductsFromCompany(currentUserCompany[0].id)
        setProducts(products)
    }

    const renderProducts = () => { //FIXME: make this div returned to a component
        return products?.map((product, index) => {
            return (
                <div key={index}>
                    <p>{product.data.name}</p>
                    <p>{product.data.price}</p>
                </div>
            )
        })
    }

    useEffect(() => {
        getProducts()
    }, [])



    return (
        <div id="dashProducts" style={dashProductsStyle}>
            <div id="dashProductsBtnDiv" style={{width: "30%"}}>
                <Button 
                    margin='0 0 0.5em 0' 
                    /* width="30%" */ 
                    buttonText='See all products' 
                    bgColor={productAlternativ === "show"? "pink" : ""}
                    onClick={() => setProductAlternativ('show')} 
                    
                />

                <Button 
                    onClick={() => setProductAlternativ('add')} 
                    margin='0 0 0.5em 0' 
                    /* width="30%"  */
                    buttonText='Add/edit product'
                    bgColor={productAlternativ === "add"? "pink" : ""}

                />
            </div>

            {
                productAlternativ === "show"? 
                   
                    <div id="dashShowProducts" style={dashShowProductsStyle}>
                        SHOW PRODUCTS
                        { renderProducts() }
                    </div>

                    :

                productAlternativ === "add"?
                    
                    <DashForCompanyAddProducts />
                
                    :
                
                    null
            }
        </div>
    );  
}

const dashProductsStyle: CSSProperties = {
    width: "100%",
    height: "90%",
    padding: "1em",
    display: "flex"
}


const dashShowProductsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "70%",
}
