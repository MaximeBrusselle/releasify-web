import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";

export const getUserData = async (): Promise<any> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not logged in");
    }
    const result = await getDoc(doc(db, "userData", user.uid));
    if (result.exists()) {
        return result.data()
    } else {
        throw new Error("User data not found");
    }
}