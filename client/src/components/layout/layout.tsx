import React, { CSSProperties, useState } from 'react';
import Footer from './footer';
import Header from './header';
import LoginPopup from './loginPopup';
import Main from './main';

export default function Layout() {

    const [loginToggle, setLoginToggle] = useState(false)
   

    return(
        <div id="frame" style={frameStyle}>
            <div id="layoutWrap" style={layoutStyle}>
                <Header setLoginToggle={setLoginToggle}/>
                <Main />
            </div>
            {loginToggle? <LoginPopup setLoginToggle={setLoginToggle} /> : null } 
        
        </div>
        
    )
}

const layoutStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "95%",
    backgroundColor: "orange",
    borderRadius: "15px"
}

const frameStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#E5E5E5",
    overflow: "auto"
}
  