import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import Start from './start';
import MyPages from './myPages';
import UserNotFound from './userNotFound';
import ReqUserAuth from '../functions/reqUserAuth';
import Cart from '../cart/cart';
import CompanyContent from '../company/companyContent';
import PaymentSuccess from '../cart/paymentSuccess';
import AdminView from '../admin/adminView';
import ReqAdminAuth from '../functions/reqAdminAuth';
import { UserContext, UserOptions } from '../../context/users/userContext';
import PaymentCancel from '../cart/paymentCancel';


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
					path='/myPages/:userId/*' 
					element={
						<ReqUserAuth isLoggedIn={props.isLoggedIn}>
							<MyPages />
						</ReqUserAuth>
					} 
				/>
				<Route path='/userNotFound' element={<UserNotFound/>} />
				<Route path='/:companyName-:companyId/*' element={<CompanyContent />} />
				<Route path='/cart/:userId' element={<Cart/>} />
				<Route path={"/success/:stripeId/:sessionId/"} element={<PaymentSuccess />} />
				<Route path={"/cancel/:stripeId/:sessionId/"} element={<PaymentCancel />} />  			
				<Route path='/admin/*' element={
					<ReqAdminAuth >
						<AdminView />
					</ReqAdminAuth>
				}/>
			</Routes>
		</main>
    );
}

const mainStyle: CSSProperties = {
  minHeight: "85%",
  overflowY: "auto"
}

