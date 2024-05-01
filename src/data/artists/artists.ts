import { genres } from "../genres/genres";
import { labels } from "../labels/labels";
import { ArtistIndex } from "./artistTypes";

const artists: ArtistIndex[] = [
    {
        id: "1",
        artistName: "Synthsation",
        description: "Hardstyle / EDM Producer & DJ based in the Netherlands 🇳🇱",
        profilePicture: "synthsation_pfp.png",
        genres: [genres[4], genres[6]],
    },
    {
        id: "2",
        artistName: "Sparkz",
        description: "Rawstyle DJ/Producer 🇳🇱",
        profilePicture: "sparkz_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[0]
    },
    {
        id: "3",
        artistName: "Kenai",
        description: "Rawstyle DJ/Producer 🇮🇹",
        profilePicture: "kenai_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[2]
    },
    {
        id: "4",
        artistName: "Scarra",
        description: "Professional noisemaker 🇳🇱",
        profilePicture: "scarra_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[2]
    },
    {
        id: "5",
        artistName: "Invaderz",
        description: "Uptempo Hardcore Producer 🇳🇱",
        profilePicture: "invaderz_pfp.jpg",
        genres: [genres[2]],
        label: labels[1]
    },
    {
        id: "6",
        artistName: "Bmberjck",
        description: "Raw Hardstyle Artist",
        profilePicture: "bmberjck_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[0]
    },
    {
        id: "7",
        artistName: "Cryex",
        description: "HARDSTYLE DJ/PRODUCER 🏳️‍🌈",
        profilePicture: "cryex_pfp2.jpg",
        genres: [genres[4], genres[6]],
        label: labels[2]
    },
    {
        id: "8",
        artistName: "Vasto",
        description: "⚡️ THIS IS ELEKTRAWAVE",
        profilePicture: "vasto_pfp.jpeg",
        genres: [genres[4], genres[6]],
        label: labels[2]
    },
    {
        id: "9",
        artistName: "The Smiler",
        description: "DJ/ Producer 🇩🇪",
        profilePicture: "the_smiler_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labels[3]
    },
    {
        id: "10",
        artistName: "Chapter V",
        description: "📖 Unveiling a unique musical journey",
        profilePicture: "chapter_v_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labels[3]
    },
    {
        id: "11",
        artistName: "Faceless",
        description: "🃏 why so serious?!",
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labels[3]
    },
];

export { artists };
