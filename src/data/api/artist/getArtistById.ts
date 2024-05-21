import { db } from "@/auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ReleaseIndex } from "../../releases/releaseTypes";
import { ArtistDetail } from "../../artists/artistTypes";
import { getArtistIndex } from "./getArtistIndex";
import { getLabelIndex } from "../label/getLabelIndex";

export const getArtistById = async (artistId: string): Promise<any> => {
	try {
		const result = await getDoc(doc(db, "artists", artistId));
		let releases: ReleaseIndex[] = [];
		if (result.exists()) {
			const data = result.data();
			for (let ref of data.releases) {
				const releaseId = ref.id;
				const release = await getDoc(doc(db, "releases", releaseId));
				if (!release.exists()) {
					throw new Error("Release not found");
				}
				let releaseData = release.data() as ReleaseIndex;
				let artists: ArtistDetail[] = [];
				for (let artistRef of releaseData.artists) {
					const artistRefId = artistRef.id;
					if (artistRefId === artistId) {
						continue;
					}
					if(!artistRefId) {
						const tmp = artistRef as any;
						artists.push({
							id: `notExists${tmp.artistName}`,
							artistName: tmp.artistName,
							profilePicture: tmp.profilePicture,
							bannerPicture: "",
							socials: [],
							releases: [],
							genres: [],
						});
						continue;
					}
					const artist = await getArtistIndex(artistRefId!);
					if (artist.code) {
						throw new Error(artist.message);
					}
					artists.push(artist);
				}
				artists.push(result.data() as ArtistDetail);
				let label = null;
				if (releaseData.label) {
					if (!releaseData.label.id) {
						label = releaseData.label;
					} else {
						label = await getLabelIndex(releaseData.label.id!);
						if (label.code) {
							throw new Error(label.message);
						}
					}
				}
				releaseData = {
					...releaseData,
					artists: artists,
					label: label,
				};
				releases.push(releaseData);
			}
			let label = null;
			if (data.label) {
				if (!data.label.id) {
					label = data.label;
				} else {
					label = await getLabelIndex(data.label.id);
				}
			}
			return {
				...data,
				releases: releases,
				label: label,
			};
		} else {
			return {
				code: 404,
				message: "Artist not found",
			};
		}
	} catch (error: any) {
		return {
			code: error.code,
			message: error.message,
		};
	}
};
