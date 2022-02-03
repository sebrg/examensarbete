import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import { FbQuery, Order } from '../../types';
import { documentId } from 'firebase/firestore';

//FIXME: fix styling and closing function. event.propago....





type Props = {
    order: Order | null
}


export default function FoldableOrderCard(props: Props) {
    
    const companyContext: CompanyOptions = useContext(CompanyContext)

    const [companyName, setCompanyName] = useState<string>()

    const [open, setOpen] = useState<boolean>(false)

    const getCompanyName = async (id: string) => { //FIXME: This one should not be neccessary. Get company name in "order" in DB.

        const q: FbQuery = {
            fieldPath: documentId(),
            opStr: "==",
            value: id
        } 

        const company = await companyContext.getCompany("companies", q)
        setCompanyName(company[0].name)
    }

    useEffect(() => {
        if(props.order) {
            getCompanyName(props.order?.companyId)
        }
    }, [props.order])

    return (
        <div className='foldableOrderCard' style={open? foldableCompanyCardOpen : foldableCompanyCardClosed}  onClick={open? (event) => event.stopPropagation() : () => setOpen(!open)}>
            <div className='foldCardHeader' style={foldCardHeader} onClick={() => setOpen(!open)}>
                <h1 style={{fontSize: "1.5em", marginTop: "auto", marginBottom: "auto"}}>{props.order?.orderDate} </h1>
                <p style={{display: "flex", alignItems: "center"}}>Order</p>
                {open? 
                    <BsFillArrowUpCircleFill style={{color: "white", fontSize: "2rem", position: "absolute", /* top: 0, */ right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                    :
                    <BsFillArrowDownCircleFill style={{color: "white", fontSize: "2rem", position: "absolute", /* top: 0, */ right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                }
            </div>
            {open? 
                <div className="foldableCardContent noScrollBar" style={open? foldableCardContentOpen : foldableCardContentClosed}>
                
                        
                    <div className='orderProductWrapper' style={{backgroundColor: "lightgray", borderRadius: "10px", padding: "1em", width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {props.order?.products.map((product, key) => {
                            return (
                                <div key={key} className='orderProduct' style={{color: "black", backgroundColor: "rgb(221 221 221)", padding: "0.5em", borderRadius: "10px", minWidth: "250px", maxWidth: "500px", /* width: "30%", */ flexGrow: "1", display: "flex", flexWrap: "wrap", justifyContent: "space-between", margin: "1em"}}>
                                    
                                    <div style={{}}>
                                        <p style={{fontSize: "1em"}}>Namn: </p>
                                        <p style={{fontSize: "1.2em"}}>{product.name}</p>
                                    </div>
                                    <div>
                                        <p style={{fontSize: "1em"}}>Pris: </p>
                                        <p style={{fontSize: "1.2em"}}>{product.unitPrice} st</p>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", fontSize: "1.5em"}}>
                                        <p style={{fontSize: "1em"}}>{"x" + product.quantity} </p>
                                    </div>

                                </div>
                            )
                        })}        
                        <div className={"orderProductInfo"} style={{display: "flex", width: "100%", justifyContent: "space-between", marginTop: "1em", fontSize: "1.5em", flexWrap: "wrap"}}>
                            <p style={{width: "50%"}}>{"Köpt av: " + companyName}</p>
                            <p style={{width: "50%"}}>{"Totalpris: " + props.order?.totalPrice + " SEK"}</p>
                            {
                                props.order && props.order.shipped === "Yes"? 
                                    <p className='orderSentStatus' style={{margin: "1em 0 0 0", textAlign: "center", width: "100%", color: 'green', /* marginLeft: '1em' */}}>Skickad</p>
                                    :
                                    <p className='orderSentStatus' style={{margin: "1em 0 0 0", textAlign: "center", width: "100%", color: 'red', /* marginLeft: '1em' */}}>Ej skickad</p>
                            }
                        </div>
                    </div>
                        
                 
                </div>
                   
  

            
            : null}
            
        </div>
    )
}

const orderDiv: CSSProperties = {

}

const foldableCompanyCardOpen: CSSProperties = {
    display: "flex",
    flexDirection: "column",  
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    padding: "0.5em 0.5em 0em 0.5em",
    width: "100%",
    //height: "100%",
    marginBottom: "1em",
    
}

const foldableCompanyCardClosed: CSSProperties = {
    display: "flex", 
    flexDirection: "column",  
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    padding: "0 0.5em",
    width: "100%",
    height: "10%",
    cursor: "pointer",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: "1em",
}

const foldCardHeader: CSSProperties = {
    display: "flex", 
    width: "100%", 
    maxHeight: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
    padding: "0 5em 0 0",
    cursor: "pointer",
}

const foldableCardContentOpen: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "80%",
    padding: "1em",
    alignContent: "flex-start",
    overflow: "scroll",
    width: "100%"
}

const foldableCardContentClosed: CSSProperties = {
}
    

/*     <div key={i} style={{display: "flex", flexGrow: 1, flexDirection: "column", borderRadius: "10px", padding: "0.5em", margin: "0 1em 1em 1em"}}>
    <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}>
        {data.title}
    </p>
    <div style={{fontSize: "1.2em", minWidth: "300px"}}>
        {data.info}
    </div>
</div>  */







 
/*                 return (
                    <div key={i} id="foldableCompanyCard" className='foldableCompanyCard' style={open? foldableCompanyCardOpen : foldableCompanyCardClosed}  onClick={open? (event) => event.stopPropagation() : () => setOpen(!open)}>
                        <div className='foldCardHeader' style={foldCardHeader}>
                        <h1 style={{fontSize: "1.5em", marginTop: "auto", marginBottom: "auto"}}> Order </h1>
                        <p style={{display: "flex", alignItems: "center"}}> {data.orderDate} </p>
                        {open? 
                            <BsFillArrowUpCircleFill style={{fontSize: "2rem", position: "absolute", right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                            :
                            <BsFillArrowDownCircleFill style={{fontSize: "2rem", position: "absolute", right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                        }
                        </div>
                        {open? 
                            <div className="foldableCardContent noScrollBar" style={open? foldableCardContentOpen : foldableCardContentClosed}>
                                {data.products.map((product, i) => {
                                    return (  
                                        <div key={i} style={{display: "flex", flexGrow: 1, flexDirection: "row", backgroundColor: "lightgray", borderRadius: "10px", padding: "0.5em", margin: "0 1em 1em 1em", flexWrap: "wrap"}}>
                                            <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> {product.name}</p>
                                            <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Kvantitet: {product.quantity} </p>
                                            <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Pris: {product.unitPrice}kr/st </p>                                          
                                        </div>
                                    )
                                        
                                })}
                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Köpt av: UF namn</p>
                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> </p>
                                <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}> Totalpris: {data.totalPrice} {data.currency} </p>
                        </div>
                    :
                    null
                
                </div> */

                        
    

