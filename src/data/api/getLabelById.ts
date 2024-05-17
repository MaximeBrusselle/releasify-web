import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ReleaseIndex } from "../releases/releaseTypes";
import { ArtistDetail } from "../artists/artistTypes";
import { getArtistIndex } from "./getArtistIndex";
import { getLabelIndex } from "./getLabelIndex";

export const getLabelById = async (labelId: string): Promise<any> => {
	try {
		const result = await getDoc(doc(db, "labels", labelId));
		let labelArtists: ArtistDetail[] = [];
        let releases: ReleaseIndex[] = [];
		if (result.exists()) {
            const data = result.data();
            for(let ref of data.releases) {
                const releaseId = ref.id;
                const release = await getDoc(doc(db, "releases", releaseId));
                if (!release.exists()) {
                    throw new Error("Release not found");
                }
                let releaseData = release.data() as ReleaseIndex;
                let artists: ArtistDetail[] = [];
                for(let artistRef of releaseData.artists) {
                    if(!artistRef.id){
                        artists.push(artistRef);
                        continue;
                    }
                    const artistRefId = artistRef.id;
                    const artist = await getArtistIndex(artistRefId!);
                    if (artist.code) {
                        throw new Error(artist.message);
                    }
                    artists.push(artist);
                }
                let label = null;
                if (releaseData.label) {
                    label = await getLabelIndex(releaseData.label.id!);
                    if(label.code) {
                        throw new Error(label.message);
                    }
                }
                releaseData = {
                    ...releaseData,
                    artists: artists,
                    label: label
                };
                releases.push(releaseData);
            }
			for (let ref of data.artists) {
                if (!ref.id) {
                    labelArtists.push(ref);
                    continue;
                }
				const artistId = ref.id;
				const artist = await getArtistIndex(artistId);
				if (artist.code) {
					throw new Error(artist.message);
				}
				labelArtists.push(artist);
			}
            return {
                ...data,
                releases: releases,
                artists: labelArtists
            };
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