import { db } from "@/auth/firebase";
import { getDocs, collection } from "firebase/firestore";
import { LabelDetail } from "../../labels/labelTypes";

export const getLabels = async (): Promise<LabelDetail[]> => {
	try {
		const result = await getDocs(collection(db, "labels"));
		if (result) {
			return result.docs.map((doc) => doc.data() as LabelDetail).filter((label) => label.id !== undefined);
		} else {
			throw new Error("Label not found");
		}
	} catch (error: any) {
		throw new Error(error);
	}
};
