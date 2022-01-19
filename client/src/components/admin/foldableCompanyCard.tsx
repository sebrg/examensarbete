import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Company } from '../../models';
import Button from '../UI/button';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';

//FIXME: fix styling and closing function. event.propago....
type Props = {
    company: Company
    updateCompanies: () => void
}


export default function FoldableCompanyCard(props: Props) {
    
    const companyContext: CompanyOptions = useContext(CompanyContext)
    const [open, setOpen] = useState<boolean>(false)

    const foldableCardContentData = [
        {
            title: "kategori",
            info: props.company.category
        },
        {
            title: "Region",
            info: props.company.region
        },
        {
            title: "Skola",
            info: props.company.school
        },
        {
            title: "Email",
            info: "email@emailsson.se"
        },
        {
            title: "Namn",
            info: "För Efternamnsson"
        }


    ]

    return (
        <div id="foldableCompanyCard" className='foldableCompanyCard' style={open? foldableCompanyCardOpen : foldableCompanyCardClosed}  onClick={open? (event) => event.stopPropagation() : () => setOpen(!open)}>
                <div className='foldCardHeader' style={foldCardHeader}>
                    <h1 style={{fontSize: "1.5em", marginTop: "auto", marginBottom: "auto"}}>{props.company.name} </h1>
                    <p style={{display: "flex", alignItems: "center"}}>datum: 01/01/22</p>
                    {open? 
                        <BsFillArrowUpCircleFill style={{fontSize: "2rem", position: "absolute", /* top: 0, */ right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                        :
                        <BsFillArrowDownCircleFill style={{fontSize: "2rem", position: "absolute", /* top: 0, */ right: 0, cursor: "pointer"}} onClick={() => setOpen(!open)}/>
                    }
                </div>
                {open? 
                    <div className="foldableCardContent noScrollBar" style={open? foldableCardContentOpen : foldableCardContentClosed}>
                        {foldableCardContentData.map((data, i) => {
                            return (
                                <div key={i} style={{display: "flex", flexGrow: 1, flexDirection: "column", backgroundColor: "lightgray", borderRadius: "10px", padding: "0.5em", margin: "0 1em 1em 1em"}}>
                                    <p style={{fontSize: "1.3em", minWidth: "300px", marginBottom: "0.5em", textAlign: "center"}}>{data.title}</p>
                                    <div style={{fontSize: "1.2em", minWidth: "300px"}}>{data.info}</div>
                                </div>
                            )

                        })}
                        <div style={{display: "flex", width: "100%", marginTop: "0.5em"}}>
                            
                            <Button width='50%' buttonText='Godkänn' bgColor='#9cf99c' onClick={ async () => {
                                await Promise.all([companyContext.aproveCompany(props.company.id as string)]) // NOTE: might go bonkers if props.company.id !== string
                                props.updateCompanies()
                            }}/> 
                           
                            <Button width="50%" buttonText='Neka' bgColor='#ff555ced' onClick={ async () => {
                                await Promise.all([companyContext.removeCompany(props.company.id as string)]) // NOTE: might go bonkers if props.company.id !== string
                                props.updateCompanies()
                            }}/>

                        </div>
                 
                      

 

                    </div>
                    :
                    null
                }
                
        </div>
    );
}

const foldableCompanyCardOpen: CSSProperties = {
    display: "flex",
    flexDirection: "column",  
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    padding: "0.5em 0.5em 0em 0.5em",
    width: "100%",
    height: "100%",
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
}

const foldableCardContentOpen: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    height: "80%",
    padding: "1em",
    alignContent: "flex-start",
    justifyContent: "center",
    overflow: "scroll",

}

const foldableCardContentClosed: CSSProperties = {
}
