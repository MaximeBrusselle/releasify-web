import { db } from "@/auth/firebase";
import { getDocs, collection } from "firebase/firestore";
import { ReleaseIndex } from "../releases/releaseTypes";
import { ArtistDetail } from "../artists/artistTypes";
import { getArtistIndex } from "./getArtistIndex";
import { getLabelIndex } from "./getLabelIndex";

export const getReleases = async (): Promise<ReleaseIndex[]> => {
	try {
		const result = await getDocs(collection(db, "releases"));
        let releases: ReleaseIndex[] = [];
		if (result) {
			const releasesData = result.docs.map((doc) => doc.data() as ReleaseIndex);
			for (let release of releasesData) {
                let releaseData = release;
                let artists: ArtistDetail[] = [];
                releaseData.artists.map(async (artistRef) => {
                    if(!artistRef.id){
                        return artistRef;
                    }
                    const artistRefId = artistRef.id;
                    const artist = await getArtistIndex(artistRefId!);
                    if (artist.code) {
                        throw new Error(artist.message);
                    }
                    artists.push(artist);
                });
                let label = null;
                if (releaseData.label) {
                    label = await getLabelIndex(releaseData.label.id!);
                    if (label.code) {
                        throw new Error(label.message);
                    }
                }
                releaseData = {
                    ...releaseData,
                    artists: artists,
                    label: label,
                };
                releases.push(releaseData);
            };
            return releases;
		} else {
			throw new Error("Artist not found");
		}
	} catch (error: any) {
		throw new Error(error);
	}
};
