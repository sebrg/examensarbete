import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore/lite"
import { firestore } from "../fb";


export async function getUserList() {
    const userCol = collection(firestore, 'users');
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return console.log(userList);
}


