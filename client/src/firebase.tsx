import * as firebase from 'firebase/app'
import { getFirestore } from "firebase/firestore"

import "firebase/firestore"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_fbApiKey,
    authDomain: process.env.REACT_APP_fbAuthDomain,
    projectId: process.env.REACT_APP_fbProjectId,
    storageBucket: process.env.REACT_APP_fbStorageBucket,
    messagingSenderId: process.env.REACT_APP_fbMessagingSenderId,
    appId: process.env.REACT_APP_fbAppId,
    measurementId: process.env.REACT_APP_fbMeasurementId
  };

  const initFireBase = firebase.initializeApp(firebaseConfig);

  const db = getFirestore(initFireBase);
 
  const firebaseCollection = {
    db
  }
  export default firebaseCollection
