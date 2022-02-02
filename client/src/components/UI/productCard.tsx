import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { Product } from '../../models'

type Props = {
    product: Product
    direction: "column" | "row"
    bgColor?: string
    width?: string
    minWidth?: string
    height?: string
    linkTo?: any
    companyId?: string
    productId?: string
    onClick?: any
    id?: string
    displayProductInfo?: boolean
    children?: JSX.Element
    border?: string
}

export default function ProductCard(props: Props) {

    let currency = "kr"
    
    return (
        props.linkTo?
            <div className='productCardWrapper' style={{...productCardWrapperStyle, width: props.width, minWidth: props.minWidth, height: props.height, flexDirection: props.direction, backgroundColor: props.bgColor, border: props.border? props.border : "1px solid black"}}>
                <div className='productCardImgWrapper' style={props.direction == "row"? productCardImgWrapperRowStyle : productCardImgWrapperColumnStyle }>
                 {   <Link style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} to={props.linkTo}> 
                        <img style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} src={props.product.images[0]}/>
                    </Link>}
                </div>
                <div className='productInfoWrapper' style={props.direction == "row"? productInfoWrapperRowStyle : productInfoWrapperColumnStyle }>
                    <div>
                        <p style={{fontSize: "1.5em", textAlign: "center"}}> 
                            {props.product.name}
                        </p>



                        {/* FIXME: add quantity OR instock */}
                        {props.product.quantity?
                            <p style={{/* padding: "0 0 0 1em" */textAlign: "center"}}>
                                {props.product.quantity} i lager
                            </p> 
                            : null
                        }
                    </div>

                    <div /* style={{margin: "0 0 0 1em"}} */>
                        <p style={{fontSize: "1.5em", textAlign: "center"}}> 
                            Pris: 
                        </p>
                        <p style={{/* padding: "0 0 0 0.5em", */ textAlign: "center"}}>
                            {props.product.price + " " + currency}
                        </p>
                        
                    </div>

                </div>
                {props.children}
            </div>

            :

            <div className='productCardWrapper' style={{...productCardWrapperStyle, width: props.width, height: props.height, flexDirection: props.direction, backgroundColor: props.bgColor,  border: props.border? props.border : "1px solid black"}}>
                <div className='productCardImgWrapper' style={props.direction == "row"? productCardImgWrapperRowStyle : productCardImgWrapperColumnStyle }>
                    <div style={{justifyContent: "center", width: "100%", height: "100%", display: "flex", alignItems: "center"}}> 
                        <img style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} src={props.product.images[0]}/>
                    </div>
                </div>
                <div className='productInfoWrapper' style={props.direction == "row"? productInfoWrapperRowStyle : productInfoWrapperColumnStyle }>
{/*                     {props.product.info? <p>{props.product.info}</p> : null}
 */}                    
                    <div>
                        <p style={{fontSize: "1.5em", textAlign: "center"}}> 
                            {props.product.name}
                        </p>
                        <p style={{/* padding: "0 0 0 1em" */textAlign: "center"}}>
                            {props.product.quantity} i lager
                        </p> 
                        
                    </div>

                    <div /* style={{margin: "0 0 0 1em"}} */>
                        <p style={{fontSize: "1.5em", textAlign: "center"}}> 
                            Pris: 
                        </p>
                        <p style={{/* padding: "0 0 0 0.5em", */ textAlign: "center"}}>
                            {props.product.price + " " + currency}
                        </p>
                        
                    </div>

                </div>
                {props.children}
            </div>
            
    )
}


const productCardWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //border: '1px solid gray',
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
    //flexGrow: 10,
    display: "flex",
    //justifyContent: "space-around",
    //alignItems: "center"
    flexDirection: "column",
}

//IMG COLUMM
const productCardImgWrapperColumnStyle: CSSProperties = {
    backgroundColor: "red",
    width: "100%",
    height: "30vh",
    background: "lightgray",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
}

//INFO COLUMN
const productInfoWrapperColumnStyle: CSSProperties = {
    width: "100%",    
}