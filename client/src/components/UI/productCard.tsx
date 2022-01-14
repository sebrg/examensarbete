import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import Button from './button'
import AddToCartBtn from '../cart/addToCartBtn';
import { Product } from '../../models'
import { DocumentData } from 'firebase/firestore';



type Props = {
    product: Product
    bgColor?: string
    width?: string
    height?: string
    linkTo?: any
    companyId?: string
    productId?: string
    onClick?: any
    id?: string
    imgHeight?: string
    imgWidth?: string
    displayProductInfo?: boolean
    children?: JSX.Element
}


export default function ProductCard(props: Props) {

    
    return (
        props.linkTo?
            <div 
                    className="" 
                    id={props.id} 
                    onClick={props.onClick} 
                    style={{
                        ...prodCard,
                        background: props.bgColor, 
                        width: props.width,
                        height: props.height
                    }}
                >

                <Link style={imgFrame} to={props.linkTo}> 
                    <img style={{...img, width: props.imgWidth, height: props.imgHeight}} src={props.product.images[0]} alt="" />
                </Link>
                <div style={cardFrame}> 
                    {
                        props.displayProductInfo? 
                            <p> {/* {props.ProductInfo} */} product info goes here</p>
                            :
                            null
                    }
                    <h3>{props.product.name}</h3>
                    <h4> {props.product.price + ' ' + 'kr'} </h4>
                    {props.children}
                </div> 
                     
            </div>

            :

            <div 
                    className="" 
                    id={props.id} 
                    onClick={props.onClick} 
                    style={{
                        ...prodCard,
                        background: props.bgColor, 
                        width: props.width,
                        height: props.height
                    }}
                >
                <div style={imgFrame}>
                    <img style={{...img, width: props.imgWidth, height: props.imgHeight}} src={props.product.images[0]} alt="" />
                </div>
                <div style={cardFrame}> 
                    {
                        props.displayProductInfo? 
                            <p> {/* {props.ProductInfo} */} product info goes here</p>
                            :
                            null
                    }
                    <h3>{props.product.name}</h3>
                    <h4> {props.product.price + ' ' + 'kr'} </h4>
                    {props.children} 
                </div> 
            </div>
            
    );
}


const prodCard: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid gray',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    margin: '0.5em',
    padding: '0.2em',
    /* minHeight: '30vh' */
}

const cardFrame: CSSProperties = {
    width: '100%',
    height: '30%',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const imgFrame: CSSProperties = {
    width: '100%',
    height: '60%',
    display: "flex",
    backgroundColor: 'lightgray',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
}

const img: CSSProperties = {
    objectFit: 'contain',
    width: "100%",
    height: "100%"
}


