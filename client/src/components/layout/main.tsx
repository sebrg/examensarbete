import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import Start from './start';
import MyPages from './myPages';

import { useStripe } from '@stripe/react-stripe-js';



export default function Main() {


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
  

   




    return (

		<main style={mainStyle}>
			<Routes>
				<Route path='/' element={<Start/>} />
				<Route path='/myPages' element={<MyPages/>} />
			</Routes>
		</main>
    );
}

const mainStyle: CSSProperties = {
  height: "85%"
}

{/* 			<Route exact path={"/:username/success/:id"} component={Success} />
			<Route exact path={"/:username?"} component={Main} />                  
			<Route exact path={"/:username/kundvagn"} component={Cart} />
			<Route exact path={"/:username/gamla-ordrar"} component={OldOrders} />
			<Route exact path={"/no-user/401"} component={AuthError401} />
			<Route exact path={"/:username/payment-cancelled"} component={PaymentCancelled} /> */}