import { FireBaseError, doCreateUserWithEmailAndPassword } from "@/auth/auth";
import { ArtistRegistrationData } from "@/pages/account/register/ArtistRegistration";
import imgbbUpload from "@/data/api/imgbbUpload";
import { db } from "@/auth/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { UserCredential } from "firebase/auth";

export const registerArtist = async (data: ArtistRegistrationData): Promise<any> => {
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
	let imageUrl;
	if (data.profilePicture) {
		try {
			imageUrl = await imgbbUpload(data.profilePicture!);
		} catch (error) {
			console.error(`Failed to upload profile picture: ${error}`);
			imageUrl = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
		}
	} else {
		imageUrl = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
	}
	try {
		const artistObject = {
			artistName: data.artistname,
			realName: data.realname,
			email: data.email,
			profilePicture: imageUrl,
			genres: data.genreList,
			socials: data.artistSocials,
			label: data.label,
		};
		const docRef = await addDoc(collection(db, "artists"), artistObject);
		const userData = {
			type: "artist",
			profilePicture: imageUrl,
			artistObject: docRef,
			notifications: [],
			following: [],
			requests: [],
		};
		await setDoc(doc(db, "userData", result.user.uid), userData);
	} catch (error) {
		return{
			message: `${error}`,
		};
	}
};
