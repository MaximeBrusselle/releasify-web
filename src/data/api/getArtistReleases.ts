import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ReleaseIndex } from "../releases/releaseTypes";
import { getArtistById } from "./getArtistById";
import { getReleaseById } from "./getReleaseById";
import { getLabelById } from "./getLabelById";

type UserData = {
    artistObject: {
        _key: {
            path: {
                segments: string[];
            };
        };
    };
}

export type { UserData };

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
		// first transform the releases to the correct data and not references
		const releases = await getReleasesFromReference(result.data().releases);
		// then get the artists from the releases
		const artistObjects = releases.map(async (release: ReleaseIndex) => {
			const artists = await getArtistsFromReference(release);
			const label = await getLabelFromReference(release.label);
			return {
				...release,
				artists: artists,
				label: label,
			};
		});
		return Promise.all(artistObjects);
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

async function getReleasesFromReference(releaseRefs: any) {
	const releases = releaseRefs.map(async (ref: any) => {
		const releaseId = ref.id;
		try {
			return await getReleaseById(releaseId);
		} catch (error: any) {
			throw new Error(error);
		}
	});
	return Promise.all(releases);
}

async function getLabelFromReference(labelRef: any) {
	const labelId = labelRef.id;
	try {
		return await getLabelById(labelId);
	} catch (error: any) {
		throw new Error(error);
	}
}
