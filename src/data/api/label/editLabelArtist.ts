import { auth, db } from "@/auth/firebase";
import { EditArtistDetails } from "@/pages/dashboard/forms/EditArtist";
import imgbbUpload from "../other/imgbbUpload";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { UserData } from "./getLoginLabelArtists";

export async function editLabelArtist(data: EditArtistDetails, originalData: EditArtistDetails): Promise<any> {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User not logged in");
		}
		const userData = localStorage.getItem("userData");
		const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
		const segments = parsedUserData?.labelObject._key.path.segments;
		const objectId = segments[segments.length - 1];
		const labelDoc = await getDoc(doc(db, "labels", objectId));
		if (labelDoc.exists()) {
			const label = labelDoc.data();
			let pfp: string = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
			if (typeof data.profilePicture === "string" && originalData.profilePicture === data.profilePicture) {
				pfp = data.profilePicture as string;
			} else if (data.profilePicture instanceof File) {
				try {
					pfp = await imgbbUpload(data.profilePicture);
				} catch (error: any) {
					console.error(`Failed to upload profile: ${error}`);
					pfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
				}
			}
			if (data.id.startsWith("notExists")) {
				await updateDoc(doc(db, "labels", objectId), {
                    artists: arrayRemove({
                        artistName: originalData.name,
                        profilePicture: originalData.profilePicture,
                    }),
                });
                await updateDoc(doc(db, "labels", objectId), {
                    artists: arrayUnion({
                        artistName: data.name,
                        profilePicture: pfp,
                    }),
                });
				return {
					code: "success",
					message: "Artist updated",
				};
			} else {
				let banner: string = "https://i.ibb.co/yBvCgT5/default-banner.jpg";
				if (typeof data.bannerPicture === "string" && originalData.bannerPicture === data.bannerPicture) {
					banner = data.bannerPicture as string;
				} else if (data.bannerPicture instanceof File) {
					try {
						banner = await imgbbUpload(data.bannerPicture);
					} catch (error: any) {
						console.error(`Failed to upload banner picture: ${error}`);
						banner = "https://i.ibb.co/yBvCgT5/default-banner.jpg";
					}
				}
				const artistRef = label.artists.find((artist: any) => artist.id === originalData.id);
				await updateDoc(artistRef, {
					artistName: data.name,
					realName: data.realName,
					description: data.description,
					profilePicture: pfp,
					bannerPicture: banner,
					bookingEmail: data.bookingEmail,
					socials: data.urls,
					genres: data.genreList,
				});
				return {
					code: "success",
					message: "Artist updated",
				};
			}
		} else {
			throw new Error("Unable to access data");
		}
	} catch (error: any) {
		return {
			code: "label/edit-artist-error",
			message: error.message,
		};
	}
}
