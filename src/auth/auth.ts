import { auth } from "@/auth/firebase";
import { getUserData } from "@/data/api/other/getUserData";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, updateProfile } from "firebase/auth";

type FireBaseError = {
	code: string;
	message: string;
};

export type { FireBaseError };

export const doSignInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | FireBaseError> => {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		const userData = await getUserData();
		localStorage.setItem("userData", JSON.stringify(userData));
		return result;
	} catch (error: any) {
        let message = "";
		switch (error.code) {
			case "auth/invalid-credential":
				message = "Invalid credentials";
                break;
			case "auth/user-not-found":
				message = "User not found";
                break;
			case "auth/invalid-email":
				message = "Invalid email";
                break;
            case "auth/invalid-password":
                message = "Password must be at least 6 characters long";
                break;
			default:
				message = "An unknown error occurred";
		}
        return {
            code: error.code,
            message: message,
        };
	}
};

export const doCreateUserWithEmailAndPassword = async (email: string, password: string, displayName: string, profilePicture: string): Promise<UserCredential | FireBaseError> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		localStorage.setItem("userId", userCredential.user.uid);
        const user = userCredential.user;
        if (user) {
            await updateProfile(user, {
                displayName: displayName,
                photoURL: profilePicture,
            });
        }
		return userCredential;
	} catch (error: any) {
		let err: FirebaseError = error;
		switch (error.code) {
			case "auth/email-already-in-use":
				err.message = "Email already in use";
				break;
			case "auth/invalid-email":
				err.message = "Invalid email";
				break;
			case "auth/invalid-password":
				err.message = "Password must be at least 6 characters long";
				break;
			default:
				err.message = "An unknown error occurred";
		}
		return {
			code: err.code,
			message: err.message,
		};
	}
};

export const doSignOut = async (): Promise<void | FireBaseError> => {
	try {
		await auth.signOut();
		localStorage.removeItem("userData");
	} catch (error: any) {
		return {
			code: error.code || "unknown",
			message: error.message || "An unknown error occurred",
		};
	}
};
