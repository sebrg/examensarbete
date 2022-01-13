import React, { useContext, useEffect, useState } from 'react';
import Layout from './components/layout/layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FirebaseProvider from './context/firebaseProvider';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from './context/firebaseContext';
import { DocumentData } from 'firebase/firestore';
import ProductProvider from './context/products/productProvider';




function App() {

  	const stripePromise = loadStripe("pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5")
	//const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
	//const [allProducts, setAllProducts] = useState<undefined | DocumentData[]>(undefined)
	 


	return (
		<Elements stripe={stripePromise}>
			<FirebaseProvider>
				<ProductProvider>
					<BrowserRouter>
						<Layout />  
					</BrowserRouter>
				</ProductProvider>
			</FirebaseProvider>
		</Elements>
  );
}

export default App;
