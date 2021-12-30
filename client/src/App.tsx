import React, { useEffect, useState } from 'react';
import Layout from './components/layout/layout';
import FirebaseProvider from './context/firebaseProvider';




function App() {

	return (
		<FirebaseProvider>
			<Layout />
		</FirebaseProvider>
	);
}

export default App;
