import { labels } from "../labels/labels";
import { ReleaseIndex } from "./releaseTypes";
import { genres } from "../genres/genres";
import {
	dontletmedownurls,
	moveyourbodyurls,
	carnivalurls,
	feelourloveurls,
	digitaldemiseurls,
	mirrorsurls,
	animalscryexremixurls,
	worthlessurls,
	heartofsteelurls,
	sinnerurls,
	restlessurls,
} from "./releaseurls";

const releases: ReleaseIndex[] = [
	{
		id: "1",
		name: "Don't Let Me Down",
		artists: [
			{
				id: "2",
				artistName: "Sparkz",
				profilePicture: "sparkz_pfp.jpg",
				description: "Rawstyle DJ/Producer 🇳🇱",
				label: labels[0],
			},
		],
		picture: "dont_let_me_down_cover.jpeg",
		urls: dontletmedownurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2024-09-11"),
		label: labels[0],
	},
	{
		id: "2",
		name: "Move Your Body",
		artists: [
			{
				id: "2",
				artistName: "Sparkz",
				profilePicture: "sparkz_pfp.jpg",
				description: "Rawstyle DJ/Producer 🇳🇱",
				label: labels[0],
			},
		],
		picture: "move_your_body_cover.jpeg",
		urls: moveyourbodyurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2024-09-11"),
		label: labels[0],
	},
	{
		id: "3",
		name: "CARNIVAL",
		artists: [
			{
				id: "3",
				artistName: "Kenai",
				profilePicture: "kenai_pfp.jpg",
				description: "Rawstyle DJ/Producer 🇮🇹",
				label: labels[2],
			},
		],
		picture: "carnival_cover.jpeg",
		urls: carnivalurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2024-04-18"),
		label: labels[2],
	},
	{
		id: "4",
		name: "Feel Our Love",
		artists: [
			{
				id: "5",
				artistName: "Invaderz",
				profilePicture: "invaderz_pfp.jpg",
				description: "Uptempo Hardcore Producer 🇳🇱",
				label: labels[1],
			},
			{
				artistName: "Inswennity",
				profilePicture: "default_pfp.jpg",
			},
		],
		picture: "feel_our_love_cover.jpeg",
		urls: feelourloveurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2023-07-27"),
		label: labels[1],
	},
	{
		id: "5",
		name: "Digital Demise",
		artists: [
			{
				id: "5",
				artistName: "Invaderz",
				profilePicture: "invaderz_pfp.jpg",
				description: "Uptempo Hardcore Producer 🇳🇱",
				label: labels[1],
			},
		],
		picture: "digital_demise_cover.jpeg",
		urls: digitaldemiseurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2023-03-31"),
		label: labels[1],
	},
	{
		id: "6",
		name: "Mirrors",
		artists: [
			{
				id: "6",
				artistName: "Bmberjck",
				profilePicture: "bmberjck_pfp.jpg",
				description: "Raw Hardstyle Artist",
				label: labels[0],
			},
		],
		picture: "mirrors_cover.jpeg",
		urls: mirrorsurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2024-04-11"),
		label: labels[0],
	},
	{
		id: "7",
		name: "Animals (Cryex Remix)",
		artists: [
			{
				id: "7",
				artistName: "Cryex",
				profilePicture: "cryex_pfp2.jpg",
				description: "HARDSTYLE DJ/PRODUCER 🏳️‍🌈",
				label: labels[2],
			},
		],
		picture: "animals_cryex_remix_cover.jpeg",
		urls: animalscryexremixurls,
		genres: [genres[4], genres[6]],
		releaseDate: new Date("2024-03-15"),
		label: labels[2],
	},
	{
		id: "8",
		name: "Worthless",
		artists: [
			{
				id: "9",
				artistName: "The Smiler",
				profilePicture: "the_smiler_pfp.jpg",
				description: "DJ/ Producer 🇩🇪",
				label: labels[3],
			},
		],
		picture: "worthless_cover.jpeg",
		urls: worthlessurls,
		genres: [genres[4], genres[6], genres[5]],
		releaseDate: new Date("2024-03-28"),
		label: labels[3],
	},
	{
		id: "9",
		name: "Heart Of Steel (Spectrum of Spoontech 2023 OST)",
		artists: [
			{
				id: "10",
				artistName: "Chapter V",
				profilePicture: "chapter_v_pfp.jpg",
				description: "📖 Unveiling a unique musical journey",
				label: labels[3],
			},
		],
		picture: "heart_of_steel_cover.jpeg",
		urls: heartofsteelurls,
		genres: [genres[4], genres[6], genres[5]],
		releaseDate: new Date("2023-10-12"),
		label: labels[3],
	},
	{
		id: "10",
		name: "Sinner",
		artists: [
			{
				id: "11",
				artistName: "Faceless",
				profilePicture: "faceless_pfp.jpeg",
				description: "🃏 why so serious?!",
				label: labels[3],
			},
		],
		picture: "sinner_cover.jpeg",
		urls: sinnerurls,
		genres: [genres[4], genres[6], genres[5]],
		releaseDate: new Date("2024-01-18"),
		label: labels[3],
	},
	{
		id: "11",
		name: "Restless",
		artists: [
			{
				id: "11",
				artistName: "Faceless",
				profilePicture: "faceless_pfp.jpeg",
				description: "🃏 why so serious?!",
				label: labels[3],
			},
			{
				artistName: "Coldax",
				profilePicture: "default_pfp.jpg",
			},
		],
		picture: "restless_cover.jpeg",
		urls: restlessurls,
		genres: [genres[4], genres[6], genres[5]],
		releaseDate: new Date("2024-03-21"),
		label: labels[3],
	},
];

export { releases };
