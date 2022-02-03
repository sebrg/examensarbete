import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { Product } from '../../models'
import CartProductController from '../cart/cartProductController';

type Props = {
    product: Product
    children?: JSX.Element

}

export default function DashProductCard(props: Props) {

    
    return (
        <div className='dashCardWrapper' style={productCardWrapper}>
                <div id="dashProductCardImgWrapp" style={cartProductCardImgWrapp}>
                    <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={props.product.images[0]} alt='produkt'/>
                </div>

            <div id="dashProductCardNameAndPrice" style={dashProductCardInfoWrapp}>
                <div style={{height: "100%", display: "flex", alignItems: "center"}}>
                    <p style={{...infoParagraph, fontSize: "2em"}}>{props.product.name}</p>
                </div>

                <div style={{height: "100%"}}>
                    <p style={{...infoParagraph, top: 0, margin: "0 0 0 0.5em"}}>{props.product.quantity} i lager</p>
                </div>

                <div style={{height: "100%", display: "flex", alignItems: "center", marginLeft: "auto"}}>
                    <p style={{...infoParagraph, fontSize: "1.5em", textAlign: "center"}}>{props.product.price}kr /st</p>
                </div>
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
    margin: "0 0 1.5em 0",
}

const cartProductCardImgWrapp: CSSProperties = {
    display: "flex",
    height: "100%",
    minWidth: "53px"
}

const dashProductCardInfoWrapp: CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 0.5em 0 0"
}

/* const cartProductCardInfoWrapp: CSSProperties = {
    display: "flex",
    alignItems: "center",
    margin: "0 0 0 2em"
} */

const infoParagraph: CSSProperties = {
}