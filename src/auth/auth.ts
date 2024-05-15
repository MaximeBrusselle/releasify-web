import { auth } from "@/auth/firebase";
import { getUserData } from "@/data/api/getUserData";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

type FireBaseError = {
    code: string;
    message: string;
}

export type { FireBaseError };

export const doSignInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | FireBaseError> => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const data = await getUserData();
        localStorage.setItem("userData", JSON.stringify(data));
        return result;
    } catch (error: any) {
        return {
            code: error.code ? error.code : "unknown",
            message: error.message ? error.message : "An unknown error occurred",
        }
    }
}

export const doCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | FireBaseError> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        return {
            code: error.code ? error.code : "unknown",
            message: error.message ? error.message : "An unknown error occurred",
        }
    }
}

export const doSignOut = async (): Promise<void | FireBaseError> => {
    try {
        await auth.signOut();
        localStorage.removeItem("userData");
    } catch (error: any) {
        return {
            code: error.code ? error.code : "unknown",
            message: error.message ? error.message : "An unknown error occurred",
        }
    }
}