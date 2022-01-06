import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../../context/firebaseContext';
import Button from '../../button';
import { Product } from "../../../../models"
import { DocumentData } from 'firebase/firestore';

type Alternatives = "show" | "edit"

export default function DashForCompanyProducts() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const [productAlternativ, setProductAlternativ] = useState<Alternatives>("show")
    
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [products, setProducts] = useState<DocumentData[]>()

    const updateName = (event: any) => {
        event? setName(event.target.value) : setName("")
    }

    const updatePrice = (event: any) => {
        event? setPrice(event.target.value) : setPrice(0) //FIXME: is 0 really a good fallback?
    }

    const getProducts = async () => {
        const products = await fbFuncs.getProductsFromCurrentUserCompany()
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
                    onClick={() => setProductAlternativ('edit')} 
                    margin='0 0 0.5em 0' 
                    /* width="30%"  */
                    buttonText='Add/edit product'
                    bgColor={productAlternativ === "edit"? "pink" : ""}

                />
            </div>

            {
                productAlternativ === "show"? 
                   
                   <div id="dashShowProducts" style={dashShowProductsStyle}>
                        SHOW PRODUCTS
                        { renderProducts() }
                    </div>

                    :

                    productAlternativ === "edit"?
                      
                        <div id="dashEditProducts" style={dashEditProductsStyle}>
                            <input 
                                style={addProductInputStyle} 
                                placeholder='Product name' 
                                onChange={(event) => updateName(event)}
                            />
                            <input 
                                style={addProductInputStyle} 
                                placeholder='Product price'
                                onChange={(event) => updatePrice(event)}
                            />
                            <div>
                                <Button 
                                    buttonText='Add product' 
                                    onClick={() => {
                                        fbFuncs.addProduct(new Product(name, price))
                                        getProducts()
                                    }}
                                />
                            </div>
                        </div>
                   
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

const dashEditProductsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center"

}

const dashShowProductsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
}

const addProductInputStyle: CSSProperties = {
    width: "70%",
    fontSize: "1.2em",
    padding: "0.5em",
    marginBottom: "0.5em"
}