import { auth, db } from "@/auth/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function followLabel(labelId: string, following: boolean): Promise<any> {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not logged in");
        }
        const userDataRef = doc(db, "userData", user.uid);
        if(!following){
            await updateDoc(userDataRef, {
                following: arrayUnion(labelId),
            });
        } else {
            await updateDoc(userDataRef, {
                following: arrayRemove(labelId),
            });
        }
        const userData = JSON.parse(localStorage.getItem("userData")!);
        userData.following = !following ? userData.following.concat(labelId) : userData.following.filter((label: any) => label !== labelId);
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(userData));
        return {
            code: "success",
            message: `Successfully ${following ? "unfollowed" : "followed"} label`,
        };
    } catch (error: any) {
        return {
            code: "label/follow-failed",
            message: error.message,
        }
    }
}