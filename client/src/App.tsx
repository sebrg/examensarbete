import React, { useEffect, useState } from 'react';
import Layout from './components/layout/layout';
import FirebaseProvider from './context/firebaseProvider';
import { BrowserRouter } from 'react-router-dom';




function App() {

	return (
		<FirebaseProvider>
			<BrowserRouter>
				<Layout />  
			</BrowserRouter>
		</FirebaseProvider>
	);
}

export default App;
