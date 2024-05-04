import { genres } from "../genres/genres";
import { LabelDetail } from "./labelTypes";
import { artists } from "../artists/artists";
import { releases } from "../releases/releases";
import { socialsLabels } from "../other/socialsLabels";

type LabelDetailMap = { [key: string]: LabelDetail };

const labelDetails: LabelDetailMap = {
	"1": {
		id: "1",
		name: "Unfold Records",
		profilePicture: "unfold_pfp.png",
		bannerPicture: "default_banner.jpg",
		socials: socialsLabels.filter((social) => {
			return social.entityId === "1";
		}),
		releases: releases.filter((release) => release.label?.id === "1" || release.artists.some((artist) => artist.label?.id === "1")),
		artists: artists.filter((artist) => artist.label?.id === "1").sort((a, b) => a.artistName.localeCompare(b.artistName)),
		description: "📖 UNFOLDING THE FUTURE",
		genres: [genres[4], genres[6]],
	},
	"2": {
		id: "2",
		name: "New Wave",
		profilePicture: "newwave_pfp.jpg",
		bannerPicture: "default_banner.jpg",
		socials: socialsLabels.filter((social) => {
			return social.entityId === "2";
		}),
		releases: releases.filter((release) => release.label?.id === "2" || release.artists.some((artist) => artist.label?.id === "2")),
		artists: artists.filter((artist) => artist.label?.id === "2").sort((a, b) => a.artistName.localeCompare(b.artistName)),
		description: "🤝 NEXT-GEN UPTEMPO LABEL",
		genres: [genres[4], genres[6]],
	},
	"3": {
		id: "3",
		name: "Apex Records",
		profilePicture: "apex_pfp.jpg",
		bannerPicture: "default_banner.jpg",
		socials: socialsLabels.filter((social) => {
			return social.entityId === "3";
		}),
		releases: releases.filter((release) => release.label?.id === "3" || release.artists.some((artist) => artist.label?.id === "3")),
		artists: artists.filter((artist) => artist.label?.id === "3").sort((a, b) => a.artistName.localeCompare(b.artistName)),
		description: "🚀 We are the brotherhood!",
		genres: [genres[4], genres[6]],
	},
	"4": {
		id: "4",
		name: "Spoontech Records",
		profilePicture: "spoontech_pfp.jpeg",
		bannerPicture: "default_banner.jpg",
		socials: socialsLabels.filter((social) => {
			return social.entityId === "4";
		}),
		releases: releases.filter((release) => release.label?.id === "4" || release.artists.some((artist) => artist.label?.id === "4")),
		artists: artists.filter((artist) => artist.label?.id === "4").sort((a, b) => a.artistName.localeCompare(b.artistName)),
		description: "🥄 Representing our Underground Identity",
		genres: [genres[4], genres[5], genres[6]],
	},
};

export { labelDetails };
