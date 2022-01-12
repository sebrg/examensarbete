import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import Button from './button'



type Props = {
    ProductInfo?: string
    productTitle: string
    productPrice: string
    productImgUrl?: string
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
    displayProductInfo?: string
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

                <Link style={imgFrame} to={props.linkTo}> <img style={{width: props.imgWidth, height: props.imgHeight}} src={props.productImgUrl} alt="" /></Link>
                <div style={cardFrame}> 
                    <p style={{display: props.displayProductInfo}}> {props.ProductInfo} product info goes here</p>
                    <h3>{props.productTitle}</h3>
                    <h4> {props.productPrice + ' ' + 'kr'} </h4>
                </div> 
                    <Button width='100%' buttonText='Lägg till i kundvagn' bgColor='#98DDDE'/>  
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
                <img style={{...img, width: props.imgWidth, height: props.imgHeight}} src={props.productImgUrl} alt="" />
                <div style={cardFrame}> 
                    <p> {props.ProductInfo} product info goes here</p>
                    <h3>{props.productTitle}</h3>
                    <h4> {props.productPrice + ' ' + 'kr'} </h4>
                    <Button width='100%' buttonText='Lägg till i kundvagn' bgColor='#98DDDE'/>  
                </div> 
            </div>
            
    );
}


const prodCard: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
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
    backgroundColor: 'lightgray',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
}

const img: CSSProperties = {
    objectFit: 'cover'
}

