import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore/lite"
import { config } from './config';

const firebase = initializeApp(config.fbSettings)
export const fb = getFirestore(firebase)












