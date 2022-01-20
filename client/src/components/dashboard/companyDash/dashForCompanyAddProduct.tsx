import { CSSProperties, useContext, useEffect, useState } from "react";
import { Product } from "../../../models";
import ImgPreview from "../../functions/imgPreview";
import Button from "../../UI/button";
import { AiOutlineFileAdd } from 'react-icons/ai';
import { ProductContext, ProductOptions } from '../../../context/products/productContext';
import ImgUpload from "../../functions/imgUpload";

export default function DashForCompanyAddProducts(/* props: Props */) {

    const productContext: ProductOptions = useContext(ProductContext)
   
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [imgArr, setImgArr] = useState<string[] | Blob[] | MediaSource[] | object[] | undefined>(undefined) //NOTE: any type, no good!

    const updateName = (event: any) => {
        event? setName(event.target.value) : setName("")
    }

    const updatePrice = (event: any) => {
        event? setPrice(event.target.value) : setPrice(0) //NOTE: is 0 really a good fallback?
    }
    
    const updateQuantity = (event: any) => {
        event? setQuantity(event.target.value) : setQuantity(0) //NOTE: is 0 really a good fallback?
    }


/*     useEffect(() => {
        console.log("arr in state: ", imgArr)
    }, [imgArr]) */


    return (
		  
        <div id="dashAddProducts" style={dashAddProductsStyle}>
            <input 
                style={addProductInputStyle} 
                placeholder='Product name' 
                onChange={(event) => updateName(event)}
            />
            <input 
                style={addProductInputStyle} 
                placeholder='Product price'
                type="number"
                onChange={(event) => updatePrice(event)}
            />
            <input 
                style={addProductInputStyle} 
                placeholder='Quantity'
                type="number"
                onChange={(event) => updateQuantity(event)}
            />


        
            <ImgUpload style={uploadWrappStyle} imgArr={imgArr} setImgArr={(newArr: string[] | Blob[] | MediaSource[] | object[] | undefined) => setImgArr(newArr)}/>
    

            <div style={{marginTop: "auto", width: "50%"}}>
                <Button 
                    buttonText='Add product'
                    width="100%" 
                    onClick={() => {
                        productContext.functions.addProduct(new Product(name, price, imgArr, undefined, undefined, quantity))
                        //FIXME: Get all products after product added
                    }}
                />
            </div>
        </div>
    );
}

const dashAddProductsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    alignItems: "center",
    padding: "0 1em 1em 1em"

}


const addProductInputStyle: CSSProperties = {
    width: "100%",
    fontSize: "1.2em",
    padding: "0.5em",
    marginBottom: "0.5em"
}

const uploadWrappStyle: CSSProperties = {
    width: "100%",
    height: "20%",
    display: "flex",
    
}