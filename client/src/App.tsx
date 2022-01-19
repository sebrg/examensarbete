import React, { useContext, useEffect, useMemo, useState } from 'react';
import Layout from './components/layout/layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FirebaseProvider from './context/firebaseProvider';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from './context/firebaseContext';
import { DocumentData } from 'firebase/firestore';
import ProductProvider from './context/products/productProvider';
import CompanyProvider from './context/companies/companyProvider';
import UserProvider from './context/users/userProvider';



function App() {

	return (
			<FirebaseProvider>
				<UserProvider>
					<CompanyProvider>
						<ProductProvider>
							<BrowserRouter>
								<Layout />  
							</BrowserRouter>
						</ProductProvider>
					</CompanyProvider>
				</UserProvider>
			</FirebaseProvider>
  );
}

export default App;
