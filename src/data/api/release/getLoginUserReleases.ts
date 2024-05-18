import { auth, db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ReleaseIndex } from "../../releases/releaseTypes";
import { getArtistById } from "../artist/getArtistById";
import { getReleaseById } from "./getReleaseById";
import { getLabelById } from "../label/getLabelById";

type UserData = {
	artistObject: {
		_key: {
			path: {
				segments: string[];
			};
		};
	};
	labelObject: {
		_key: {
			path: {
				segments: string[];
			};
		};
	};
};

export type { UserData };

export const getLoginUserReleases = async (userType: string): Promise<any> => {
	const user = auth.currentUser;
	if (!user) {
		throw new Error("User not logged in");
	}
	if (userType === "user") {
		throw new Error("You can't have releases");
	}
	const userData = localStorage.getItem("userData");
	const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
	let segments;
	if (userType === "artist") {
		segments = parsedUserData?.artistObject._key.path.segments;
	} else {
		segments = parsedUserData?.labelObject._key.path.segments;
	}
	const objectId = segments[segments.length - 1];
	const result = await getDoc(doc(db, `${userType}s`, objectId));
	if (result.exists()) {
		// first transform the releases to the correct data and not references
		const releases = await getReleasesFromReference(result.data().releases);
		// then get the artists from the releases
		const fullRelease = releases.map(async (release: ReleaseIndex) => {
			const artists = await getArtistsFromReference(release);
			const label = await getLabelFromReference(release.label);
			return {
				...release,
				artists: artists,
				label: label,
			};
		});
		return Promise.all(fullRelease);
	} else {
		throw new Error("Unable to access data");
	}
};

export async function getArtistsFromReference(release: ReleaseIndex) {
	const artistObjects = release.artists.map(async (ref: any) => {
		const releaseArtistId = ref.id;
		if(!releaseArtistId) {
			return ref;
		}
		try {
			return await getArtistById(releaseArtistId);
		} catch (error: any) {
			throw new Error(error);
		}
	});
	return Promise.all(artistObjects);
}

export async function getReleasesFromReference(releaseRefs: any): Promise<ReleaseIndex[]> {
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

export async function getLabelFromReference(labelRef: any) {
	if (!labelRef) {
		return null;
	}
	const labelId = labelRef.id;
	if(!labelId) {
		return labelRef;
	}
	try {
		return await getLabelById(labelId);
	} catch (error: any) {
		throw new Error(error);
	}
}
