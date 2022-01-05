import React, { CSSProperties, useContext, useState } from 'react';
import Button from '../../button';
import { FirebaseContext, FirebaseOptions } from "../../../../context/firebaseContext";
import { Company, Product } from "../../../../models"


export default function DashRegisterCompany() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)


        const [name, setName] = useState<string>("")
        const [school, setSchool] = useState<string>("")
        const [region, setRegion] = useState<string>("")
        const [category, setCategory] = useState<string>("")
        
        const updateName = (event: any) => {
            event? setName(event.target.value) : setName("")
        } 
        
        const updateSchool = (event: any) => {
            event? setSchool(event.target.value) : setSchool("")
        } 
        
        const updateRegion = (event: any) => {
            event? setRegion(event.target.value) : setRegion("")
        } 
        
        const updateCategory = (event: any) => {
            event? setCategory(event.target.value) : setCategory("")
        } 





    return (
        <div id="companyRegisterWrap" style={companyRegisterWrapStyle}>
            <input 
                placeholder='Företagsnamn'
                onChange={(event) => updateName(event)}
            />
            <input 
                placeholder='Skola'
                onChange={(event) => updateSchool(event)}
            />
            <input 
                placeholder='Region'
                onChange={(event) => updateRegion(event)}
            />
            <input 
                placeholder='Category'
                onChange={(event) => updateCategory(event)}
            />

            <Button onClick={() => fbFuncs.addCompany(new Company(name, school, region, category))} buttonText='UF' width='30%' bgColor='black'/>
            <Button onClick={() => fbFuncs.addProduct(new Product("produkt", 20))} buttonText='PRODUKT' width='30%' bgColor='black'/>
        </div>
    );
}

const companyRegisterWrapStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",

}

