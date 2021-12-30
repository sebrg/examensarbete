import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import RegisterWithEmail from '../functions/registerWithEmail';

import { useStripe } from '@stripe/react-stripe-js';



export default function Main() {

  const [users, setUsers] = useState()

  const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

  const stripe = useStripe()

  async function toCheckOut() {
      if(stripe) {
      const response = await fetch("http://localhost:3001/checkout", {
          method: "POST",
          headers: {"content-type": "application/json"},
          credentials: 'include',
      })
        const { id } = await response.json()
          console.log(id)
          console.log(stripe)
          stripe.redirectToCheckout({sessionId: id})
      }  
  }
  
    useEffect(() => {
      fbFuncs.getUsers(setUsers)
    }, [])
    useEffect(() => {
      console.log(users)
    }, [users])




    return (
        <main style={mainStyle}>
            <button className="blueBtnEffect" onClick={() => toCheckOut()}>
              Till Checkout
            </button>
          <RegisterWithEmail />
        </main>
    );
}

const mainStyle: CSSProperties = {
  height: "85%"
}