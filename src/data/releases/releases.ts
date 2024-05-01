import { labelShorts } from "../labels/labels";
import { socialPlatforms } from "../other/socials";
import { ReleaseIndex, ReleasePlatform } from "./releaseTypes";

const dontletmedownurls: ReleasePlatform[] = [
    {
        platform: socialPlatforms[5],
        url: "https://open.spotify.com/track/57FQr6Co0D23GF3ADAy124?si=485a76c21ef14be5"
    },
    {
        platform: socialPlatforms[3],
        url: "https://soundcloud.com/unfoldrecords/sparkz-dont-let-me-down?in=unfoldrecords/sets/sparkz-into-the-summer-vol-1"
    }

];

const moveyourbodyurls: ReleasePlatform[] = [
    {
        platform: socialPlatforms[5],
        url: "https://open.spotify.com/track/1mKiqo9Hq9HBMgkHPSsd9n?si=5c3955615de84ec7"
    },
    {
        platform: socialPlatforms[3],
        url: "https://soundcloud.com/unfoldrecords/sparkz-move-your-body?in=unfoldrecords/sets/sparkz-into-the-summer-vol-1"
    }
];

const releases: ReleaseIndex[] = [
    {
        id: "1",
        name: "Don't Let Me Down",
        artists: [
            {
                id: "2",
                artistName: "Sparkz",
                profilePicture: "sparkz_pfp.jpg",
                description: "Rawstyle DJ/Producer 🇳🇱"
            },
        ],
        picture: "dont_let_me_down_cover.jpeg",
        urls: [...dontletmedownurls],
        releaseDate: new Date("2024-09-11"),
        label: labelShorts[0],
    },
    {
        id: "2",
        name: "Move Your Body",
        artists: [
            {
                id: "2",
                artistName: "Sparkz",
                profilePicture: "sparkz_pfp.jpg",
                description: "Rawstyle DJ/Producer 🇳🇱"
            },
        ],
        picture: "move_your_body_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-09-11"),
        label: labelShorts[0],
    },
    {
        id: "3",
        name: "CARNIVAL",
        artists: [
            {
                id: "3",
                artistName: "Kenai",
                profilePicture: "kenai_pfp.jpg",
                description: "Rawstyle DJ/Producer 🇮🇹"
            },
        ],
        picture: "carnival_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-04-18"),
        label: labelShorts[2],
    },
    {
        id: "4",
        name: "Feel Our Love",
        artists: [
            {
                id: "5",
                artistName: "Invaderz",
                profilePicture: "invaderz_pfp.jpg",
                description: "Uptempo Hardcore Producer 🇳🇱"
            },
            {
                artistName: "Inswennity",
                profilePicture: "default_pfp.jpg",
            },
        ],
        picture: "feel_our_love_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2023-07-27"),
        label: labelShorts[1],
    },
    {
        id: "5",
        name: "Digital Demise",
        artists: [
            {
                id: "5",
                artistName: "Invaderz",
                profilePicture: "invaderz_pfp.jpg",
                description: "Uptempo Hardcore Producer 🇳🇱"
            },
        ],
        picture: "digital_demise_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2023-03-31"),
        label: labelShorts[1],
    },
    {
        id: "6",
        name: "Mirrors",
        artists: [
            {
                id: "6",
                artistName: "Bmberjck",
                profilePicture: "bmberjck_pfp.jpg",
                description: "Raw Hardstyle Artist"
            },
        ],
        picture: "mirrors_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-04-11"),
        label: labelShorts[0],
    },
    {
        id: "7",
        name: "Animals (Cryex Remix)",
        artists: [
            {
                id: "7",
                artistName: "Cryex",
                profilePicture: "cryex_pfp2.jpg",
                description: "HARDSTYLE DJ/PRODUCER 🏳️‍🌈"
            },
        ],
        picture: "animals_cryex_remix_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-03-15"),
        label: labelShorts[2],
    },
    {
        id: "8",
        name: "Worthless",
        artists: [
            {
                id: "9",
                artistName: "The Smiler",
                profilePicture: "the_smiler_pfp.jpg",
                description: "DJ/ Producer 🇩🇪"
            },
        ],
        picture: "worthless_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-03-28"),
        label: labelShorts[3],
    },
    {
        id: "9",
        name: "Heart Of Steel (Spectrum of Spoontech 2023 OST)",
        artists: [
            {
                id: "10",
                artistName: "Chapter V",
                profilePicture: "chapter_v_pfp.jpg",
                description: "📖 Unveiling a unique musical journey"
            },
        ],
        picture: "heart_of_steel_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-04-18"),
        label: labelShorts[3],
    },
    {
        id: "10",
        name: "Sinner",
        artists: [
            {
                id: "11",
                artistName: "Faceless",
                profilePicture: "faceless_pfp.jpeg",
                description: "🃏 why so serious?!"
            },
        ],
        picture: "sinner_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-01-18"),
        label: labelShorts[3],
    },
    {
        id: "11",
        name: "Restless",
        artists: [
            {
                id: "11",
                artistName: "Faceless",
                profilePicture: "faceless_pfp.jpeg",
                description: "🃏 why so serious?!"
            },
            {
                artistName: "Coldax",
                profilePicture: "default_pfp.jpg"
            },
        ],
        picture: "restless_cover.jpeg",
        urls: [...moveyourbodyurls],
        releaseDate: new Date("2024-03-21"),
        label: labelShorts[3],
    },
];

export { releases };