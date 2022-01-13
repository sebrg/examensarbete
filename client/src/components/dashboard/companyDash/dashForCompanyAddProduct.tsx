import { CSSProperties, useContext, useEffect, useState } from "react";
import { FirebaseContext, FirebaseOptions } from "../../../context/firebaseContext";
import { Product } from "../../../models";
import ImgPreview from "../../functions/imgPreview";
import Button from "../../UI/button";
import { AiOutlineFileAdd } from 'react-icons/ai';

export default function DashForCompanyAddProducts(/* props: Props */) {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
   
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [imgArr, setImgArr] = useState<any[] | undefined>(undefined) //NOTE: any type, no good!

    const updateName = (event: any) => {
        event? setName(event.target.value) : setName("")
    }

    const updatePrice = (event: any) => {
        event? setPrice(event.target.value) : setPrice(0) //FIXME: is 0 really a good fallback?
    }

    const updateProductImg = (event: any) => {
        console.log("running updateProductImg function")
        let arr: any[] = []
        if(imgArr) {
            arr = [...imgArr]
        }
        let files = Object.values(event.target.files)
        files.forEach((file: any) => {
            arr.push(file)
        })        
        setImgArr(arr)
    }

    const removeImgFromArr = (img: any) => { 
        if(imgArr && imgArr.length > 1) {
            let originalArray = [...imgArr]
            let filteredArray = originalArray.filter(i => i.name !== img.name)
            setImgArr(filteredArray)
        }
        else {
            setImgArr(undefined)
        }
        
        
    }
    


    useEffect(() => {
        console.log("arr in state: ", imgArr)
    }, [imgArr])


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
                onChange={(event) => updatePrice(event)}
            />


            <div id="imgUploadInput" style={uploadWrappStyle}>

                <label style={{position: "relative", minWidth: "20%", height: "100%"}}>
                    <div style={uploadBtn}>
                        <AiOutlineFileAdd fontSize={"4em"}/>
                    </div>
                    <input 
                        style={uploadInputStyle}
                        //placeholder='Ladda upp bild'
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(event) => updateProductImg(event)}
                    />
                </label>

                <ImgPreview imgArr={imgArr} removeFunc={removeImgFromArr} />
            </div>

        

    

            <div style={{marginTop: "auto", width: "50%"}}>
                <Button 
                    buttonText='Add product'
                    width="100%" 
                    onClick={() => {
                        fbFuncs.addProduct(new Product(name, price, imgArr))
                        //getProducts()
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

const uploadInputStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    width: "100%",
    cursor: "pointer",

}

const uploadBtn: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgb(146 209 170)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    
}

const uploadWrappStyle: CSSProperties = {
    width: "100%",
    height: "20%",
    display: "flex",
    
}