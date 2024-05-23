import imgbbUpload from "@/data/api/other/imgbbUpload";
import { db, auth } from "@/auth/firebase";
import { doc, getDoc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { UserData } from "./getLoginUserReleases";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { LabelAddReleaseData } from "@/pages/dashboard/forms/LabelAddRelease";

export const addReleaseAsLabel = async (data: LabelAddReleaseData): Promise<any> => {
	const user = auth.currentUser;
	if (!user) {
		return {
			code: "auth/not-logged-in",
			message: "User is not logged in",
		};
	}
	//get artist object
	const userData = localStorage.getItem("userData");
	const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
	const segments = parsedUserData?.labelObject._key.path.segments;
	const artistId = segments[segments.length - 1];
	const currentLabelRef = doc(db, "labels", artistId);
	const labelBefore = await getDoc(currentLabelRef);
	if (!labelBefore) {
		return {
			code: "label/not-found",
			message: "Label not found",
		};
	}
	//upload cover picture
	let coverPicture;
	if (data.picture) {
		try {
			coverPicture = await imgbbUpload(data.picture);
		} catch (error) {
			console.error(`Failed to upload cover picture: ${error}`);
			coverPicture = "https://i.ibb.co/8m050zG/default.png";
		}
	} else {
		coverPicture = "https://i.ibb.co/8m050zG/default.png";
	}
	let myArtists = [];
	for (const artist of data.myArtists) {
		if(artist.id.startsWith("notExists")) {
			myArtists.push({
				artistName: artist.artistName,
				profilePicture: artist.profilePicture,
			})
			continue;
		};
		const artistRef = doc(db, "artists", artist.id);
		myArtists.push(artistRef);
	}

	//get artist references
	let artistRefs = [];
	for (const artistId of data.otherArtists) {
		const artist = doc(db, "artists", artistId);
		artistRefs.push(artist);
	}

	// upload images for new artists
	let newArtists: any = [];
	for (const artist of data.newArtists) {
		let profilePicture;
		if (artist.profilePicture && typeof artist.profilePicture !== "string") {
			try {
				profilePicture = await imgbbUpload(artist.profilePicture);
			} catch (error) {
				console.error(`Failed to upload artist picture: ${error}`);
				profilePicture = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
			}
		} else {
			profilePicture = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
		}
		const newArtist = {
			artistName: artist.artistName,
			profilePicture: profilePicture,
		};
		newArtists.push(newArtist);
	}

	const releaseArtists = artistRefs.concat(newArtists).concat(myArtists as any[]);
	const newRelease: any = {
		name: data.name,
		picture: coverPicture,
		releaseDate: formatDateToYYYYMMDD(data.releaseDate || new Date()),
		announcementDate: formatDateToYYYYMMDD(data.announcementDate || new Date()),
		genres: data.genreList,
		description: data.description,
		artists: releaseArtists,
		urls: data.urls,
		label: currentLabelRef,
	};
	const releaseRef = await addDoc(collection(db, "releases"), newRelease);
	const createdId = releaseRef.id;
	await updateDoc(releaseRef, { id: createdId });

	try {
		await updateDoc(currentLabelRef, { releases: arrayUnion(releaseRef) });
		for (const artistRef of artistRefs) {
			await updateDoc(artistRef, { releases: arrayUnion(releaseRef) });
		}

		return {
			code: "success",
			message: "Release added successfully",
		};
	} catch (error: any) {
		return {
			code: "label/update-failed",
			message: error,
		};
	}
};
