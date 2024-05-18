import { doSignOut } from "@/auth/auth";
import { auth, db } from "@/auth/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteCreatedUser = async (): Promise<void> => {
	try {
        const userId = localStorage.getItem("userId");
        localStorage.removeItem("userId");
        if (!userId) {
            throw new Error("User not found");
        }
        await doSignOut();
        await auth.currentUser?.delete();
        await deleteDoc(doc(db, "userData", userId));
    } catch (error: any) {
        throw new Error(error);
    }
};
