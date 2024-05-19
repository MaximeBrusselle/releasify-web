import { getDoc, DocumentReference } from "firebase/firestore";
import { LabelDetail } from "../../labels/labelTypes";

export const getLoginLabelIndex = async (ref: DocumentReference): Promise<any> => {
	try {
		const result = await getDoc(ref);
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
