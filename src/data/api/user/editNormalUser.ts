import { auth } from "@/auth/firebase";
import { UserDetails } from "@/pages/dashboard/forms/EditUserDetails";
import imgbbUpload from "../other/imgbbUpload";
import { updateProfile } from "firebase/auth";

export async function editNormalUser(data: UserDetails, userType: string): Promise<any> {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User not found");
		}
		if (userType !== "user") {
			throw new Error("Account type is not user");
		}
		let pfp: string = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
		if (typeof data.profilePicture === "string" && user.photoURL === data.profilePicture) {
			pfp = data.profilePicture as string;
		} else if (data.profilePicture instanceof File) {
			try {
				pfp = await imgbbUpload(data.profilePicture);
			} catch (error: any) {
				console.error(`Failed to upload profile: ${error}`);
				pfp = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
			}
		}
		await updateProfile(auth.currentUser!, {
			displayName: data.name,
			photoURL: pfp,
		});
		return {
			code: "success",
			message: "User edited successfully.",
		};
	} catch (error: any) {
		return {
			code: "user/edit-failed",
			message: error.message,
		};
	}
}
