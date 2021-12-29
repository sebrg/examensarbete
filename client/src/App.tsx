import React, { useEffect, useState } from 'react';
import Layout from './components/layout/layout';
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

  return (
	<FirebaseProvider>
		<Layout />
	</FirebaseProvider>
  );
}

export default App;
