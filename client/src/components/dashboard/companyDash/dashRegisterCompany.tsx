import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Button from '../../UI/button';
import { FirebaseContext, FirebaseOptions } from "../../../context/firebaseContext";
import { Company, Product } from "../../../models"
import { CompanyContext, CompanyOptions } from '../../../context/companies/companyContext';
import { UserContext, UserOptions } from '../../../context/users/userContext';
import { getAuth } from 'firebase/auth';
import { UserInfo } from '../../../types';
import SpinnerModal from '../../functions/spinnerModal';

//FIXME: the loading aint working correctly. refresh page to see error
export default function DashRegisterCompany() {

        const auth = getAuth();

        const companyContext: CompanyOptions = useContext(CompanyContext)
        const userContext: UserOptions = useContext(UserContext)

        const [loading, setLoading] = useState<boolean>(true)
        const [redirect, setRedirect] = useState<boolean | undefined>(undefined)
        const [userInfo, setUserInfo] = useState<UserInfo | undefined>()

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

        const checkStatus = async () => {
            if(auth.currentUser) {
                const getUserInfo = await userContext.getUserInfo(auth.currentUser.uid)
                setUserInfo(getUserInfo[0])
                if(!getUserInfo) {
                    setRedirect(true)
                }
            }
        }

        useEffect(() => {
            checkStatus()
        }, [])

        useEffect(() => {
            if(userInfo?.pendingCompany === true || userInfo?.company) {
                setRedirect(true)
            } else {
                setRedirect(false)
            }
        }, [userInfo])

        useEffect(() => {
            console.log(redirect)
            setLoading(false)
        }, [redirect])

    return (
        loading?
            <SpinnerModal />
            : redirect === true?
                <p>Inte tillåtet</p>
                : redirect === false? 
                    <div id="companyRegisterWrap" style={companyRegisterWrapStyle}>
                        <div style={inputWrap}>
                            <p style={inputTitle}>Företagsnamn:</p>
                            <input style={inputStyle} className='removeInputOutline' onChange={(event) => updateName(event)}/>
                        </div>
            
                        <div style={inputWrap}>
                            <p style={inputTitle}>Skola:</p>
                            <input style={inputStyle} className='removeInputOutline' onChange={(event) => updateSchool(event)}/>
                        </div>
            
                        <div style={inputWrap}>
                            <p style={inputTitle}>Region:</p>
                            <input style={inputStyle} className='removeInputOutline' onChange={(event) => updateRegion(event)}/>
                        </div>
            
                        <div style={inputWrap}>
                            <p style={inputTitle}>Category:</p>
                            <input style={inputStyle} className='removeInputOutline' onChange={(event) => updateCategory(event)}/>
                        </div>
            
                        <Button  border='1px solid black' onClick={() => companyContext.addCompany({name, school, region, category, payments: {enabled: false}, shipping: {shippingPrice: 0, freeShippingOver: 0}}, "pendingCompanies")} buttonText='Registrera ansökan' width='30%' bgColor='black'/>
        
                    </div>
                    : null

    );
}

const companyRegisterWrapStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "1em 3em",
    alignItems: "center"
}

const inputWrap: CSSProperties = {
    backgroundColor: "white",
    color: "black",
    display: "flex",
    marginBottom: "1em",
    width: "100%"
}

const inputTitle: CSSProperties = {
    marginRight: "0.5em",
    padding: "0.5em"
}

const inputStyle: CSSProperties = {
    width: "100%",

}