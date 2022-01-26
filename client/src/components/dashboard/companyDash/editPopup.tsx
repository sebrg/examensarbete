import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai';
import { ProductContext, ProductOptions } from '../../../context/products/productContext';
import { Product } from '../../../models';
import ImgPreview from '../../functions/imgPreview';
import ImgUpload from '../../functions/imgUpload';
import SpinnerModal from '../../functions/spinnerModal';
import Button from '../../UI/button';

type Props = {
    setEditPopupOpen: (bool: boolean) => void
    product: Product
    getAndSetProducts: () => void
}


export default function EditPopup(props: Props) {

    const productContext: ProductOptions = useContext(ProductContext)


    const [imgArr, setImgArr] = useState<string[] | Blob[] | MediaSource[] | object[] /* | undefined */>(/* undefined */) //NOTE: any type, no good!
    const [name, setName] = useState<string | undefined>()
    const [price, setPrice] = useState<number | undefined>()
    const [quantity, setQuantity] = useState<number | undefined>()
    const [info, setInfo] = useState<string | undefined>() 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [statusMsg, setStatusMsg ] = useState<string | undefined>(undefined)
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
    
    const newProduct = () => {
        const product = {
            images: imgArr,
            name: name,
            price: price,
            id: props.product.id,
            info: info,
            quantity: quantity 
        } as Product
        
        return product
    }

    const oldProduct = () => {
        const product = {
            images: props.product.images,
            name: props.product.name,
            price: props.product.price,
            id: props.product.id,
            info: props.product.info,
            quantity: props.product.quantity 
        } as Product
        
        return product
    }

/*  NOTE: Maybe not needed   
    const syncImages = () => {
    setImgArr(props.product.images)
} */ 

    useEffect(() => {
        setImgArr(props.product.images)
    }, [])

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

                    <ImgUpload style={imgUploadWrappStyle} imgArr={imgArr} setImgArr={(newArr: string[] | Blob[] | MediaSource[] | object[] | undefined) => setImgArr(newArr)}/>
                
                </div>
                
                <div id="editSubmitWrap" style={editSubmitWrapStyle}>
                    <Button border='1px solid black' buttonText='Uppdatera' onClick={ async () => {
                        setIsLoading(true)
                        let result = await productContext.functions.updateProduct(oldProduct(), newProduct())
                        if(result.status) {
                            setStatusMsg(result.message)
                            setTimeout(() => {
                                if(result.status === 200) {
                                    props.getAndSetProducts()
                                    props.setEditPopupOpen(false)
                                    setStatusMsg(undefined)
                                    setIsLoading(false)
                                } else {
                                    props.getAndSetProducts()
                                    setStatusMsg(undefined)
                                    setIsLoading(false)
                                }
                            }, 2000);
                        }

                    }}/>
                    
                    <Button border='1px solid black' buttonText='Ta bort' onClick={ async () => {
                        setIsLoading(true)
                        const result = await productContext.functions.deleteProduct(props.product)
                        if(result.status = 200) {
                            setStatusMsg(result.message)
                            setTimeout(() => {
                                props.getAndSetProducts()
                                props.setEditPopupOpen(false)
                                setStatusMsg(undefined)
                                setIsLoading(false)
                            }, 2000);
                        } else {

                        }
                        
                      
                    }}/>
                </div>
                {isLoading? 
                    <SpinnerModal fullScreen={true} message={statusMsg} />
                    : null
                }

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
    height: "80%",
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
    margin: "1em 0 2em 0"
}

const editProductInputStyle: CSSProperties = {
    width: "100%",
    marginBottom: "1em",
    borderRadius: "10px",
    border: "none",
    padding: "0.5em",
    fontSize: "1.2em"
}

const imgUploadWrappStyle: CSSProperties = {
    width: "100%",
    height: "10vh",
    display: "flex",    
}

const editSubmitWrapStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    padding: "0 2em",
    justifyContent: "space-between"
}