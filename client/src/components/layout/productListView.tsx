import { CSSProperties, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ProductContext, ProductOptions } from "../../context/products/productContext";
import { Product } from "../../models";
import AddToCartBtn from "../cart/addToCartBtn";
import ProductCard from "../UI/productCard";

export default function ProductListView() {

    const productContext: ProductOptions = useContext(ProductContext)

    const [products, setProducts] = useState<Product[]>()
    const [selectedCategory, setSelectedCategory] = useState<string>("Alla")
    const [productCategories, setProductCategories] = useState<string[]>()

    const updateCategory = (event: any) => {
        event? setSelectedCategory(event.target.value) : setSelectedCategory("Alla")
    }

    const getProductCategories = async () => {
        const categories = await productContext.functions.getProductCategories()
        const clonedCategories = [...categories[0].categories]
        clonedCategories.push("Alla")

        setProductCategories(clonedCategories)
    }

    const getProducts = async () => {
        const getAllProducts = await productContext.functions.getAllProducts()
        setProducts(getAllProducts)  
    }

    useEffect(() => {
        getProductCategories()
        getProducts()
    }, [])

    
/*     useEffect(() => {
        console.log(products)
    }, [products])
 */
    

  
    return (
        <div id="productListViewWrapper" className="noScrollBar" style={{overflow: "auto", height: "100%"}}>

            <Helmet>
                <title>Marung - Produkter</title>
            </Helmet>

            <div className="contentHeader" style={contentHeader}> 
                <h3>
                    Produkter
                </h3>
            </div>

            <select id="categorySelect" className="removeInputOutline" value={selectedCategory} onChange={(event) => updateCategory(event)} style={categorySelect}>
                    {productCategories?
                        productCategories.map((category, i) => {
                            return (
                                <option key={i} value={category}> {category} </option>
                            )
                        })
                        : null
                    }      
            </select>

            <div id="productListProductWrapper" className="noScrollBar" style={productListProductWrapper}>
                {products?
                    products.map((product, key) => {
                        if(selectedCategory === "Alla") {
                            return (
                                <ProductCard key={key} direction="column" bgColor={"rgb(239, 225, 206)"} product={product} width="20vw" linkTo={`/company/${product.companyName.replace(" ", '').replace("-", "").replace("_", "")}/${product.company}/product/${product.name.replace(" ", '').replace("-", "").replace("_", "")}/${product.id}`}>
                                    <AddToCartBtn product={product}/>  
                                </ProductCard>
                            )
                        } else if(product.category == selectedCategory) {
                            return (
                                <ProductCard key={key} direction="column" bgColor={"rgb(239, 225, 206)"} product={product} width="20vw" linkTo={`/company/${product.companyName.replace(" ", '').replace("-", "").replace("_", "")}/${product.company}/product/${product.name.replace(" ", '').replace("-", "").replace("_", "")}/${product.id}`}>
                                    <AddToCartBtn product={product}/>  
                                </ProductCard>

                            )
                        }
              
                    })



                : null
                }
            </div>

            
        </div>
    );
}


const contentHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%", 
   // height: "10%",
    backgroundColor: '#92A8D1',
    fontSize: '1.5em',
    color: 'white',
    borderBottom: "1px solid black",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    position: "sticky",
    top: 0
}

const categorySelect: CSSProperties = {
    //width: '100%', 
    textAlign: 'center', 
    minHeight: '30px', 
    margin: '1em', 
    fontSize: "1.2em", 
    padding: "0.5em",
    borderRadius: "5px",
    backgroundColor: "rgb(146, 168, 209)",
    color: "white",
    //Add the two under to make category stick
    //position: "sticky",
    //top: "2.5em"


}

const productListProductWrapper: CSSProperties = {
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
}