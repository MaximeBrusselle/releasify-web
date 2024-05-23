import { auth, db } from "@/auth/firebase";
import { CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { LabelAddArtistData } from "@/pages/dashboard/forms/LabelAddArtist";
import { DocumentReference, arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import imgbbUpload from "../other/imgbbUpload";
import { UserData } from "./getLoginLabelArtists";

export async function addArtistToLabel(userType: string, data: LabelAddArtistData): Promise<any> {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not logged in.");
        }
        if (userType !== "label") {
            throw new Error("User is not a label.");
        }
        const userData = localStorage.getItem("userData");
        const parsedUserData: UserData = userData ? JSON.parse(userData) : null;
        const segments = parsedUserData?.labelObject._key.path.segments;
        const objectId = segments[segments.length - 1];
        const labelRef = doc(db, "labels", objectId);
        const label = await getDoc(labelRef);
        if (!label.exists()) {
            throw new Error("Label does not exist.");
        }
        let artistsToAdd: (CreatedArtist | DocumentReference)[] = [];
        for(const artist of data.otherArtists) {
            const ref = doc(db, "artists", artist);
            artistsToAdd.push(ref);
            const artistObject = await getDoc(ref);
            if (!artistObject.exists()) {
                throw new Error("Artist does not exist.");
            }
            const labelFromArtist = artistObject.data().label;
            if (labelFromArtist) {
                if(labelFromArtist.id) {
                    const labelFromArtistObject = await getDoc(labelFromArtist);
                    if (labelFromArtistObject.exists()) {
                        await updateDoc(labelFromArtist, {
                            artists: arrayRemove(ref),
                        });
                    }
                    
                }
            }
            await updateDoc(ref, {
                label: labelRef,
            });
        }
        for (const artist of data.newArtists) {
            let profilePicture;
            if (artist.profilePicture && typeof artist.profilePicture !== "string") {
                try {
                    profilePicture = await imgbbUpload(artist.profilePicture);
                } catch (error) {
                    console.error(`Failed to upload artist picture: ${error}`);
                    profilePicture = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
                }
            } else {
                profilePicture = "https://i.ibb.co/nPh6PCt/default-pfp.jpg";
            }
            const newArtist = {
                artistName: artist.artistName,
                profilePicture: profilePicture,
            };
            artistsToAdd.push(newArtist);
        }

        await updateDoc(labelRef, {
            artists: arrayUnion(...artistsToAdd),
        });
        return {
            code: "success",
            message: "Artists added to label successfully.",
        };
    } catch (error: any) {
        return {
			code: "label/update-failed",
			message: error,
		};
    }
}