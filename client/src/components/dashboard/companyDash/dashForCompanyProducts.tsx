import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';
import { Product } from "../../../models"
import { DocumentData } from 'firebase/firestore';
import DashForCompanyAddProducts from './dashForCompanyAddProduct';
import { ProductContext, ProductOptions } from '../../../context/products/productContext';
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import ProductCard from '../../UI/productCard';
import EditPopup from './editPopup';

type Alternatives = "show" | "add"

export default function DashForCompanyProducts() {

    //const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const productContext: ProductOptions = useContext(ProductContext)
    const companyContext: CompanyOptions = useContext(CompanyContext)

    const [editPopupOpen, setEditPopupOpen] = useState<boolean>(false)
    const [productAlternativ, setProductAlternativ] = useState<Alternatives>("show")
    const [products, setProducts] = useState<Product[]>()
    const [editProductTarget, setEditProductTarget] = useState<Product>()

    const getProducts = async () => {
        const currentUserCompany = await companyContext.getCurrentUserCompany()
        const products = await productContext.functions.getProductsFromCompany(currentUserCompany[0].id as string)
        setProducts(products)
    }


    const renderProducts = () => { //FIXME: make this div returned to a component
        const findId = (product: Product) => { return products?.find((productInArray) => productInArray === product as Product) }
        return products?.map((product, index) => {
            return ( //Productcard with edit and delete button
                <ProductCard key={index} product={product} direction='row' height='12.5vh'>
                    <div style={{display: "flex"}}>
                        <Button buttonText='edit' onClick={() => {setEditProductTarget(findId(product)); setEditPopupOpen(!editPopupOpen)}} />
                        <Button buttonText='delete'/>
                    </div>
                </ProductCard>
            )
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        console.log("useEffect in dashforcompany: ", editProductTarget)
        
    }, [editProductTarget])

    useEffect(() => {
        console.log(products)
    }, [products])


    return (
        <div id="dashProducts" style={dashProductsStyle}>
            <div id="dashProductsBtnDiv" style={{width: "30%"}}>
                <Button 
                    margin='0 0 0.5em 0' 
                    /* width="30%" */ 
                    buttonText='See all products' 
                    bgColor={productAlternativ === "show"? "rgb(49, 52, 68)" : ""}
                    onClick={() => setProductAlternativ('show')} 
                    
                />

                <Button 
                    onClick={() => setProductAlternativ('add')} 
                    margin='0 0 0.5em 0' 
                    /* width="30%"  */
                    buttonText='Add/edit product'
                    bgColor={productAlternativ === "add"? "rgb(49, 52, 68)" : ""}

                />
            </div>

            {
                productAlternativ === "show"? 
                   
                    <div id="dashShowProducts" className='noScrollBar' style={dashShowProductsStyle}>
                        { renderProducts() }
                        { editPopupOpen?
                            <EditPopup product={editProductTarget as Product}setEditPopupOpen={(bool: boolean) => setEditPopupOpen(bool)} />
                            : null
                        }
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
    height: "85%",
    padding: "1em",
    display: "flex"
}


const dashShowProductsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    padding: "0 1em",
    overflow: "scroll"
}
