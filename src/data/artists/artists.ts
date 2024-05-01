import { genres } from "../genres/genres";
import { labelShorts } from "../labels/labels";
import { ArtistIndex } from "./artistTypes";

const artists: ArtistIndex[] = [
    {
        id: "1",
        artistName: "Synthsation",
        description: "",
        profilePicture: "synthsation_pfp.png",
        genres: [genres[4], genres[6]],
    },
    {
        id: "2",
        artistName: "Sparkz",
        description: "",
        profilePicture: "sparkz_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[0]
    },
    {
        id: "3",
        artistName: "Kenai",
        description: "",
        profilePicture: "kenai_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "4",
        artistName: "Scarra",
        description: "",
        profilePicture: "scarra_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "5",
        artistName: "Invaderz",
        description: "",
        profilePicture: "invaderz_pfp.jpg",
        genres: [genres[2]],
        label: labelShorts[1]
    },
    {
        id: "6",
        artistName: "Bmberjck",
        description: "",
        profilePicture: "bmberjck_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[0]
    },
    {
        id: "7",
        artistName: "Cryex",
        description: "",
        profilePicture: "cryex_pfp2.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "8",
        artistName: "Vasto",
        description: "",
        profilePicture: "vasto_pfp.jpeg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "9",
        artistName: "The Smiler",
        description: "",
        profilePicture: "the_smiler_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3]
    },
    {
        id: "10",
        artistName: "Chapter V",
        description: "",
        profilePicture: "chapter_v_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3]
    },
    {
        id: "11",
        artistName: "Faceless",
        description: "",
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3]
    },
];

export { artists };
