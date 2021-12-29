import React, { useEffect, useState } from 'react';
import Layout from './components/layout/layout';
import firebaseCollection from './firebase';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore"; 
interface User {
    firstName: string,
    lastName: string,
    userName: string
}

function App() {

	const [users, setUsers] = useState<User[]>()

	
	console.log(firebaseCollection.db)

	async function getUsers() {

		const userCol = collection(firebaseCollection.db, 'users');
		const userSnapshot = await getDocs(userCol);
		const userList = userSnapshot.docs.map(doc => doc.data() as User);
		setUsers(userList)
		
  	}

	useEffect(() => {
		getUsers()
	}, [])
	console.log(users)
	
  return (
    <Layout />
  );
}

export default App;
