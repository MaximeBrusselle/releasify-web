import { db } from "@/auth/firebase";
import { getDocs, collection } from "firebase/firestore";
import { ArtistDetail } from "../artists/artistTypes";

export const getArtists = async (): Promise<ArtistDetail[]> => {
	try {
        const result = await getDocs(collection(db, "artists"));
        if (result) {
            return result.docs.map((doc) => doc.data() as ArtistDetail);
        } else {
            throw new Error("Artist not found");
        }
    } catch (error: any) {
        throw new Error(error);
    }
};
