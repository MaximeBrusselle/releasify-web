import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ArtistDetail } from "../artists/artistTypes";
import { UserData } from "./getLoginUserReleases";

export const getLoggedInArtist = async (): Promise<ArtistDetail[]> => {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User not logged in");
		}
		const userData = localStorage.getItem("userData");
		const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
		const segments = parsedUserData?.artistObject._key.path.segments;
		const artistId = segments[segments.length - 1];
		const result = await getDoc(doc(db, "artists", artistId));
		if (result.exists()) {
			return result.data() as ArtistDetail[];
		} else {
			throw new Error("Artist not found");
		}
	} catch (error: any) {
		throw new Error(error);
	}
};
