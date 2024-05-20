import { doc, getDoc, updateDoc, arrayRemove, deleteField } from "firebase/firestore";
import { auth, db } from "@/auth/firebase";
import { ArtistDetail } from "@/data/artists/artistTypes";

type UserData = {
	labelObject: {
		_key: {
			path: {
				segments: string[];
			};
		};
	};
};

export const removeArtistFromLabel = async ({userType, artistId, artist}: {userType: string, artistId?: string, artist?: ArtistDetail}): Promise<void> => {
	try {
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
        if (!result.exists()) {
            throw new Error("Unable to access label data");
        }
		if (artistId) {
			const artistDocRef = doc(db, "artists", artistId);
			const artistDocSnapshot = await getDoc(artistDocRef);
			if (artistDocSnapshot.exists()) {
				const artistData = artistDocSnapshot.data();
				if (!artistData) {
                    throw new Error("No artist data found");
                }
                await updateDoc(artistDocRef, {
                    label: deleteField(),
                });
			} else {
                throw new Error("Artist not found");
            }
            await updateDoc(doc(db, "labels", objectId), {
                artists: arrayRemove(artistDocRef),
            });
		} else if (artist) {
            await updateDoc(doc(db, "labels", objectId), {
                artists: arrayRemove({
                    artistName: artist.artistName,
                    profilePicture: artist.profilePicture,
                }),
            });
		}
	} catch (error: any) {
		throw new Error(error.message || "An error occurred during removal");
	}
};
