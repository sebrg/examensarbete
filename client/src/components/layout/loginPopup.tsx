import React, { CSSProperties, useState } from 'react';

type Props = {
    setLoginToggle: any
}
export default function LoginPopup(props: Props) {

    
    
    return (
            <div id="loginPopupBackGround" style={loginPopupBackGround}>
                <div id="loginPopup" style={loginPopup}>

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












