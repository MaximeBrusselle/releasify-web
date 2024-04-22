import { Artist, Genre, GenreGroup, LabelShort } from "./types";


const groups: GenreGroup[] = [
    {
        id: "1",
        name: "Hardcore",
        color: "#ff0"
    },
    {
        id: "2",
        name: "Hardstyle",
        color: "#0f0"
    }
];

const genres: Genre[] = [
    {
        id: "1",
        name: "Hardcore",
        group: groups[0]
    },
    {
        id: "2",
        name: "Frenchcore",
        group: groups[0]
    },
    {
        id: "3",
        name: "Uptempo",
        group: groups[0]
    },
    {
        id: "4",
        name: "Euphoric Hardstyle",
        group: groups[1]
    },
    {
        id: "5",
        name: "Rawstyle",
        group: groups[1]
    },
    {
        id: "6",
        name: "Industrial rawstyle",
        group: groups[1]
    },
    {
        id: "7",
        name: "Xtra Raw",
        group: groups[1]
    },
    {
        id: "8",
        name: "Rawphoric",
        group: groups[1]
    }
];

const labelShorts: LabelShort[] = [
    {
        id: "1",
        name: "Unfold Records",
        picture: "unfold_pfp.png"
    },
    {
        id: "2",
        name: "New Wave",
        picture: "newwave_pfp.jpg"
    },
    {
        id: "3",
        name: "Apex Records",
        picture: "apex_pfp.jpg"
    },
    {
        id: "4",
        name: "Spoontech Records",
        picture: "spoontech_pfp.jpeg"
    }
];

const artists: Artist[] = [
    {
        id: "1",
        artistName: "Synthsation",
        profilePicture: "synthsation_pfp.png",
        genres: [genres[4], genres[6]],
    },
    {
        id: "2",
        artistName: "Sparkz",
        profilePicture: "sparkz_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[0]
    },
    {
        id: "3",
        artistName: "Kenai",
        profilePicture: "kenai_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "4",
        artistName: "Scarra",
        profilePicture: "scarra_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "5",
        artistName: "Invaderz",
        profilePicture: "invaderz_pfp.jpg",
        genres: [genres[2]],
        label: labelShorts[1]
    },
    {
        id: "6",
        artistName: "Bmberjck",
        profilePicture: "bmberjck_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[0]
    },
    {
        id: "7",
        artistName: "Cryex",
        profilePicture: "cryex_pfp2.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "8",
        artistName: "Vasto",
        profilePicture: "vasto_pfp.jpeg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2]
    },
    {
        id: "9",
        artistName: "The Smiler",
        profilePicture: "the_smiler_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3]
    },
    {
        id: "10",
        artistName: "Chapter V",
        profilePicture: "chapter_v_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3]
    },
    {
        id: "11",
        artistName: "Faceless",
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3]
    },
];

export { artists, genres, groups, labelShorts };
