import { userInfo } from 'os';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Company } from '../../models';
import { UserInfo } from '../../types';
import Button from '../UI/button';
import { UserContext, UserOptions } from '../../context/users/userContext';
import SpinnerModal from '../functions/spinnerModal';

type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
    userInfo: UserInfo | undefined
    setShowOrEdit: (param: "show" | "edit") => void
    idFromUrl: string
}

export default function DashEditUserInfo(props: Props) {

    const userContext: UserOptions = useContext(UserContext)

   /*  const idFromUrl = useMatch("myPages/:userId/*")?.params.userId; */

    const [addOrEdit, setAddOrEdit] = useState<"add" | "edit">()
    const [loading, setLoading] = useState<boolean>(false)
    const [statusMsg, setStatusMsg] =useState<string | undefined>(undefined)

    const [firstName, setFirstName] = useState<string>(props.userInfo?.firstName? props.userInfo?.firstName : "")
    const [surName, setSurname] = useState<string>(props.userInfo?.surName? props.userInfo.surName : "")
    const [city, setCity] = useState<string>(props.userInfo?.city? props.userInfo.city : "")
    const [municipality, setMunicipality] = useState<string>(props.userInfo?.municipality? props.userInfo?.municipality : "")
    const [zipCode, setZipCode] = useState<number>(props.userInfo?.zipCode? props.userInfo.zipCode : 0)
    const [adress, setAdress] = useState<string>(props.userInfo?.adress? props.userInfo.adress : "")
    const [phoneNr, setPhoneNr] = useState<number>(props.userInfo?.phoneNr? props.userInfo.phoneNr : 0)
    const [co, setCo] = useState<string>(props.userInfo?.co? props.userInfo.co : "")


    const updateStateFromInputValue = (event: any, failSafe: string | number | null, setState: (param: any ) => void) => { //FIXME: param: any??
        event? setState(event.target.value) : setState(failSafe)
    }


    const checkAddOrEdit = () => {
        console.log(props.userInfo)
        if(props.userInfo) {
            setAddOrEdit('edit')
        } else {
            
            setAddOrEdit("add")

        }
    }

    useEffect(() =>{
        checkAddOrEdit()
    }, [])

    useEffect(() => {
        console.log(addOrEdit)
    }, [addOrEdit])

    

    return(
        loading?
        <SpinnerModal message={statusMsg} fullScreen={true}/>
        :
        <div id="editInfo" className='noScrollBar' style={editInfoStyle}>
            <h1 style={{width: "100%", margin: "0 0 1em 0"}}>(Edit)</h1>
            {/* renderInputArray() */}
            <div className='editInputWrap'  style={editInputWrapperStyle}>
                    
                <p style={textInInputWrap}> {"Förnamn"} </p>
                <input value={firstName} type={"string"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.firstName? props.userInfo.firstName : "", setFirstName)} style={inputStyle}/> 
                { addOrEdit === "add"?
                <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                : null} 

            </div>

            <div className='editInputWrap'  style={editInputWrapperStyle}>
                    
                <p style={textInInputWrap}> {"Efternamn"} </p>
                <input value={surName} type={"string"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.surName? props.userInfo.surName : "", setSurname)} style={inputStyle}/> 
                { addOrEdit === "add"?
                    <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                    : null} 

            </div>

            <div className='editInputWrap'  style={editInputWrapperStyle}>
                    
                <p style={textInInputWrap}> {"Stad"} </p>
                <input value={city} type={"string"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.city? props.userInfo.city : "", setCity)} style={inputStyle}/> 
                { addOrEdit === "add"?
                    <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                    : null} 

            </div>

            <div className='editInputWrap'  style={editInputWrapperStyle}>
                                
                <p style={textInInputWrap}> {"Ort"} </p>
                <input value={municipality} type={"string"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.municipality? props.userInfo.municipality : "", setMunicipality)} style={inputStyle}/> 
                { addOrEdit === "add"?
                    <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                    : null} 

            </div>

            <div className='editInputWrap'  style={editInputWrapperStyle}>
                                
                <p style={textInInputWrap}> {"Postkod"} </p>
                <input value={zipCode} type={"number"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.zipCode? props.userInfo.zipCode : 0, setZipCode)} style={inputStyle}/> 
                { addOrEdit === "add"?
                    <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                    : null} 

            </div>

            
            <div className='editInputWrap'  style={editInputWrapperStyle}>
                                                
                <p style={textInInputWrap}> {"Adress"} </p>
                <input value={adress} type={"string"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.adress? props.userInfo.adress : "", setAdress)} style={inputStyle}/> 
                { addOrEdit === "add"?
                    <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                    : null} 

            </div>

            <div className='editInputWrap'  style={editInputWrapperStyle}>
                                                            
                <p style={textInInputWrap}> {"Telefon nr"} </p>
                <input value={phoneNr} type={"number"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.phoneNr? props.userInfo.phoneNr : 0, setPhoneNr)} style={inputStyle}/> 
          
            </div>

            <div className='editInputWrap'  style={editInputWrapperStyle}>
                                                                        
                <p style={textInInputWrap}> {"C/o"} </p>
                <input value={co} type={"string"} onChange={(event) => updateStateFromInputValue(event, props.userInfo?.co? props.userInfo.co : "", setCo)} style={inputStyle}/> 

            </div>





            {addOrEdit === "add"?
                <div id="reqMsgWrap" style={{width: "100%", justifyContent: "flex-start", margin: "1em 0 0 0"}}>
                    <p style={{color: "red", padding: "0 0.5em 0 0", display: "inline"}}>*</p>
                    = Obligatoriska fält
                </div>
                : null
            }       

            <div className='btnWrap' style={{display: "flex", width: "100%", justifyContent: "flex-end", margin: "1em 0 0 0" }}>
                <Button  border='1px solid black' buttonText='Tillbaka' onClick={() => props.setShowOrEdit("show")}/>
                <Button  border='1px solid black' buttonText={"Uppdatera"} onClick={ async () => {
                    setLoading(true)

                    const updatedUserInfo: UserInfo = {
                        firstName: firstName as string,
                        surName: surName as string,
                        city: city as string,   
                        municipality: municipality as string,
                        zipCode: zipCode as number,
                        adress: adress as string,
                        phoneNr: phoneNr as number,    
                        co: co,
                        id: props.idFromUrl as string
                    }    
                   
                    const result = await userContext.addOrUpdateUserInfo(updatedUserInfo, props.idFromUrl as string)
                        if(result.status === 200) {
                            setStatusMsg(result.message)
                            setTimeout(() => {
                                setLoading(false) 
                                setStatusMsg(undefined)
                                props.setShowOrEdit("show")
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
    )
         
}

const editInputWrapperStyle: CSSProperties = {
    width: "40%",
    minWidth: "250px",
    margin: "0 0 0.5em 0",
    display: "flex", 
    backgroundColor: "white", 
    color: "black", 
    overflow: "hidden", 
    borderRadius: "10px",
    alignItems: "center",
}

const textInInputWrap: CSSProperties = {
    whiteSpace: "nowrap", 
    padding: "0.5em",
}

const editInfoStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: "1em",
    justifyContent: "space-evenly",
    overflow: "auto"
}

const inputStyle: CSSProperties = {
    flexGrow: 1, 
    border: "none", 
    width: "100%",
    height: "100%",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
}       






/*   } else { */
    /*              return (
                     <div key={key} style={editInputWrapperStyle}>   
                         <p style={textInInputWrap}> {item.inputText} </p>
                         <input type={"string"} onChange={(event) => item.setStateFromInput(event)} style={inputStyle}/>     
                         {addOrEdit === "add" && item.required?
                             <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                              : null}  
                     </div>
                 ) */
          /*    } */
               
          