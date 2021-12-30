import React, { useEffect, useState } from 'react';
import Layout from './components/layout/layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//import firebaseCollection from './firebase';
//import { getFirestore } from "firebase/firestore"
//import { collection, doc, getDocs, setDoc } from "firebase/firestore"; 
import FirebaseProvider from './context/firebaseProvider';


/* interface User {
    firstName: string,
    lastName: string,
    userName: string,
	id: string
} */

function App() {

  let stripePromise = loadStripe("pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5")

  return (
    <Elements stripe={stripePromise}>
    <FirebaseProvider>
      <Layout />
    </FirebaseProvider>
    </Elements>
  );
}

export default App;
