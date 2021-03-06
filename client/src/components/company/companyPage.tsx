import { limit } from 'firebase/firestore';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { ProductContext, ProductOptions } from "../../context/products/productContext";
import ProductCard from '../UI/productCard';
import { Product } from '../../models'
import AddToCartBtn from '../cart/addToCartBtn';
import { Helmet } from 'react-helmet-async';


export default function CompanyPage() {

    const productContext: ProductOptions = useContext(ProductContext)
    const [products, setProducts] = useState<Product[]>()


    
    const params = useMatch("/company/:companyName/:companyId")?.params;
    const companyName = params?.companyName
    const companyId = params?.companyId

    const getProducts = async () => {
        if(companyId && companyId !== undefined) {
            const products = await productContext.functions.getProducts("products", "company", "==", companyId, limit(1000))
            setProducts(products) 
        }
    }
   
    function renderProducts() {
        return ( 
            <div className='produtWrapper noScrollBar' style={coPage}>
                { 
                products?    
                    products.map((product, i) => {
                        return(
                            <ProductCard key={i} 
                                bgColor='#EFE1CE'
                                product={product as Product} 
                                direction="column"
                                width='20vw'
                                linkTo={`/company/${companyName}/${companyId}/product/${product.name}/${product.id}`} //NOTE: maybe use replace on blank spaces
                                minWidth='250px'
                                //imgWidth='100%'
                                //imgHeight='auto'
                            >   
                              
                                <AddToCartBtn product={product}/>  

                            </ProductCard>
                        )
                    })
                    :
                    <p>H??mtar produkter..</p>
                } 
            </div>
        )
    }
    
    useEffect(() => {
        getProducts()
    }, [])

    /* useEffect(() => {
    
    }, [products]) */

    return (
        <div id="companyPageWrapper" className='noScrollBar' style={companyPageWrapper}>

            <Helmet>
                <title>{`Marung - ${companyName}`}</title>
            </Helmet>

            <div id="companyPageHeader" style={companyPageHeader}> 
                <h3>
                    {companyName}
                </h3>
            </div>


            {renderProducts()}

        </div>
   
    );    
}

const companyPageHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%", 
    //height: "10%",
    backgroundColor: '#92A8D1',
    fontSize: '1.5em',
    color: 'white',
    borderBottom: "1px solid black",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    position: "sticky",
    top: 0
}

const coPage: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //alignItems: 'center',
    width: '100%', 
    flexWrap: "wrap",
    padding: "1em"
}

const companyPageWrapper: CSSProperties = {
    height: '100%',
    overflow: "auto",


}