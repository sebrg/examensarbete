import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import Start from './start';
import MyPages from './myPages';
import UserNotFound from './userNotFound';
import ReqAuth from '../functions/reqAuth';
import Cart from '../cart/cart';
import CompanyContent from '../company/companyContent';
import PaymentSuccess from '../cart/paymentSuccess';



type Props = {
	isLoggedIn: boolean | undefined
	passedRef?: React.MutableRefObject<HTMLInputElement>
}

export default function Main(props: Props) {

    return (

		<main className="noScrollBar" ref={props.passedRef} style={mainStyle}>
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
				<Route path='/:companyName-:companyId/*' element={<CompanyContent />} />
				<Route path='/cart/:id' element={<Cart/>} />
				<Route path={"/success/:stripeId/:sessionId/"} element={<PaymentSuccess />} /> {/* NOTE: UserId med i urlen? */}
			</Routes>
		</main>
    );
}

const mainStyle: CSSProperties = {
  minHeight: "85%",
  overflowY: "auto"
}

