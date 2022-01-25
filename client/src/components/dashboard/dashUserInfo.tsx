import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { Company } from '../../models';
import Button from '../UI/button';
import { BiEdit } from 'react-icons/bi';
import { UserContext, UserOptions } from '../../context/users/userContext';
import { UserInfo } from '../../types';
import SpinnerModal from '../functions/spinnerModal';

type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
}


export default function DashUserInfo(props: Props) {

    const userContext: UserOptions = useContext(UserContext)

    const idFromUrl = useMatch("myPages/:userId/*")?.params.userId;

    const [loading, setLoading] = useState<boolean>(true)
    const [statusMsg, setStatusMsg] =useState<string | undefined>(undefined)
    const [showOrEdit, setShowOrEdit] = useState<"show" | "edit">("show")
    const [infoAvailable, setInfoAvailable] = useState<boolean | undefined>(true)
    const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo>()

    const [firstName, setFirstName] = useState<string>(currentUserInfo?.firstName as string)
    const [surName, setSurname] = useState<string>(currentUserInfo?.surName as string)
    const [city, setCity] = useState<string>(currentUserInfo?.city as string)
    const [municipality, setMunicipality] = useState<string>(currentUserInfo?.municipality as string)
    const [zipCode, setZipCode] = useState<number>(currentUserInfo?.zipCode as number)
    const [adress, setAdress] = useState<string>(currentUserInfo?.adress as string)
    const [phoneNr, setPhoneNr] = useState<number | null>(currentUserInfo?.phoneNr? currentUserInfo.phoneNr : null)
    const [co, setCo] = useState<string | null>(null)

    const updateFirstNameInputState = (event: any) => {
        event? setFirstName(event.target.value) : setFirstName(currentUserInfo?.firstName as string)
    }

    const updateSurNameInputState = (event: any) => {
        event? setSurname(event.target.value) : setSurname(currentUserInfo?.surName as string)
    }

    const updateCityInputState = (event: any) => {
        event? setCity(event.target.value) : setCity(currentUserInfo?.city as string)
    }

    const updateMunicipalityInputState = (event: any) => {
        event? setMunicipality(event.target.value) : setMunicipality(currentUserInfo?.firstName as string)
    }

    const updateZipCodeInputState = (event: any) => {
        event? setZipCode(event.target.value) : setZipCode(currentUserInfo?.zipCode as number)
    }

    const updateAdressInputState = (event: any) => {
        event? setAdress(event.target.value) : setAdress(currentUserInfo?.adress as string)
    }

    const updatePhoneNrInputState = (event: any) => {
        event? setPhoneNr(event.target.value) : setPhoneNr(currentUserInfo?.phoneNr as number)
    }

    const updateCoInputState = (event: any) => {
        event? setCo(event.target.value) : setCo(currentUserInfo?.co as string)
    }

    
     
    //const updatedUserInfo: Array<any> = [firstName, surName, city, municipality, zipCode, adress, phoneNr, co]

    const updatedUserInfo = () => {
        const updatedUserInfo: UserInfo = {
            firstName,
            surName,
            city,   
            municipality,
            zipCode,
            adress,
            phoneNr,    
            co,
            id: idFromUrl as string
        }    
        return updatedUserInfo
    }

    const getCurrentUserInfo = async () => {
        if(idFromUrl !== undefined) {
            let userInfo = await userContext.getUserInfo(idFromUrl)
            setCurrentUserInfo(userInfo[0])
        }
    }

    const checkCurrentUserInfo = () => {
        if(currentUserInfo) {
            setInfoAvailable(true)
            setLoading(false)
        } 
        else {
            setInfoAvailable(false)
            setLoading(false)
            //FIXME: skapa någon form va check på uppgifter
        }
    }

    useEffect(() => {
        if(showOrEdit === "show") {
            getCurrentUserInfo()
        }
    }, [showOrEdit])

    useEffect(() => {
        checkCurrentUserInfo()
    }, [currentUserInfo])


    return (
        loading? 
            <SpinnerModal message={statusMsg}/>
            : //Else !loading
            <div id="userInfo" style={userInfoStyle}>
                {showOrEdit === "show" && infoAvailable === false?
                    
                    <div id="userInfo" style={userInfoStyle}>
                        <h1 style={{margin: "1em 0 2em 0"}}>Uppgifter saknas</h1>
                        <Button buttonText='Lägg till uppgifter' icon={<BiEdit />} height='10%' onClick={() => setShowOrEdit("edit")}/>

                    </div>
                    : showOrEdit === "show" && infoAvailable === true?
                        <div id="showInfo" style={showInfoStyle}>
                            <h1 style={{width: "100%", margin: "0 0 1em 0"}}>
                                {currentUserInfo?.surName !== undefined && currentUserInfo.firstName !== undefined? 
                                    currentUserInfo.firstName + " " + currentUserInfo.surName
                                    : "Namn saknas, fyll i dina uppgifter"
                                }
                            </h1> {/* NOTE: maybe spinner instead of "inte tillgänglig" */}
                            <p style={infoTextStyle}>Stad: {currentUserInfo?.city !== undefined? currentUserInfo.city : "Fyll i dina uppgifter" }</p>
                            <p style={infoTextStyle}>Ort: {currentUserInfo?.municipality !== undefined? currentUserInfo.municipality : "Fyll i dina uppgifter" }</p>
                            <p style={infoTextStyle}>Post nr: {currentUserInfo?.zipCode !== undefined? currentUserInfo.zipCode : "Fyll i dina uppgifter" }</p>
                            <p style={infoTextStyle}>Adress: {currentUserInfo?.adress !== undefined? currentUserInfo.adress : "Fyll i dina uppgifter" }</p>
                            {currentUserInfo?.phoneNr !== null?
                                <p style={infoTextStyle}>Telefon nr: {currentUserInfo?.phoneNr !== undefined? currentUserInfo.phoneNr : "Fyll i dina uppgifter" }</p>
                                : null
                            }
                            {currentUserInfo?.co !== null?
                                <p style={infoTextStyle}>C/O: {currentUserInfo?.co !== undefined? currentUserInfo.co : "Fyll i dina uppgifter" }</p>
                                : null
                            }
                            <p style={infoTextStyle}></p> {/* NOTE: keeping this for proportions */}
                            <div className='btnWrap' style={{display: "flex", width: "100%", justifyContent: "flex-end", margin: "0.5em 0 0 0" }}>
                                <Button icon={<BiEdit />} width='10%' onClick={() => setShowOrEdit("edit")}/>
                            </div>
                        </div>
                        : showOrEdit === "edit"?
                            <div id="editInfo" style={showInfoStyle}>
                                <h1 style={{width: "100%", margin: "0 0 1em 0"}}>(Edit)</h1>
                            
                                {/* All inputs */}
                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Förnamn: </p>
                                    <input  placeholder={currentUserInfo?.firstName? currentUserInfo.firstName : undefined} onChange={(event) => updateFirstNameInputState(event)} style={inputStyle}/>     
                                    {!infoAvailable?
                                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                                        : null
                                    }
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Efternamn: </p>
                                    <input placeholder={currentUserInfo?.surName? currentUserInfo.surName : undefined} onChange={(event) => updateSurNameInputState(event)} style={inputStyle}/>  
                                    {!infoAvailable?
                                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                                        : null
                                    }  
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Stad: </p>
                                    <input placeholder={currentUserInfo?.city? currentUserInfo.city : undefined} onChange={(event) => updateCityInputState(event)} style={inputStyle}/> 
                                    {!infoAvailable?
                                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                                        : null
                                    }   
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Ort: </p>
                                    <input placeholder={currentUserInfo?.municipality? currentUserInfo.municipality : undefined} onChange={(event) => updateMunicipalityInputState(event)} style={inputStyle}/>    
                                    {!infoAvailable?
                                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                                        : null
                                    }
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Post nummer: </p>
                                    <input placeholder={currentUserInfo?.zipCode? currentUserInfo.zipCode.toString() : undefined} type={"number"} onChange={(event) => updateZipCodeInputState(event)} style={inputStyle}/>        
                                    {!infoAvailable?
                                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                                        : null
                                    }
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Adress: </p>
                                    <input placeholder={currentUserInfo?.adress? currentUserInfo.adress : undefined} onChange={(event) => updateAdressInputState(event)} style={inputStyle}/> 
                                    {!infoAvailable?
                                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                                        : null
                                    }
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> Telefon nummer: </p>
                                    <input type={"number"} placeholder={currentUserInfo?.phoneNr? currentUserInfo.phoneNr.toString() : undefined} onChange={(event) => updatePhoneNrInputState(event)} style={inputStyle}/>
                                        
                                </div>

                                <div style={editInputWrapperStyle}>
                                    <p style={textInInputWrap}> C/O: </p>
                                    <input onChange={(event) => updateCoInputState(event)} style={inputStyle}/>
                                        
                                </div>
                                {!infoAvailable?
                                    <div id="reqMsgWrap" style={{width: "100%", justifyContent: "flex-start", margin: "1em 0 0 0"}}>
                                        <p style={{color: "red", padding: "0 0.5em 0 0", display: "inline"}}>*</p>
                                        = Obligatoriska fält
                                    </div>
                                    : null
                                }

                                <div className='btnWrap' style={{display: "flex", width: "100%", justifyContent: "flex-end", margin: "1em 0 0 0" }}>
                                    <Button buttonText='Tillbaka' onClick={() => setShowOrEdit("show")}/>
                                    <Button buttonText={infoAvailable? "Uppdatera" : "Lägg till"} onClick={ async () => {
                                        setLoading(true)
                                        const result = await userContext.addOrUpdateUserInfo(updatedUserInfo(), currentUserInfo as UserInfo, idFromUrl as string)
                                        if(result.status === 200) {
                                            setStatusMsg(result.message)
                                            setTimeout(() => {
                                                setLoading(false) 
                                                setStatusMsg(undefined)
                                                setShowOrEdit("show")
                                            }, 1500);
                                        } 
                                        else {
                                            setStatusMsg(result.message)
                                            setTimeout(() => {
                                                setLoading(false) 
                                                setStatusMsg(undefined)
                                            }, 1500);
                                        }
                                    }}/>
                                </div>
                            </div>
                        : null}   
            </div> 
    );
}

const userInfoStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column"
}

const showInfoStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: "1em",
    justifyContent: "space-evenly"
}

const infoTextStyle: CSSProperties = {
    width: "40%",
    minWidth: "250px",
    margin: "0 0 0.5em 0",
    //textAlign: "center"
}

const inputStyle: CSSProperties = {
    flexGrow: 1, 
    border: "none", 
    width: "100%",
    height: "100%",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px"
}

const editInputWrapperStyle: CSSProperties = {
    ...infoTextStyle, 
    display: "flex", 
    backgroundColor: "white", 
    color: "black", 
    overflow: "hidden", 
    borderRadius: "10px",
    alignItems: "center",
}

const textInInputWrap: CSSProperties = {
    whiteSpace: "nowrap", 
    padding: "0.5em"
}






       {/*          {props.currentCompany === undefined?
                    <Button buttonText="Ansök om att registrera ditt företag" linkTo={"registerCompany"} />
                    : 
                    null
                } */}