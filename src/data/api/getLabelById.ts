import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { LabelDetail } from "../labels/labelTypes";

export const getLabelById = async (labelId: string): Promise<LabelDetail> => {
	try {
        const result = await getDoc(doc(db, "labels", labelId));
        if (result.exists()) {
            return result.data() as LabelDetail;
        } else {
            throw new Error("Label not found");
        }
    } catch (error: any) {
        throw new Error(error);
    }
};