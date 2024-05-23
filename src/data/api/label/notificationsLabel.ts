import { auth, db } from "@/auth/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function notificationsLabel(labelId: string, notifications: boolean): Promise<any> {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User not logged in");
		}
		const userDataRef = doc(db, "userData", user.uid);
		if (!notifications) {
			await updateDoc(userDataRef, {
				notifications: arrayUnion(labelId),
			});
		} else {
			await updateDoc(userDataRef, {
				notifications: arrayRemove(labelId),
			});
		}
		const userData = JSON.parse(localStorage.getItem("userData")!);
		userData.notifications = !notifications ? userData.notifications.concat(labelId) : userData.notifications.filter((label: any) => label !== labelId);
		localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(userData));
		return {
			code: "success",
			message: `Successfully ${notifications ? "disabled" : "enabled"} notifications for label`,
		};
	} catch (error: any) {
		return {
			code: "label/notifications-failed",
			message: error.message,
		};
	}
}
