import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../../context/firebaseContext';
import Button from '../../button';


type Alternatives = "show" | "edit"

export default function DashForCompanyProducts() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const [productAlternativ, setProductAlternativ] = useState<Alternatives>("show")

    useEffect(() => {
        console.log(productAlternativ)
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
                   
                   <div id="dashShowProducts">
                        SHOW PRODUCTS
                    </div>

                    :

                    productAlternativ === "edit"?
                      
                        <div id="dashEditProducts">
                            EDIT PRODUCTS
                        </div>
                   
                    :
                    
                    null
            }
        </div>
    );  
}

const dashProductsStyle = {
    width: "100%",
    height: "90%",
    padding: "1em",
    display: "flex"
}