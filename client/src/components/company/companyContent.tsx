import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import { Routes, Route } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import ReqAuth from '../functions/reqAuth';
import CompanyPage from './companyPage';
import SingleProduct from './singleProduct';
import Cart from '../cart/cart';


export default function CompanyContent() {

    return (
			<Routes>
				<Route index element={<CompanyPage/>} />
				<Route path=':productName-:productId' element={<SingleProduct/>} />
			</Routes>
    );
}
