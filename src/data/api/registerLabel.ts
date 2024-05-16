import { FireBaseError, doCreateUserWithEmailAndPassword } from "@/auth/auth";
import imgbbUpload from "@/data/api/imgbbUpload";
import { db } from "@/auth/firebase";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import { LabelRegistrationData } from "@/pages/account/register/LabelRegistration";

export const registerLabel = async (data: LabelRegistrationData): Promise<any> => {
	//TODO: Change Label to reference
	//register user
	const result: UserCredential | FireBaseError = await doCreateUserWithEmailAndPassword(data.email, data.password);
	if ("message" in result && "code" in result) {
		console.error(`Failed to create user: ${result.code} - ${result.message}`);
		return {
			code: result.code,
			message: result.message,
		};
	}
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
    // let bannerPicture;
    // if (data.bannerPicture) {
    //     try {
    //         bannerPicture = await imgbbUpload(data.bannerPicture!);
    //     } catch (error) {
    //         console.error(`Failed to upload banner picture: ${error}`);
    //         bannerPicture = "https://i.ibb.co/MM4463X/default-banner.jpg";
    //     }
    // } else {
    //     bannerPicture = "https://i.ibb.co/MM4463X/default-banner.jpg";
    // }
	try {
		const artistObject = {
			name: data.labelname,
			profilePicture: pfp,
            // description: data.description,
            // bannerPicture: bannerPicture,
            artists: data.artists,
            releases: [],
			genres: data.genreList,
			socials: data.labelSocials,
		};
		const docRef = await addDoc(collection(db, "labels"), artistObject);
		const newDocId = docRef.id;
		await updateDoc(docRef, { id: newDocId });
		const userData = {
			type: "label",
			profilePicture: pfp,
			labelObject: docRef,
			notifications: [],
			following: [],
			requests: [],
		};
		await setDoc(doc(db, "userData", result.user.uid), userData);
		localStorage.setItem("userData", JSON.stringify(userData));
	} catch (error) {
		return{
			message: `${error}`,
		};
	}
};
