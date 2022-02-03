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
        const [statusMsg, setStatusMsg] = useState<string | undefined>()
        const [redirect, setRedirect] = useState<boolean | undefined>(undefined)
        const [userInfo, setUserInfo] = useState<UserInfo | undefined>()

        const [name, setName] = useState<string>("")
        const [school, setSchool] = useState<string>("")
        const [region, setRegion] = useState<string>("")
        const [category, setCategory] = useState<string>("")
        const [email, setEmail] = useState<string>("")

        
        
        const updateName = (event: any) => {
            event? setName(event.target.value) : setName("")
        } 
        
        const updateSchool = (event: any) => {
            event? setSchool(event.target.value) : setSchool("")
        } 
        
        const updateRegion = (event: any) => {
            event? setRegion(event.target.value) : setRegion("")
        } 
        const updateEmail = (event: any) => {
            event? setEmail(event.target.value) : setEmail("")
        } 
        
        /*  
        const updateCategory = (event: any) => {
            event? setCategory(event.target.value) : setCategory("")
        }  
        */

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
            setLoading(false)
        }, [redirect])

    return (
        loading?
            <SpinnerModal message={statusMsg}/>
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
                            <p style={inputTitle}>Email:</p>
                            <input style={inputStyle} className='removeInputOutline' onChange={(event) => updateEmail(event)}/>
                        </div>
            
                        {/*                     
                        <div style={inputWrap}>
                            <p style={inputTitle}>Category:</p>
                            <input style={inputStyle} className='removeInputOutline' onChange={(event) => updateCategory(event)}/>
                        </div> 
                        */}
            
                        <Button  border='1px solid black' buttonText='Registrera ansökan' width='30%' bgColor='black' onClick={ async () => {
                            setLoading(true)
                            const result = await companyContext.addCompany({name, school, region, email, payments: {enabled: false}, shipping: {shippingPrice: 0, freeShippingOver: 0}}, "pendingCompanies")
                            if(result) {
                                setStatusMsg(result.message)
                                setTimeout(() => {
                                    setLoading(false) 
                                    setStatusMsg(undefined)
                                }, 1500)    
                            } 

                        }}/>  
        
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
    width: "100%",
    borderRadius: "10px"
}

const inputTitle: CSSProperties = {
    marginRight: "0.5em",
    padding: "0.5em"
}

const inputStyle: CSSProperties = {
    width: "100%",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",

}