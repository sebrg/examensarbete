import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { Product } from '../../models'
import CartProductController from '../cart/cartProductController';

type Props = {
    product: Product
    linkTo: string
    children?: JSX.Element

}

export default function CartProductCard(props: Props) {

    
    return (
        <div className='productCardWrapper' style={productCardWrapper}>
            <Link to={props.linkTo}> 
                <div id="cartProductCardImgWrapp" style={cartProductCardImgWrapp}>
                    <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={props.product.images[0]} alt='produktbild'/>
                </div>
            </Link> 

            <div id="cartProductCardInfoWrapp" style={cartProductCardInfoWrapp}>
                <p style={{...infoParagraph, fontSize: "1.5em", textAlign: "center"}}>{props.product.name}</p>
                <p style={{...infoParagraph, margin: "0 0 0 0.5em"}}>{props.product.price}kr /st</p>
            </div>
            {props.children}
        </div>
    )
}

const productCardWrapper: CSSProperties = {
    height: "10vh",
    display: "flex",
    width: "100%",
    borderBottom: "2px solid black",
    borderRight: "2px solid black",
    borderRadius: "10px",
    padding: "0.5em",
    margin: "0 0 1.5em 0"
}

const cartProductCardImgWrapp: CSSProperties = {
    display: "flex",
    height: "100%"
}

const cartProductCardInfoWrapp: CSSProperties = {
    display: "flex",
    alignItems: "center"
}

const infoParagraph: CSSProperties = {
}