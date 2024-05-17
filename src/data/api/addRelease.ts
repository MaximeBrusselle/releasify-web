import imgbbUpload from "@/data/api/imgbbUpload";
import { db, auth } from "@/auth/firebase";
import { doc, getDoc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { AddReleaseData } from "@/pages/dashboard/artist/forms/ArtistAddRelease";
import { UserData } from "./getLoginUserReleases";
import { formatDateToYYYYMMDD } from "@/lib/utils";

export const addRelease = async (data: AddReleaseData): Promise<any> => {
	//TODO: Add release to all collaborators
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
	const segments = parsedUserData?.artistObject._key.path.segments;
	const artistId = segments[segments.length - 1];
	const currentArtistRef = doc(db, "artists", artistId);
	const artistBefore = await getDoc(currentArtistRef);
	if (!artistBefore) {
		return {
			code: "artist/not-found",
			message: "Artist not found",
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

	//if createdLabel
	let createdLabel;
	if (data.newLabel) {
		//upload label picture
		let labelPicture;
		if (data.newLabel.profilePicture) {
			try {
				labelPicture = await imgbbUpload(data.newLabel.profilePicture!);
			} catch (error) {
				console.error(`Failed to upload label picture: ${error}`);
				labelPicture = "https://i.ibb.co/8m050zG/default.png";
			}
		} else {
			labelPicture = "https://i.ibb.co/8m050zG/default.png";
		}
		createdLabel = {
			name: data.newLabel.name,
			profilePicture: labelPicture,
			genres: data.newLabel.genres,
		};
	}
	let chosenLabelRef;
	if (data.label) {
		try {
			chosenLabelRef = doc(db, "labels", data.label);
		} catch (error) {
			console.error(`Failed to get label: ${error}`);
			return {
				code: "label/not-found",
				message: "Label not found",
			};
		}
	}

	//get artist references
	let artistRefs = [];
	for (const artistId of data.releaseArtists) {
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
				profilePicture = "https://i.ibb.co/8m050zG/default.png";
			}
		} else {
			profilePicture = "https://i.ibb.co/8m050zG/default.png";
		}
		const newArtist = {
			artistName: artist.artistName,
			profilePicture: profilePicture,
		};
		newArtists.push(newArtist);
	}

	const releaseArtists = artistRefs.concat(newArtists).concat([currentArtistRef] as any[]);
	const newRelease: any = {
		name: data.name,
		picture: coverPicture,
		releaseDate: formatDateToYYYYMMDD(data.releaseDate || new Date()),
		announcementDate: formatDateToYYYYMMDD(data.announcementDate || new Date()),
		genres: data.genreList,
		description: data.description,
		artists: releaseArtists,
		urls: data.urls,
	};
	if (data.label) {
		newRelease.label = chosenLabelRef;
	} else if (createdLabel) {
		newRelease.label = createdLabel;
	}
	const releaseRef = await addDoc(collection(db, "releases"), newRelease);
	const createdId = releaseRef.id;
	await updateDoc(releaseRef, { id: createdId });

	try {
		await updateDoc(currentArtistRef, { releases: arrayUnion(releaseRef) });
		for (const artistRef of artistRefs) {
			await updateDoc(artistRef, { releases: arrayUnion(releaseRef) });
		}
		if (data.label) {
			await updateDoc(chosenLabelRef!, { releases: arrayUnion(releaseRef) });
		}

		return {
			code: "success",
			message: "Release added successfully",
		};
	} catch (error: any) {
		return {
			code: "artist/update-failed",
			message: error,
		};
	}
};
