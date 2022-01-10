import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import Start from './start';
import MyPages from './myPages';
import UserNotFound from './userNotFound';
import ReqAuth from '../functions/reqAuth';

type Props = {
	isLoggedIn: boolean | undefined
	passedRef?: React.MutableRefObject<HTMLInputElement>
  }
export default function Main(props: Props) {

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

		<main ref={props.passedRef} style={mainStyle}>
			<Routes>
				<Route path='/' element={<Start/>} />
				<Route 
					path='/myPages/:id/*' 
					element={
						<ReqAuth isLoggedIn={props.isLoggedIn}>
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
  minHeight: "85%"
}

