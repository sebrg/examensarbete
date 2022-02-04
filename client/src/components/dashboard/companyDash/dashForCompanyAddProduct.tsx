import { CSSProperties, useContext, useEffect, useState } from "react";
import Button from "../../UI/button";
import { ProductContext, ProductOptions } from '../../../context/products/productContext';
import ImgUpload from "../../functions/imgUpload";
import SpinnerModal from "../../functions/spinnerModal";
import { Product } from "../../../types";

/* type Props = {
    getAndSetProducts: () => void
} */
export default function DashForCompanyAddProducts(/* props: Props */) {

    const productContext: ProductOptions = useContext(ProductContext)
   
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState<string>("Övrigt")
    const [imgArr, setImgArr] = useState<string[] | Blob[] | MediaSource[] | object[] | undefined>(undefined) //NOTE: any type, no good!
    const [loading, setIsLoading] =  useState<boolean>(false)
    const [statusMsg, setStatusMsg] = useState<string | undefined>(undefined)
    const [productCategories, setProductCategories] = useState<string[]>()

    const updateName = (event: any) => {
        event? setName(event.target.value) : setName("")
    }

    const updatePrice = (event: any) => {
        event? setPrice(event.target.value) : setPrice(0) //NOTE: is 0 really a good fallback?
    }
    
    const updateQuantity = (event: any) => {
        event? setQuantity(event.target.value) : setQuantity(0) //NOTE: is 0 really a good fallback?
    }

    const updateCategory = (event: any) => {
        event? setSelectedCategory(event.target.value) : setSelectedCategory("Övrigt")
    }
    



    const addProductAndSetLoading = ( async () => {
        setIsLoading(true)
        const status = await productContext.functions.addProduct({name: name, price: price, images: imgArr, quantity: quantity, category: selectedCategory} as Product)
        //const status = await Promise.all([addProductAndGetStatus]) 
        if(status) {
            setStatusMsg(status.message) 
            setTimeout(() => {
                setIsLoading(false) 
                setStatusMsg(undefined)
            }, 2000);
        }
    })

    const getProductCategories = async () => {
        const categories = await productContext.functions.getProductCategories()
        setProductCategories(categories[0].categories)
    }

    
    //FIXME: listen to status message, and update products and close popup when msg is ok
    useEffect(() => {

    }, [statusMsg])

    useEffect(() => {
        getProductCategories()
    }, [])

    useEffect(() => {

    }, [productCategories])

    useEffect(() => {
        
    }, [selectedCategory])

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
                <select value={selectedCategory} onChange={(event) => updateCategory(event)} id="product-select" style={{width: '100%', textAlign: 'center', minHeight: '30px', marginBottom: '1em', fontSize: "1.2em", padding: "0.5em"}}>
                    {productCategories?
                        productCategories.map((category, key) => {
                            return (
                                <option key={key} value={category}> {category} </option>
                            )
                        })
                        : null
                    }      
                </select>
                
                


            
                <ImgUpload style={uploadWrappStyle} imgArr={imgArr} setImgArr={(newArr: string[] | Blob[] | MediaSource[] | object[] | undefined) => setImgArr(newArr)}/>
                
                {/* {statusMsg !== undefined?
                    <p style={{marginTop: "1em", fontSize: "2em"}}>{statusMsg}</p>
                    : null
                } */}

                <div style={{marginTop: "1.5em", width: "50%"}}>
                    <Button 
                        border='1px solid black'
                        buttonText='Add product'
                        width="100%" 
                        onClick={ () => {
                            
                            addProductAndSetLoading();
                            // FIXME: add update product
                    
                        }}
                    />
                </div>

                {loading? 
                    <SpinnerModal fullScreen={true} message={statusMsg} />
                    : null
                }

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

