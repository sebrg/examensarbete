import React, { CSSProperties } from 'react';
import Login from "../functions/login"
import Logout from '../functions/logout';
import Button from './button';

type Props = {
  setLoginToggle: any
}

export default function Header(props: Props) {

    return (
        <header style={headerStyle}>
          <Button onClick={() => props.setLoginToggle(true)} buttonText='Login' />
          
        {/*   <Login setLoginToggle={props.setLoginToggle}/> */}
          <Logout />
        </header>
    );
}

const headerStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  height: "15%",
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  padding: "10px",

}
