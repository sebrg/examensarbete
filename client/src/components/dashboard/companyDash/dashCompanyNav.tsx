import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import Button from '../../UI/button';




export default function DashCompanyNav() {


    const params = useMatch("/myPages/:userId/:companyId/:currentPage")?.params;
    const currentPage = params?.currentPage
    const [page, setPage] = useState<"start" | "settings" | "products">(currentPage as "start" | "settings" | "products")

    const linkArray = [
        {
            text: "Start",
            linkTo: "start",
            
        },
        {
            text: "Inställningar",
            linkTo: "settings",

        }, 
        {
            text: "Produkter",
            linkTo: "products"
        },
        {
            text: 'Ordrar',
            linkTo: 'companyOrders'
        },
    ]



    useEffect(() => {
        if(currentPage !== undefined ) {
            setPage(currentPage as "start" | "settings" | "products")
        }
        else {
            setPage("start")
        }
    }, [currentPage])



    return (
        <nav id="dashCompanyNav" style={dashCompanyNavStyle}>
            {/* FIXME: work here! make conditional rendering for color & bg color */}
            {linkArray.map((link, key) => {
                if(link.linkTo === page ) {
                    if(link.linkTo === "start") {
                        return (
                            <Button 
                                key={key}
                                buttonText={link.text}
                                linkTo={" "}
                                border='2.5px solid white'
                                margin='0 0.5em 0 0'
                                color={"black"}
                                bgColor={"white"} 
                            />
                        )
                    } else {
                        return (
                            <Button 
                                key={key}
                                buttonText={link.text}
                                linkTo={link.linkTo}
                                border='2.5px solid white'
                                margin='0 0.5em 0 0'
                                color={"black"}
                                bgColor={"white"} 
                            />
                        )
                    }

                } else {
                    if(link.linkTo === "start") {
                        return (
                            <Button 
                                key={key}
                                buttonText={link.text}
                                linkTo={" "}
                                border='2.5px solid white'
                                margin='0 0.5em 0 0'
                            />
                        )
                    } else {
                        return (
                            <Button 
                                key={key}
                                buttonText={link.text}
                                linkTo={link.linkTo}
                                border='2.5px solid white'
                                margin='0 0.5em 0 0'
                            />
                        )
                    }
                }
            })}
            

        </nav>
    );
}

const dashCompanyNavStyle: CSSProperties = {
    width: "100%",
    height: "15%",
    backgroundColor: "rgb(131, 159, 105)",
    display: "flex",
    padding: "1em",
    borderBottom: "0.5em solid rgb(49, 52, 68)"


/*     borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px", */
    //boxShadow: "0 -30px 20px 10px black",
/*     boxShadow: "0 10px 10px -10px black",
    WebkitBoxShadow: "0 10px 10px -10px black", */
}