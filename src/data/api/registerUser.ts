import { FireBaseError, doCreateUserWithEmailAndPassword } from "@/auth/auth";
import imgbbUpload from "@/data/api/imgbbUpload";
import { db } from "@/auth/firebase";
import { setDoc, doc } from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import { UserRegistrationData } from "@/pages/account/register/UserRegistration";

export const registerUser = async (data: UserRegistrationData): Promise<any> => {
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
	try {
		const userData = {
			type: "user",
			profilePicture: pfp,
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
