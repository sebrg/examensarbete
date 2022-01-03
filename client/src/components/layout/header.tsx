import React, { CSSProperties, useContext } from 'react';
import Button from './button';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  setLoginToggle: any
  isLoggedIn: boolean
}

export default function Header(props: Props) {

  const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
  const navigate = useNavigate();
 

    return (
        <header style={headerStyle}>
          {
            props.isLoggedIn?
              <Button onClick={() => fbFuncs.logOut()} buttonText='Logout'/>
              :
              <Button onClick={() => props.setLoginToggle(true)} buttonText='Login' />
          }
          
          <Button onClick={() =>  navigate("/myPages")} buttonText='Mina sidor' />
          <Button onClick={() =>  navigate("/")} buttonText='Start' />
       
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
