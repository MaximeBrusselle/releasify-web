import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/auth/firebase";

export const removeRelease = async (releaseId: string): Promise<void> => {
    try {
        // Attempt to delete the document
        await deleteDoc(doc(db, "release", releaseId));

        // Attempt to read the document to confirm deletion
        const docRef = doc(db, "release", releaseId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            throw new Error("Failed to delete the release");
        }

    } catch (error: any) {
        throw new Error(error.message || "An error occurred during deletion");
    }
};