import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { Company } from '../../models';
import Button from '../UI/button';
import { BiEdit } from 'react-icons/bi';
import { UserContext, UserOptions } from '../../context/users/userContext';
import { UserInfo } from '../../types';
import SpinnerModal from '../functions/spinnerModal';
import DashEditUserInfo from './dashEditUserInfo';

type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
}

//NOTE: this should be two components
export default function DashUserInfo(props: Props) {

    const userContext: UserOptions = useContext(UserContext)

    const idFromUrl = useMatch("myPages/:userId/*")?.params.userId;

    const [loading, setLoading] = useState<boolean>(true)
    const [infoAvailable, setInfoAvailable] = useState<boolean>(false)
    const [statusMsg, setStatusMsg] =useState<string | undefined>(undefined)
    const [showOrEdit, setShowOrEdit] = useState<"show" | "edit">("show")
    const [userInfo, setUserInfo] = useState<UserInfo>()

     
    //const updatedUserInfo: Array<any> = [firstName, surName, city, municipality, zipCode, adress, phoneNr, co]



    const getCurrentUserInfo = async () => {
        if(idFromUrl !== undefined) {
            let userInfo = await userContext.getUserInfo(idFromUrl)
                setUserInfo(userInfo[0])
                setLoading(false)
        }
    }



    useEffect(() => {
        if(showOrEdit === "show") {
            getCurrentUserInfo()
        }
    }, [showOrEdit])

    useEffect(() => {
        if(userInfo !== undefined) {
            setInfoAvailable(true)
        }
    }, [userInfo])

/*     useEffect(() => {
        if(infoAvailable === true) {
            setLoading(false)
        } 
    }, [infoAvailable])

 */
    
    return (

        loading? 
            <SpinnerModal message={statusMsg}/>
            : showOrEdit === "show" && userInfo === undefined?
                <div id="userInfo" style={userInfoStyle}>
                
                    
                    <div id="as" style={userInfoStyle}>
                        <h1 style={{margin: "1em 0 2em 0"}}>Uppgifter saknas</h1>
                        <Button border='1px solid black' buttonText='Lägg till uppgifter' icon={<BiEdit />} height='10%' onClick={() => setShowOrEdit("edit")}/>

                    </div>
                </div>
                
                : showOrEdit === "show"?
                    <div id="showInfo" style={showInfoStyle}>
                        <h1 style={{width: "100%", margin: "0 0 1em 0"}}>
                            {userInfo?.surName !== undefined && userInfo.firstName !== undefined? 
                                userInfo.firstName + " " + userInfo.surName
                                : "Namn saknas, fyll i dina uppgifter"
                            }
                        </h1> {/* NOTE: maybe spinner instead of "inte tillgänglig" */}
                        <p style={infoTextStyle}>Stad: {userInfo?.city !== undefined? userInfo.city : "Fyll i dina uppgifter" }</p>
                        <p style={infoTextStyle}>Ort: {userInfo?.municipality !== undefined? userInfo.municipality : "Fyll i dina uppgifter" }</p>
                        <p style={infoTextStyle}>Post nr: {userInfo?.zipCode !== undefined? userInfo.zipCode : "Fyll i dina uppgifter" }</p>
                        <p style={infoTextStyle}>Adress: {userInfo?.adress !== undefined? userInfo.adress : "Fyll i dina uppgifter" }</p>
                        {userInfo?.phoneNr !== null?
                            <p style={infoTextStyle}>Telefon nr: {userInfo?.phoneNr !== undefined? userInfo.phoneNr : "Fyll i dina uppgifter" }</p>
                            : null
                        }
                        {userInfo?.co !== null?
                            <p style={infoTextStyle}>C/O: {userInfo?.co !== undefined? userInfo.co : "Fyll i dina uppgifter" }</p>
                            : null
                        }
                        <p style={infoTextStyle}></p> {/* NOTE: keeping this for proportions */}
                        <div className='btnWrap' style={{display: "flex", width: "100%", justifyContent: "flex-end", margin: "0.5em 0 0 0" }}>
                            <Button  border='1px solid black' icon={<BiEdit />} width='10%' onClick={() => setShowOrEdit("edit")}/>
                        </div>
                        
                        {props.currentCompany === undefined && showOrEdit === "show" && infoAvailable === true && userInfo?.pendingCompany !== true && !userInfo?.company?
                            <div className='btnWrapper' style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "10em"}}>
                                <Button  border='1px solid black' buttonText="registrera UF" linkTo={"registerCompany"} />
                            </div>
                            : null}
                        
                    </div>
                    : showOrEdit === "edit"? 
                        <DashEditUserInfo idFromUrl={idFromUrl as string} userInfo={userInfo} currentCompany={props.currentCompany} setShowOrEdit={(showOrEdit) => setShowOrEdit(showOrEdit)}/>
                        : null
                        
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
    height: "100%",
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