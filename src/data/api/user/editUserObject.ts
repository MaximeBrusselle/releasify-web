import { auth, db } from "@/auth/firebase";
import { UserObjectDetails } from "@/pages/dashboard/forms/EditUserObjectDetails";
import imgbbUpload from "../other/imgbbUpload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export async function editUserObject(data: UserObjectDetails, userType: string): Promise<any> {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User not logged in.");
		}
		if (userType === "user") {
			throw new Error("User cannot edit user object.");
		}
		const objectRef = doc(db, `${userType}s`, data.objectId);
		const object = await getDoc(objectRef);
		if (!object.exists()) {
			throw new Error("User object not found.");
		}
		const objectData = object.data();
		let pfp: string = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
		if (typeof data.profilePicture === "string" && objectData.profilePicture === data.profilePicture) {
			pfp = data.profilePicture as string;
		} else if (data.profilePicture instanceof File) {
			try {
				pfp = await imgbbUpload(data.profilePicture);
			} catch (error: any) {
				console.error(`Failed to upload profile: ${error}`);
				pfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
			}
		}
		let banner: string = "https://i.ibb.co/yBvCgT5/default-banner.jpg";
		if (typeof data.bannerPicture === "string" && objectData.bannerPicture === data.bannerPicture) {
			banner = data.bannerPicture as string;
		} else if (data.bannerPicture instanceof File) {
			try {
				banner = await imgbbUpload(data.bannerPicture);
			} catch (error: any) {
				console.error(`Failed to upload banner picture: ${error}`);
				banner = "https://i.ibb.co/yBvCgT5/default-banner.jpg";
			}
		}
		let newObject: any = {
			socials: data.urls,
			genres: data.genreList,
			profilePicture: pfp,
			bannerPicture: banner,
		};
		if (userType === "artist") {
			newObject["artistName"] = data.name;
			newObject["bookingEmail"] = data.contactEmail;
		}
		if (userType === "label") {
			newObject["name"] = data.name;
			newObject["contactEmail"] = data.contactEmail;
		}
		if (userType === "artist" && data.realName !== "") {
			newObject["realName"] = data.realName;
		}
		if (data.description !== "") {
			newObject["description"] = data.description;
		}
		await updateDoc(objectRef, {
			...newObject,
		});
		await updateProfile(auth.currentUser!, {
			displayName: data.name,
			photoURL: pfp,
		});
		return { code: "success", message: "User object updated." };
	} catch (error: any) {
		return { code: "error", message: error.message };
	}
}
