import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { LabelDetail } from "../labels/labelTypes";

export const getLabelIndex = async (labelId: string): Promise<any> => {
	try {
		const result = await getDoc(doc(db, "labels", labelId));
		if (result.exists()) {
			return result.data() as LabelDetail;
		} else {
			return {
				code: 404,
				message: "Label not found",
			};
		}
	} catch (error: any) {
		return {
			code: error.code,
			message: error.message,
		};
	}
};
