import { FireBaseError, doCreateUserWithEmailAndPassword } from "@/auth/auth";
import { ArtistRegistrationData } from "@/pages/account/register/ArtistRegistration";
import imgbbUpload from "@/data/api/other/imgbbUpload";
import { db } from "@/auth/firebase";
import { collection, addDoc, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import toast from "react-hot-toast";

export const registerArtist = async (data: ArtistRegistrationData): Promise<any> => {
	try {
		let pfp;
		if (data.profilePicture) {
			try {
				pfp = await imgbbUpload(data.profilePicture!);
			} catch (error) {
				console.error(`Failed to upload profile picture: ${error}`);
				pfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
			}
		} else {
			pfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
		}
		localStorage.setItem("pfp", pfp);
		localStorage.setItem("userType", "artist");
		const result: UserCredential | FireBaseError = await doCreateUserWithEmailAndPassword(data.email, data.password, data.artistname, pfp);
		if ("message" in result && "code" in result) {
			return {
				code: result.code,
				message: result.message,
			};
		}

		let banner;
		if (data.bannerPicture) {
			try {
				banner = await imgbbUpload(data.bannerPicture!);
			} catch (error) {
				console.error(`Failed to upload banner picture: ${error}`);
				banner = "https://i.ibb.co/MM4463X/default-banner.jpg";
			}
		} else {
			banner = "https://i.ibb.co/MM4463X/default-banner.jpg";
		}

		let labelRef;
		if (data.labelType.viewType === "label") {
			labelRef = doc(db, "labels", data.label!.id!);
		}
		let createdLabel;
		if (data.labelType.viewType === "labelNotOnPlatform") {
			let labelPfp;
			if (data.label!.profilePicture) {
				try {
					labelPfp = await imgbbUpload(data.label!.profilePicture!);
				} catch (error) {
					console.error(`Failed to upload label picture: ${error}`);
					labelPfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
				}
			} else {
				labelPfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
			}
			const labelObject = {
				name: data.label!.name,
				profilePicture: labelPfp,
			};
			createdLabel = labelObject;
		}

		const artistObject: any = {
			artistName: data.artistname,
			realName: data.realname,
			description: data.description,
			bookingEmail: data.bookingEmail,
			profilePicture: pfp,
			bannerPicture: banner,
			genres: data.genreList,
			socials: data.artistSocials,
			releases: [],
		};
		if (labelRef) {
			artistObject.label = labelRef;
		} else if (createdLabel) {
			artistObject.label = createdLabel;
		}
		const docRef = await addDoc(collection(db, "artists"), artistObject);
		if (data.labelType.viewType === "label") {
			await updateDoc(labelRef!, { artists: arrayUnion(docRef) });
		}
		const newDocId = docRef.id;
		await updateDoc(docRef, { id: newDocId });
		const userData = {
			type: "artist",
			artistObject: docRef,
			notifications: [],
			following: [],
			requests: [],
		};
		await setDoc(doc(db, "userData", result.user.uid), userData);
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.removeItem("userId");
	} catch (error) {
		toast.error("Failed to register artist");
		return {
			code: 500,
			message: "Failed to register artist",
		};
	}
};
