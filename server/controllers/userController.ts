import { getFirestore, collection, getDocs, Firestore, doc, setDoc } from "firebase/firestore/lite"
import { firestore } from "../fb";

export async function getUserList() {
    const userCol = collection(firestore, 'users');
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return console.log(userList);
}

export const addUser = async (req, res, next) => {
    console.log("Got to add")
    try {
        const data = {
            firstName: "kalle",
            lastName: "svensson",
            userName: "kalleMan"
        }

        const usersRef = doc(firestore, "users", "id..")
        await setDoc(usersRef, data, { merge: true })
        res.send("woohoo")
    } catch (error) {
        res.status(400).send(error.message);
    }
}