import React, { useEffect, useState } from 'react';
import Layout from './components/layout/layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FirebaseProvider from './context/firebaseProvider';
import { BrowserRouter } from 'react-router-dom';




function App() {

  let stripePromise = loadStripe("pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5")


	return (
		<Elements stripe={stripePromise}>
			<FirebaseProvider>
				<BrowserRouter>
					<Layout />  
				</BrowserRouter>
			</FirebaseProvider>
		</Elements>
  );
}

export default App;
