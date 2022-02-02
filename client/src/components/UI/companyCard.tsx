import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import AddToCartBtn from '../cart/addToCartBtn';
import { Product } from '../../models'
import { Company } from '../../types';
import { AiOutlineFileImage } from 'react-icons/ai';



type Props = {
    company: Company
}


export default function CompanyCard(props: Props) {

    
    return (
        <div id="companyCard" style={companyCard}>
            <Link to={`/company/${props.company.name.replace(" ", '').replace("-", "").replace("_", "")}/${props.company.id}`}>
                <div id="imgDiv">
                    <AiOutlineFileImage size={150}/>
                </div>
            </Link>

            <div className="titleWrapp" style={{display: "flex", margin: "0 0 0.5em 0"}}>
                <h1 style={{}}>{props.company.name}</h1>
            </div>

            <div className="companyCardInfoDiv">
                <p>Kategori: {props.company.category}</p>
            </div>

            <div className="companyCardInfoDiv">
                <p>Region: {props.company.region}</p>
            </div>

            <div className="companyCardInfoDiv">
                <p>Skola: {props.company.school}</p>
            </div>

        </div>
    );
}

const companyCard: CSSProperties = {
    padding: "1em",
    backgroundColor: "rgb(239, 225, 206)",
    borderRadius: "10px",
    maxWidth: "200px",
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
    wordBreak: "break-all",
    margin: "0 0 1.5em 0"
}


