import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import Button from './button'
import AddToCartBtn from '../cart/addToCartBtn';
import { Product } from '../../models'
import { DocumentData } from 'firebase/firestore';



type Props = {
    product: Product
    direction: "column" | "row"
    bgColor?: string
    width?: string
    height?: string
    linkTo?: any
    companyId?: string
    productId?: string
    onClick?: any
    id?: string
    displayProductInfo?: boolean
    children?: JSX.Element
}


export default function ProductCard(props: Props) {

    let currency = "kr"
    
    return (
        props.linkTo?
            <div className='productCardWrapper' style={{...productCardWrapperStyle, width: props.width, height: props.height, flexDirection: props.direction, backgroundColor: props.bgColor}}>
                <div className='productCardImgWrapper' style={props.direction == "row"? productCardImgWrapperRowStyle : productCardImgWrapperColumnStyle }>
                 {   <Link style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}} to={props.linkTo}> 
                        <img style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} src={props.product.images[0]}/>
                    </Link>}
                </div>
                <div className='productInfoWrapper' style={props.direction == "row"? productInfoWrapperRowStyle : productInfoWrapperColumnStyle }>
                    {props.product.info? <p>{props.product.info}</p> : null}
                    <h3 style={{flexGrow: 1, textAlign: "center"}}>
                        {props.product.name}
                    </h3>

                    <h4 style={{flexGrow: 1, textAlign: "center"}}>
                        {props.product.price + " " + currency}
                    </h4>
                </div>
                {props.children}
            </div>

            :

            <div className='productCardWrapper' style={{...productCardWrapperStyle, width: props.width, height: props.height, flexDirection: props.direction, backgroundColor: props.bgColor}}>
                <div className='productCardImgWrapper' style={props.direction == "row"? productCardImgWrapperRowStyle : productCardImgWrapperColumnStyle }>
                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}> 
                        <img style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} src={props.product.images[0]}/>
                    </div>
                </div>
                <div className='productInfoWrapper' style={props.direction == "row"? productInfoWrapperRowStyle : productInfoWrapperColumnStyle }>
                    {props.product.info? <p>{props.product.info}</p> : null}
                    <h3 style={{flexGrow: 1, textAlign: "center"}}>
                        {props.product.name}
                    </h3>

                    <h4 style={{flexGrow: 1, textAlign: "center"}}>
                        {props.product.price + " " + currency}
                    </h4>
                </div>
                {props.children}
            </div>
            
    )
}


const productCardWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: "10px",
    marginBottom: "1em",
    padding: '0.5em',
    minHeight: "55px",
}

//IMG ROW
const productCardImgWrapperRowStyle: CSSProperties = {
    width: "20%",
    height: "100%",

}

//INFO ROW
const productInfoWrapperRowStyle: CSSProperties = {
    flexGrow: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}

//IMG COLUMM
const productCardImgWrapperColumnStyle: CSSProperties = {
    backgroundColor: "red",
    width: "100%",
    height: "30vh",
    background: "lightgray",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px"
}

//INFO COLUMN
const productInfoWrapperColumnStyle: CSSProperties = {
    width: "100%"
}