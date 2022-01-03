import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import Start from './start';
import MyPages from './myPages';




export default function Main() {

   



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