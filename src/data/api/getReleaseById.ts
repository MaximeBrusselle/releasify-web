import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ReleaseIndex } from "../releases/releaseTypes";

export const getReleaseById = async (releaseId: string): Promise<ReleaseIndex> => {
	try {
        const result = await getDoc(doc(db, "releases", releaseId));
        if (result.exists()) {
            return result.data() as ReleaseIndex;
        } else {
            throw new Error("Label not found");
        }
    } catch (error: any) {
        throw new Error(error);
    }
};