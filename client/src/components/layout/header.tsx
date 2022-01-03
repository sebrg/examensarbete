import React, { CSSProperties, useContext } from 'react';
import MainNav from './mainNav';

type Props = {
  setLoginToggle: any
  isLoggedIn: boolean
}

export default function Header(props: Props) {


    return (
		<header style={headerStyle}>
			<MainNav isLoggedIn={props.isLoggedIn} setLoginToggle={props.setLoginToggle} />

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

