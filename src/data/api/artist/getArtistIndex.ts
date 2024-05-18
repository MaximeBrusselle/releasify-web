import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ArtistDetail } from "../../artists/artistTypes";

export const getArtistIndex = async (artistId: string): Promise<any> => {
	try {
		const result = await getDoc(doc(db, "artists", artistId));
		if (result.exists()) {
			return result.data() as ArtistDetail;
		} else {
			return {
				code: 404,
				message: "Label not found",
			};
		}
	} catch (error: any) {
		return {
			code: error.code,
			message: error.message,
		};
	}
};
