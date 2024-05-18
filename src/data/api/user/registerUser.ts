import { FireBaseError, doCreateUserWithEmailAndPassword } from "@/auth/auth";
import imgbbUpload from "@/data/api/other/imgbbUpload";
import { db } from "@/auth/firebase";
import { setDoc, doc } from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import { UserRegistrationData } from "@/pages/account/register/UserRegistration";

export const registerUser = async (data: UserRegistrationData): Promise<any> => {
	//register user
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
	localStorage.setItem("userType", "user");
	const result: UserCredential | FireBaseError = await doCreateUserWithEmailAndPassword(data.email, data.password, "", pfp);
	if ("message" in result && "code" in result) {
		console.error(`Failed to create user: ${result.code} - ${result.message}`);
		return {
			code: result.code,
			message: result.message,
		};
	}

	try {
		const userData = {
			type: "user",
			notifications: [],
			following: [],
			requests: [],
		};
		await setDoc(doc(db, "userData", result.user.uid), userData);
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.removeItem("userId");
	} catch (error) {
		return {
			message: `${error}`,
		};
	}
};
