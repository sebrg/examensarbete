import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useState } from 'react';
//import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Button from '../UI/button';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { UserContext, UserOptions } from '../../context/users/userContext';


type Props = {
    setLoginToggle: any
}
export default function LoginPopup(props: Props) {

    const userContext: UserOptions = useContext(UserContext)
    const auth = getAuth();


    const [toggleInputs, setToggleInputs] = useState(false)
    const [password, setPassword] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    
    const updatePassword = (event: any) => {
        event? setPassword(event.target.value) : setPassword(undefined)
    }   
    
    const updateEmail = (event: any) =>{
        event? setEmail(event.target.value) : setEmail(undefined)
    }

    const closePopupOnSuccess = () => {
        console.log("running test b4 closing")
        if(auth.currentUser) {
            props.setLoginToggle(false)
        }
    }
    
    
    return (
            <div id="loginPopupBackGround" style={loginPopupBackGround} onClick={() => props.setLoginToggle(false)}>
                <div id="loginPopup" style={loginPopup} onClick={(event) => event.stopPropagation()}>
                    {
                        toggleInputs?
                            
                            <div id="loginCred" style={loginCredStyle}>
                                <div style={{padding: "0.2em 0.2em 0 0", display: "flex", justifyContent: "flex-end", width: "100%"}}>
                                    <IoMdRemoveCircleOutline style={{cursor: "pointer"}} fontSize={"1.5em "} onClick={() => props.setLoginToggle(false)}/>
                                </div>
                                
                                <div id="loginInputWrap" style={loginInputWrapStyle}>
                                    <form>
                                        <input autoComplete="username" placeholder='email' className='loginInput' style={{...loginInputStyle, marginBottom: "0.5em"}} onChange={(event) => updateEmail(event)} />
                                        <input autoComplete='current-password' placeholder='password' type="password" className='loginInput' style={loginInputStyle} onChange={(event) => updatePassword(event)} />
                                    </form>
                                </div>

                                <div id="loginWithCredBtnWrap" style={loginWithCredBtnWrapStyle}>
                                   
                                    <Button 
                                        onClick={() => userContext.signInWithEmail(email, password, closePopupOnSuccess)} 
                                        buttonText='Logga in' 
                                        bgColor='white' 
                                        border='1px solid black'
                                    />
                                        
                                    <Button 
                                        onClick={() => userContext.createUserWithEmail(email, password)} 
                                        buttonText='Registrera' 
                                        bgColor='white' 
                                        border='1px solid black'
                                    />
                                
                                </div>
                                <div style={{marginTop: "auto"}}>
                                    <Button buttonText='Tillbaka' onClick={() => setToggleInputs(false)}/>
                                </div>
                            </div>
                           
                            :

                            <div id="loginOptions" style={loginOptionsStyle}>
                                <div style={{padding: "0.2em 0.2em 0 0", display: "flex", justifyContent: "flex-end", width: "100%"}}>
                                    <IoMdRemoveCircleOutline style={{cursor: "pointer"}} fontSize={"1.5em "} onClick={() => props.setLoginToggle(false)}/>

                                </div>

                                <div style={{margin: "0 0 2em 0", fontSize: "1.5em", width: "100%", display: "flex", justifyContent: "center"}}>
                                    <p>Logga in eller registrera dig</p>
                                </div>

                                <div id="googleLoginBtn" className='loginAlternativeBtn' style={{fontSize: "4em", display: "flex", alignItems: "center", cursor: "pointer", borderRadius: "10px", padding: "0.2em", border: "2px solid black"}} onClick={async () => userContext.signInWithGooglePopup(closePopupOnSuccess)}>
                                    <FcGoogle />
                                </div>  

                                <div id="mailLoginBtn" className='loginAlternativeBtn' style={{fontSize: "4em", display: "flex", alignItems: "center", cursor: "pointer", borderRadius: "10px", padding: "0.2em", border: "2px solid black"}} onClick={() => {setToggleInputs(true)}}>
                                    <HiOutlineMail />
                                </div>
                            </div>
                            
                            
                    }
                    
            
    
                </div>
            </div>
    );
}

const loginPopupBackGround: CSSProperties = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "10",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

}

const loginPopup: CSSProperties = {
    minWidth: "30%",
    //height: "60%",
    backgroundColor: "white",
    padding: "0 0 1.5em 0",
    borderRadius: "10px",
}

const loginOptionsStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    //position: "relative"
}

const loginCredStyle: CSSProperties = {
    minWidth: "60vw",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
   // padding: "2em",
    alignItems: "center"
}

const loginInputWrapStyle: CSSProperties = {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 0 1em 0"

}

const loginInputStyle: CSSProperties = {
    width: "100%",
    fontSize: "1.2em",
    padding: "0.5em",
    borderRadius: "10px"
}

const loginWithCredBtnWrapStyle: CSSProperties = {
    width: "70%",
    display: "flex",
    justifyContent: "space-evenly",

}

/* const loginWithCredBtnStyle: CSSProperties = {
    padding: "0.5em",
    fontSize: "1em"
} */
    



