import { FireBaseError, doCreateUserWithEmailAndPassword } from "@/auth/auth";
import imgbbUpload from "@/data/api/other/imgbbUpload";
import { db } from "@/auth/firebase";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import { LabelRegistrationData } from "@/pages/account/register/LabelRegistration";
import toast from "react-hot-toast";

export const registerLabel = async (data: LabelRegistrationData): Promise<any> => {
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
		localStorage.setItem("userType", "label");
		const result: UserCredential | FireBaseError = await doCreateUserWithEmailAndPassword(data.email, data.password, data.labelname, pfp);
		if ("message" in result && "code" in result) {
			return {
				code: result.code,
				message: result.message,
			};
		}

		let bannerPicture;
		if (data.bannerPicture) {
			try {
				bannerPicture = await imgbbUpload(data.bannerPicture!);
			} catch (error) {
				console.error(`Failed to upload banner picture: ${error}`);
				bannerPicture = "https://i.ibb.co/MM4463X/default-banner.jpg";
			}
		} else {
			bannerPicture = "https://i.ibb.co/MM4463X/default-banner.jpg";
		}
		let artistRefs = [];
		for (let artist of data.artists) {
			artistRefs.push(doc(db, "artists", artist.id!));
		}
		let createdArtists = [];
		for (let artist of data.newArtists) {
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
			const artistObject = {
				artistName: artist.artistName,
				profilePicture: profilePicture,
			};
			createdArtists.push(artistObject);
		}

		const allArtists = [...artistRefs, ...createdArtists];

		const labelObject = {
			name: data.labelname,
			profilePicture: pfp,
			description: data.description,
			bannerPicture: bannerPicture,
			artists: allArtists,
			releases: [],
			genres: data.genreList,
			socials: data.labelSocials,
			contactEmail: data.contactEmail,
		};
		const docRef = await addDoc(collection(db, "labels"), labelObject);
		for (let artist of artistRefs) {
			await updateDoc(artist, { label: docRef });
		}
		const newDocId = docRef.id;
		await updateDoc(docRef, { id: newDocId });
		const userData = {
			type: "label",
			labelObject: docRef,
			notifications: [],
			following: [],
			requests: [],
		};
		await setDoc(doc(db, "userData", result.user.uid), userData);
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.removeItem("userId");
	} catch (error: any) {
		toast.error("An unknown error occurred");
		return {
			code: error.code ? error.code : "unknown",
			message: error.message ? error.message : "An unknown error occurred",
		};
	}
};
