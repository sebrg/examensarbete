import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import RegisterWithEmail from '../functions/registerWithEmail';




export default function Main() {

  const [users, setUsers] = useState()

  const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

    

    useEffect(() => {
      fbFuncs.getUsers(setUsers)
    }, [])
    useEffect(() => {
      console.log(users)
    }, [users])




    return (
        <main style={mainStyle}>
          main
          <RegisterWithEmail />
        </main>
    );
}

const mainStyle: CSSProperties = {
  height: "85%"
}