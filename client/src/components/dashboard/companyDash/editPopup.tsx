import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai';
import { Product } from '../../../models';
import ImgPreview from '../../functions/imgPreview';

type Props = {
    setEditPopupOpen: (bool: boolean) => void
    product: Product
}


export default function EditPopup(props: Props) {

    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [imgArr, setImgArr] = useState<any[] | undefined>(undefined) 
    const [info, setInfo] = useState<string>() 

    const updateName = (event: any) => {
        event? setName(event.target.value) : setName("")
    }

    const updatePrice = (event: any) => {
        event? setPrice(event.target.value) : setPrice(0) 
    }
    
    const updateQuantity = (event: any) => {
        event? setQuantity(event.target.value) : setQuantity(0) 
    }

    const updateInfo = (event: any) => {
        event? setInfo(event.target.value) : setInfo("") 
    }

    return (
        <div id="editPopupWrapper" onClick={() => props.setEditPopupOpen(false)} style={editPopupWrapperStyle}>
            <div id="editPopupContent" onClick={(event) => event.stopPropagation()} style={editPopupContentStyle}> 
                <AiOutlineClose style={{position: "absolute", right: 5, top: 5, cursor: "pointer"}} onClick={() => props.setEditPopupOpen(false)} size="2em" color="black" />
                <h1> PRODUKT NAMN </h1>
                <h4>EDIT</h4>
                <div id="editInputWrap" style={editInputWrapStyle}>

                    <input 
                        style={editProductInputStyle} 
                        placeholder={props.product.name} 
                        onChange={(event) => updateName(event)}
                    />

                    <input 
                        style={editProductInputStyle} 
                        placeholder={props.product.price.toString()} 
                        onChange={(event) => updatePrice(event)}
                    />

                    <input 
                        style={editProductInputStyle} 
                        placeholder={props.product.quantity?.toString()} 
                        onChange={(event) => updateQuantity(event)}
                    />

                    <textarea 
                        style={{...editProductInputStyle, resize: "none", height: "10vh"}} 
                        placeholder={props.product.info? props.product.info : "Info"}
                        onChange={(event) => updateInfo(event)}
                    />

                </div>
                {/*FIXME: Img buttons goes here. take "imgUploadInput" from "dashForCompanyAddProducts" and create new component. */}
                
                <div id="editSubmitWrap">

                </div>
            </div>

        </div>
    );
}

const editPopupWrapperStyle: CSSProperties = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "99",
    padding: "2em",
    justifyContent: "center",
    alignItems: "center"
}

const editPopupContentStyle: CSSProperties = {
    width: "50%",
    height: "70%",
    backgroundColor: "rgb(239, 225, 206)",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    
}

const editInputWrapStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: "0 2em",
    margin: "1em 0 0 0"
}

const editProductInputStyle: CSSProperties = {
    width: "100%",
    marginBottom: "1em",
    borderRadius: "10px",
    border: "none",
    padding: "0.5em",
    fontSize: "1.2em"
}
