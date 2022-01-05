import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import Start from './start';
import MyPages from './myPages';
import UserNotFound from './userNotFound';
import ReqAuth from '../functions/reqAuth';


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
				<Route 
					path='/myPages/:id/*' 
					element={
						<ReqAuth>
							<MyPages />
						</ReqAuth>
					} 
				/>
				<Route path='/userNotFound' element={<UserNotFound/>} />
			</Routes>
		</main>
    );
}

const mainStyle: CSSProperties = {
  height: "85%"
}

