import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ArtistDetail } from "../artists/artistTypes";

export const getArtistById = async (artistId: string): Promise<ArtistDetail> => {
	try {
        const result = await getDoc(doc(db, "artists", artistId));
        if (result.exists()) {
            return result.data() as ArtistDetail;
        } else {
            throw new Error("Artist not found");
        }
    } catch (error: any) {
        throw new Error(error);
    }
};
