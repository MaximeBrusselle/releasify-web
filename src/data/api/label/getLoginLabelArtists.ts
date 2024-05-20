import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { getArtistIndex } from "../artist/getArtistIndex";
import { LabelDetail } from "@/data/labels/labelTypes";

type UserData = {
	labelObject: {
		_key: {
			path: {
				segments: string[];
			};
		};
	};
};

export type { UserData };

export const getLoginLabelArtists = async (userType: string): Promise<any> => {
	const user = auth.currentUser;
	if (!user) {
		throw new Error("User not logged in");
	}
	if (userType !== "label") {
		throw new Error("You can't have artists");
	}
	const userData = localStorage.getItem("userData");
	const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
	const segments = parsedUserData?.labelObject._key.path.segments;
	const objectId = segments[segments.length - 1];
	const result = await getDoc(doc(db, "labels", objectId));
	if (result.exists()) {
		const artistRefs = result.data().artists;
		const artists: ArtistDetail[] = [];
		for (const artistRef of artistRefs) {
			const artistId = artistRef.id;
			if (!artistId) {
				artists.push({
					id: `notExists${artistRef.artistName}`,
					artistName: artistRef.artistName,
					profilePicture: artistRef.profilePicture,
					bannerPicture: "",
					socials: [],
					genres: [],
					releases: [],
					label: result.data() as LabelDetail,
				});
				continue;
			}
			const artist = await getArtistIndex(artistId);
			artists.push({
				...artist,
				label: result.data() as LabelDetail,
			});
		}
		return artists;
	} else {
		throw new Error("Unable to access data");
	}
};

type LabelArtist = {
	artistName: string;
	profilePicture: string;
};
export type { LabelArtist };
