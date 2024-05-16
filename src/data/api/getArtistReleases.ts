import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ReleaseIndex } from "../releases/releaseTypes";
import { getArtistById } from "./getArtistById";

type UserData = {
    artistObject: {
        _key: {
            path: {
                segments: string[];
            };
        };
    };
}

export const getArtistReleases = async (): Promise<any> => {
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
		const releases = result.data().releases.map(async(release: any) => {
			const artistObjects = await getArtistsFromReference(release);
			return {
				...release,
				artists: artistObjects
			}
		});
		return Promise.all(releases);
	} else {
		throw new Error("User data not found");
	}
};

async function getArtistsFromReference(release: ReleaseIndex) {
	const artistObjects = release.artists.map(async (ref: any) => {
		const releaseArtistId = ref.id;
		try {
			return await getArtistById(releaseArtistId);
		} catch (error: any) {
			throw new Error(error);
		}
		
	});
	return Promise.all(artistObjects);
}
