import { auth, db } from "@/auth/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function followArtist(artistId: string, following: boolean): Promise<any> {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not logged in");
        }
        const userDataRef = doc(db, "userData", user.uid);
        if(!following){
            await updateDoc(userDataRef, {
                following: arrayUnion(artistId),
            });
        } else {
            await updateDoc(userDataRef, {
                following: arrayRemove(artistId),
            });
        }
        const userData = JSON.parse(localStorage.getItem("userData")!);
        userData.following = !following ? userData.following.concat(artistId) : userData.following.filter((artist: any) => artist !== artistId);
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(userData));
        return {
            code: "success",
            message: `Successfully ${following ? "unfollowed" : "followed"} artist`,
        };
    } catch (error: any) {
        return {
            code: "artist/follow-failed",
            message: error.message,
        }
    }
}