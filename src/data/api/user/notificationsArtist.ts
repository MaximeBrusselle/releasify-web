import { auth, db } from "@/auth/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function notificationsArtist(artistId: string, notifications: boolean): Promise<any> {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User not logged in");
		}
		const userDataRef = doc(db, "userData", user.uid);
		if (!notifications) {
			await updateDoc(userDataRef, {
				notifications: arrayUnion(artistId),
			});
		} else {
			await updateDoc(userDataRef, {
				notifications: arrayRemove(artistId),
			});
		}
		const userData = JSON.parse(localStorage.getItem("userData")!);
		userData.notifications = !notifications ? userData.notifications.concat(artistId) : userData.notifications.filter((artist: any) => artist !== artistId);
		localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(userData));
		return {
			code: "success",
			message: `Successfully ${notifications ? "disabled" : "enabled"} notifications for artist`,
		};
	} catch (error: any) {
		return {
			code: "artist/notifications-failed",
			message: error.message,
		};
	}
}
