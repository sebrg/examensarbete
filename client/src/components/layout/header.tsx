import React, { CSSProperties, useContext } from 'react';
import MainNav from './mainNav';

type Props = {
	setLoginToggle: any
	isLoggedIn: boolean | undefined
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
	minHeight: "15%",
	backgroundColor: "#FFFFFF",
	/*   borderTopLeftRadius: "15px",
	borderTopRightRadius: "15px", */
	padding: "10px",
	background: "#eea47fff",
	//borderBottom: "2px solid black",
	boxShadow: "0px 5px 5px 0px black",
	WebkitBoxShadow: "0px 5px 5px 0px black",
	zIndex: 10,
	position: "sticky",
	top: 0,
}

