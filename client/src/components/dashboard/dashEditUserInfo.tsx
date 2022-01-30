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
}

export default function DashEditUserInfo(props: Props) {

    const userContext: UserOptions = useContext(UserContext)

    const idFromUrl = useMatch("myPages/:userId/*")?.params.userId;

    const [addOrEdit, setAddOrEdit] = useState<"add" | "edit">()
    const [loading, setLoading] = useState<boolean>(false)
    const [statusMsg, setStatusMsg] =useState<string | undefined>(undefined)

    const [firstName, setFirstName] = useState<string>()
    const [surName, setSurname] = useState<string>()
    const [city, setCity] = useState<string>()
    const [municipality, setMunicipality] = useState<string>()
    const [zipCode, setZipCode] = useState<number>()
    const [adress, setAdress] = useState<string>()
    const [phoneNr, setPhoneNr] = useState<number | null>(props.userInfo?.phoneNr? props.userInfo.phoneNr : null)
    const [co, setCo] = useState<string | null>(null)


    const updateStateFromInputValue = (event: any, failSafe: string | number | null, setState: (param: any ) => void) => { //FIXME: param: any??
        event? setState(event.target.value) : setState(failSafe)
    }

    const updatedUserInfo = () => {
        const updatedUserInfo: UserInfo = {
            firstName: firstName as string,
            surName: surName as string,
            city: city as string,   
            municipality: municipality as string,
            zipCode: zipCode as number,
            adress: adress as string,
            phoneNr: phoneNr as number,    
            co,
            id: idFromUrl as string
        }    
        return updatedUserInfo
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

    

    const inputsArray = [
        {   
            inputName: "firstNameInput",
            inputText: "Förnamn",
            value: props.userInfo?.firstName? props.userInfo.firstName : undefined,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.firstName? props.userInfo.firstName : "", setFirstName)},
            required: true
        },
        {
            inputName: "surNameInput",
            inputText: "Efternamn",
            value: props.userInfo?.surName? props.userInfo?.surName : undefined,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.surName? props.userInfo.surName : "", setSurname)},
            required: true
        },
        {
            inputName: "city",
            inputText: "Stad",
            value: props.userInfo?.city? props.userInfo.city : undefined,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.city? props.userInfo.city : "", setCity)},
            required: true
        },
        {
            inputName: "municipality",
            inputText: "Ort",
            value: props.userInfo?.municipality? props.userInfo.municipality : undefined,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.municipality? props.userInfo.municipality : "", setMunicipality)},
            required: true
        },
        {
            inputName: "zipCode",
            inputText: "postkod",
            value: props.userInfo?.zipCode? props.userInfo.zipCode : null,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.zipCode? props.userInfo.zipCode : "", setZipCode)},
            required: true
        },
        {
            inputName: "adress",
            inputText: "Adress",
            value: props.userInfo?.adress? props.userInfo.adress : undefined,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.adress? props.userInfo.adress : "", setAdress)},
            required: true
        },
        {
            inputName: "phoneNr",
            inputText: "Telefon nr",
            value: props.userInfo?.phoneNr? props.userInfo.phoneNr : null,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.phoneNr? props.userInfo.phoneNr : null, setPhoneNr)},
            required: false
        },
        {
            inputName: "co",
            inputText: "C/o",
            value: props.userInfo?.co? props.userInfo.co : undefined,
            setStateFromInput: (event: any) => {updateStateFromInputValue(event, props.userInfo?.co? props.userInfo.co : "", setFirstName)},
            required: false
        }
    ] 

    const renderInputArray = () => {
  
        return inputsArray.map((item, key) => {
            if(item.inputName === "phoneNr" || item.inputName === "zipCode") {
                return (
                    <div key={key} style={editInputWrapperStyle}>
                    
                        <p style={textInInputWrap}> {item.inputText} </p>
                       
                        <input type={"number"} onChange={(event) => item.setStateFromInput(event)} style={inputStyle}/> 
                        
                        
                        { addOrEdit === "add" && item.required?
                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                        : null} 
    
                    </div>
                )
    
            } else {
                return (
                    <div key={key} style={editInputWrapperStyle}>
                    
                        <p style={textInInputWrap}> {item.inputText} </p>
                       
                        <input type={"string"} onChange={(event) => item.setStateFromInput(event)} style={inputStyle}/> 
                        
                        
                        { addOrEdit === "add" && item.required?
                        <p style={{color: "red", padding: "0 0.5em 0 0"}}>*</p>
                        : null} 
    
                    </div>
                ) 
            }
                         

        })
    }

    return(
        loading?
        <SpinnerModal />
        :
        <div id="editInfo" style={showInfoStyle}>
            <h1 style={{width: "100%", margin: "0 0 1em 0"}}>(Edit)</h1>
            {renderInputArray()}

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
                    console.log("userinfo", props.userInfo) 
                    const result = await userContext.addOrUpdateUserInfo(updatedUserInfo(), idFromUrl as string)
                        console.log("dashEditUserInfo: ", phoneNr)
                        if(result.status === 200) {
                            setStatusMsg(result.message)
                            setTimeout(() => {
                                setLoading(false) 
                                setStatusMsg(undefined)
                                props.setShowOrEdit("show")
                            }, 1500);
                        } 
                        else {
                            console.log(result.status, result.message)
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

const showInfoStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: "1em",
    justifyContent: "space-evenly",
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
               
          