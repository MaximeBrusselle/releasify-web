import { auth, db } from "@/auth/firebase";
import { EditReleaseDetails } from "@/pages/dashboard/forms/EditRelease";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import imgbbUpload from "../other/imgbbUpload";
import { CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { formatDateToYYYYMMDD } from "@/lib/utils";

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

export async function editRelease(data: EditReleaseDetails, originalData: EditReleaseDetails, userType: string): Promise<any> {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error("User not found");
		if (userType === "user") throw new Error("You do not have releases");
		const userData = localStorage.getItem("userData");
		const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
		let segments;
		if (userType === "artist") {
			segments = parsedUserData?.artistObject._key.path.segments;
		} else {
			segments = parsedUserData?.labelObject._key.path.segments;
		}
		const objectId = segments[segments.length - 1];
		const docRef = doc(db, `${userType}s`, objectId);
		const result = await getDoc(docRef);
		if (result.exists()) {
			let coverArt: string = "https://i.ibb.co/8m050zG/default.png";
			if (typeof data.picture === "string" && originalData.picture === data.picture) {
				coverArt = data.picture as string;
			} else if (data.picture instanceof File) {
				try {
					coverArt = await imgbbUpload(data.picture);
				} catch (error: any) {
					console.error(`Failed to upload profile: ${error}`);
					coverArt = "https://i.ibb.co/8m050zG/default.png";
				}
			}
			let createdArtists: CreatedArtist[] = [];
			for (const newArtist of data.newArtists) {
				let pfp: string = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
				if (typeof newArtist.profilePicture === "string") {
					pfp = newArtist.profilePicture as string;
				} else if (newArtist.profilePicture instanceof File) {
					try {
						pfp = await imgbbUpload(newArtist.profilePicture);
					} catch (error: any) {
						console.error(`Failed to upload profile: ${error}`);
						pfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
					}
				}
				createdArtists.push({
					artistName: newArtist.artistName,
					profilePicture: pfp,
				});
			}
			let artistRefs = [];
			for (const artist of data.artists) {
				if (!artist.id || artist.id.startsWith("notExists")) {
					if(!createdArtists.some((el) => el.artistName === artist.artistName && el.profilePicture === artist.profilePicture)) createdArtists.push({ artistName: artist.artistName, profilePicture: artist.profilePicture});
					continue;
				} else {
					const artistRef = doc(db, "artists", artist.id);
					artistRefs.push(artistRef);
				}
			}
			if(userType === "artist") {
				const artistRef = doc(db, "artists", objectId);
				artistRefs.push(artistRef);
			}
			const artistsRemove = originalData.artists.filter((artist) => artist.id && !artist.id.startsWith("notExists") && !data.artists.map((el) => el.id).includes(artist.id));
			const artistsAdd = data.artists.filter((artist) => artist.id && !artist.id.startsWith("notExists") && !originalData.artists.map((el) => el.id).includes(artist.id));
			const allArtists: any[] = artistRefs.concat(createdArtists as any[]);
			const newRelease = {
				name: data.name,
				description: data.description,
				releaseDate: typeof data.releaseDate === "string" ? data.releaseDate : formatDateToYYYYMMDD(data.releaseDate!),
				urls: data.urls,
				genres: data.genreList,
				picture: coverArt,
				artists: allArtists,
			};
			const releaseRef = doc(db, "releases", data.id);
			await updateDoc(releaseRef, newRelease);
			for (const artist of artistsRemove) {
				const artistRef = doc(db, "artists", artist.id);
				await updateDoc(artistRef, {
					releases: arrayRemove(releaseRef),
				});
			}
			for (const artist of artistsAdd) {
				const artistRef = doc(db, "artists", artist.id);
				await updateDoc(artistRef, {
					releases: arrayUnion(releaseRef),
				});
			}
			if(userType === "artist") {
				const artistRef = doc(db, "artists", objectId);
				await updateDoc(artistRef, {
					releases: arrayUnion(releaseRef),
				});
			}
			return {
				code: "success",
				message: "Release edited successfully",
			};
		} else {
			throw new Error(`Unable to access ${userType} data`);
		}
	} catch (error: any) {
		return {
			code: "release/edit-failed",
			message: error.message,
		};
	}
}
