import React, { CSSProperties, SetStateAction, useContext } from 'react';
import MainNav from './mainNav';
import marungoFatGreen from "./../../assets/baraMlogo.png"
import DropDownBtn from '../functions/dropDown';
type Props = { //FIXME: Fix "any" types
	setLoginToggle: any
	isLoggedIn: boolean | undefined
	setNavToggle: any
	navToggle: boolean
	scrollContentIntoView?: (always: boolean) => void
	dropDownRef: React.MutableRefObject<HTMLInputElement>
}

export default function Header(props: Props) {


    return (
		<header style={headerStyle}>
			{/* <MainNav scrollContentIntoView={props.scrollContentIntoView} isLoggedIn={props.isLoggedIn} setLoginToggle={props.setLoginToggle} /> */}
			
			
			<DropDownBtn dropDownRef={props.dropDownRef} navToggle={props.navToggle} setNavToggle={props.setNavToggle} /> 

			<img src={marungoFatGreen} style={logoStyleTest}></img>
		</header>
    );
}

const headerStyle: CSSProperties = {
	display: "flex",
	width: "100%",
	minHeight: "15%",
	backgroundColor: "#FFFFFF",
	/* padding: "10px", */
	background: "#eea47fff",
	boxShadow: "0px 5px 5px -2px black",
	WebkitBoxShadow: "0px 5px 5px -2px black",
	zIndex: 8,
	position: "sticky",
	top: 0,
	scrollSnapAlign: "start",
	justifyContent: "space-between"
}

const logoStyleTest: CSSProperties = {
	objectFit: "contain", 
	borderRadius: "15px", 
	padding: "0 10px 0 0"
}