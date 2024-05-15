import { auth } from "@/auth/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

type FireBaseError = {
    code: string;
    message: string;
}

export type { FireBaseError };

export const doSignInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | FireBaseError> => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
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
    } catch (error: any) {
        return {
            code: error.code ? error.code : "unknown",
            message: error.message ? error.message : "An unknown error occurred",
        }
    }
}