import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore/lite"
import { fb } from "../fb";


export async function getUserList() {
    const userCol = collection(fb, 'users');
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return console.log(userList);
}


