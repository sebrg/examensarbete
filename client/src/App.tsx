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



function App() {

	/* const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'
	const [stripeAccount, setStripeAccount] = useState<string>("") */
	/* const [stripePromise, setStripePromise] = useState(() => loadStripe(stripePK, {stripeAccount: stripeAccount})) */


/* 	useEffect(() => {
		console.log(stripeAccount, "in app")
    }, [stripeAccount])
 */
	
/* 	const stripePromise = loadStripe(stripePK, {
		stripeAccount: stripeAccount
	}) */

	return (
			<FirebaseProvider>
				<CompanyProvider>
					<ProductProvider>
						<BrowserRouter>
							<Layout /* stripeOptions={{stripeAccount, setStripeAccount}} *//>  
						</BrowserRouter>
					</ProductProvider>
				</CompanyProvider>
			</FirebaseProvider>
  );
}

export default App;
