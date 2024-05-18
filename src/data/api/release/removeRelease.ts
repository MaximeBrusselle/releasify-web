import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/auth/firebase";

export const removeRelease = async (releaseId: string): Promise<void> => {
	try {
		const docRef = doc(db, "releases", releaseId);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			// for every artist that is a reference in the release, remove the release from the artist's releases
			const artistRefs = docSnapshot.data().artists;
			artistRefs.forEach(async (artistRef: any) => {
				const artistDocRef = doc(db, artistRef.path);
				const artistDocSnapshot = await getDoc(artistDocRef);
				if (artistDocSnapshot.exists()) {
					const artistData = artistDocSnapshot.data();
					const updatedReleases = artistData.releases.filter((release: any) => release.path !== docRef.path);
					await updateDoc(artistDocRef, {
						releases: updatedReleases,
					});
				}
			});

			// remove the release from the label's releases
			const labelRef = docSnapshot.data().label;
			if (labelRef) {
				const labelDocRef = doc(db, labelRef.path);
				const labelDocSnapshot = await getDoc(labelDocRef);
				if (labelDocSnapshot.exists()) {
					const labelData = labelDocSnapshot.data();
					const updatedReleases = labelData.releases.filter((release: any) => release.path !== docRef.path);
					await updateDoc(labelDocRef, {
						releases: updatedReleases,
					});
				}
			}

            // remove the actual release
            await deleteDoc(docRef);
		} else {
            throw new Error("Release not found");
        }
	} catch (error: any) {
		throw new Error(error.message || "An error occurred during deletion");
	}
};
