import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";

export const getUserData = async (): Promise<any> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not logged in");
    }
    //check if in localstorage
    const cachedUserData = localStorage.getItem("userData");
    if (cachedUserData) {
        return JSON.parse(cachedUserData);
    }
    const result = await getDoc(doc(db, "userData", user.uid));
    if (result.exists()) {
        return result.data()
    } else {
        throw new Error("User data not found");
    }
}