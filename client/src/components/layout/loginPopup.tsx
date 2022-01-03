import React, { CSSProperties, useContext, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Button from './button';

type Props = {
    setLoginToggle: any
}
export default function LoginPopup(props: Props) {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

    const [toggleInputs, setToggleInputs] = useState(false)
    const [password, setPassword] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    
    const updatePassword = (event: any) => {
        event? setPassword(event.target.value) : setPassword(undefined)
    }   
    
    const updateEmail = (event: any) =>{
        event? setEmail(event.target.value) : setEmail(undefined)
    }
    
    
    return (
            <div id="loginPopupBackGround" style={loginPopupBackGround} onClick={() => props.setLoginToggle(false)}>
                <div id="loginPopup" style={loginPopup} onClick={(event) => event.stopPropagation()}>
                    {
                        toggleInputs?
                            
                            <div id="loginCred" style={loginCredStyle}>
                                <div id="loginInputWrap" style={loginInputWrapStyle}>
                                    <input placeholder='email' className='loginInput' style={loginInputStyle} onChange={(event) => updateEmail(event)} />
                                    <input placeholder='password' className='loginInput' style={loginInputStyle} onChange={(event) => updatePassword(event)} />
                                </div>
                                <div id="loginWithCredBtnWrap" style={loginWithCredBtnWrapStyle}>
                                   
                                    <Button 
                                        onClick={() => fbFuncs.signInWithEmail(email, password)} 
                                        buttonText='Login' 
                                        bgColor='white' 
                                    />
                                        
                                    <Button 
                                        onClick={() => fbFuncs.createUserWithEmail(email, password)} 
                                        buttonText='Register' 
                                        bgColor='white' 
                                    />
                                
                                </div>
                            </div>
                           
                            :

                            <div id="loginOptions" style={loginOptionsStyle}>
                                <div 
                                    id="googleLoginBtn"
                                    onClick={() => {
                                        fbFuncs.signInWithGooglePopup()
                                        //Create if sucess => close popup
                                        props.setLoginToggle(false)
                                    }}
                                >
                                    Google
                                </div>
                                <div onClick={() => {setToggleInputs(true)}}>
                                    Email & Password
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
    width: "60%",
    height: "60%",
    backgroundColor: "white",

}

const loginOptionsStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
}

const loginCredStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2em",
    alignItems: "center"
}

const loginInputWrapStyle: CSSProperties = {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const loginInputStyle: CSSProperties = {
    width: "100%",
    fontSize: "1.5em",
    padding: "0.5em"
}

const loginWithCredBtnWrapStyle: CSSProperties = {
    width: "70%",
    display: "flex",
    justifyContent: "space-evenly"
}

/* const loginWithCredBtnStyle: CSSProperties = {
    padding: "0.5em",
    fontSize: "1em"
} */
    



