import { db } from "@/auth/firebase";
import { getDocs, collection } from "firebase/firestore";
import { ReleaseIndex } from "../releases/releaseTypes";

export const getArtists = async (): Promise<ReleaseIndex[]> => {
	try {
        const result = await getDocs(collection(db, "releases"));
        if (result) {
            return result.docs.map((doc) => doc.data() as ReleaseIndex);
        } else {
            throw new Error("Artist not found");
        }
    } catch (error: any) {
        throw new Error(error);
    }
};
