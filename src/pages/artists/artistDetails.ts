import { ArtistDetail, Genre, GenreGroup, LabelShort, SocialInfo, SocialPlatform, Social, ReleaseShort, ReleasePlatform } from "./types";

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

const socialPlatforms: Social[] = [
    {
        name: SocialPlatform.Facebook,
        logo: "facebook_logo.png"
    },
    {
        name: SocialPlatform.Instagram,
        logo: "instagram_logo.png"
    },
    {
        name: SocialPlatform.Twitter_x,
        logo: "twitter_x_logo.jpg"
    },
    {
        name: SocialPlatform.Soundcloud,
        logo: "soundcloud_logo.jpg"
    },
    {
        name: SocialPlatform.Youtube,
        logo: "youtube_logo.png"
    },
    {
        name: SocialPlatform.Spotify,
        logo: "spotify_logo.png"
    }
];

const socialsSparkz: SocialInfo[] = [
    {
        id: "1",
        platform: socialPlatforms[0],
        username: "SparkzDj",
        url: "https://www.facebook.com/SparkzDj"
    },
    {
        id: "2",
        platform: socialPlatforms[1],
        username: "Sparkz_dj",
        url: "https://www.instagram.com/sparkz_dj"
    },
    {
        id: "3",
        platform: socialPlatforms[3],
        username: "sparkz_raw",
        url: "https://www.soundcloud.com/sparkz_raw"
    },
    {
        id: "6",
        platform: socialPlatforms[5],
        username: "Sparkz",
        url: "https://open.spotify.com/artist/0kXJAI2hR2vdzVHsu9OLka?si=kb0CCAksR1WFUw4WigqIiw"
    }
];

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


const releases: ReleaseShort[] = [
    {
        id: "1",
        name: "Don't Let Me Down",
        artists: [
            {
                id: "2",
                name: "Sparkz",
                picture: "sparkz_pfp.jpg"
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
                name: "Sparkz",
                picture: "sparkz_pfp.jpg"
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
                name: "Kenai",
                picture: "kenai_pfp.jpg"
            },
        ],
        picture: "carnival_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-04-18"),
        label: labelShorts[2],
    },
    {
        id: "4",
        name: "Feel Our Love",
        artists: [
            {
                id: "5",
                name: "Invaderz",
                picture: "invaderz_pfp.jpg"
            },
            {
                id: "",
                name: "Inswennity",
                picture: "default_pfp.jpg"
            },
        ],
        picture: "feel_our_love_cover.jpeg",
        urls: [],
        releaseDate: new Date("2023-07-27"),
        label: labelShorts[1],
    },
    {
        id: "5",
        name: "Digital Demise",
        artists: [
            {
                id: "5",
                name: "Invaderz",
                picture: "invaderz_pfp.jpg"
            },
        ],
        picture: "digital_demise_cover.jpeg",
        urls: [],
        releaseDate: new Date("2023-03-31"),
        label: labelShorts[1],
    },
    {
        id: "6",
        name: "Mirrors",
        artists: [
            {
                id: "6",
                name: "Bmberjck",
                picture: "bmberjck_pfp.jpg"
            },
        ],
        picture: "mirrors_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-04-11"),
        label: labelShorts[0],
    },
    {
        id: "7",
        name: "Animals (Cryex Remix)",
        artists: [
            {
                id: "7",
                name: "Cryex",
                picture: "cryex_pfp2.jpg"
            },
        ],
        picture: "animals_cryex_remix_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-03-15"),
        label: labelShorts[2],
    },
    {
        id: "8",
        name: "Worthless",
        artists: [
            {
                id: "9",
                name: "The Smiler",
                picture: "the_smiler_pfp.jpg"
            },
        ],
        picture: "worthless_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-03-28"),
        label: labelShorts[3],
    },
    {
        id: "9",
        name: "Heart Of Steel (Spectrum of Spoontech 2023 OST)",
        artists: [
            {
                id: "10",
                name: "Chapter V",
                picture: "chapter_v_pfp.jpg"
            },
        ],
        picture: "heart_of_steel_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-04-18"),
        label: labelShorts[3],
    },
    {
        id: "10",
        name: "Sinner",
        artists: [
            {
                id: "11",
                name: "Faceless",
                picture: "faceless_pfp.jpeg"
            },
        ],
        picture: "Sinner_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-01-18"),
        label: labelShorts[3],
    },
    {
        id: "11",
        name: "Restless",
        artists: [
            {
                id: "11",
                name: "Faceless",
                picture: "faceless_pfp.jpeg"
            },
            {
                id: "",
                name: "Coldax",
                picture: "default_pfp.jpg"
            },
        ],
        picture: "restless_cover.jpeg",
        urls: [],
        releaseDate: new Date("2024-03-21"),
        label: labelShorts[3],
    },
];

type ArtistDetailMap = { [key: string]: ArtistDetail };

const details: ArtistDetailMap = {
    "1":{
        id: "1",
        artistName: "Synthsation",
        description: "Hardstyle / EDM Producer & DJ based in the Netherlands 🇳🇱",
        bannerPicture: "default_banner.jpg",
        releases: [],
        socials: [],
        profilePicture: "synthsation_pfp.png",
        genres: [genres[4], genres[6]],
        bookingEmail: "synthsationzmusic@gmail.com",
    },
    "2":{
        id: "2",
        artistName: "Sparkz",
        realName: "Eloy Willemsen",
        description: "Rawstyle DJ/Producer 🇳🇱",
        bannerPicture: "sparkz_banner.jpeg",
        releases: [releases[0], releases[1]],
        socials: [...socialsSparkz],
        profilePicture: "sparkz_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[0],
        bookingEmail: "phil@purebookings.nl",
    },
    "3":{
        id: "3",
        artistName: "Kenai",
        realName: "Matteo Pellegrinenlli",
        description: "Rawstyle DJ/Producer 🇮🇹",
        bannerPicture: "kenai_banner.jpeg",
        releases: [releases[2]],
        socials: [],
        profilePicture: "kenai_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2],
        bookingEmail: "jamie@bad-company.nl",
    },
    "4":{
        id: "4",
        artistName: "Scarra",
        realName: "Oscar van der Staak",
        description: "Professional noisemaker 🇳🇱",
        bannerPicture: "scarra_banner.jpeg",
        releases: [],
        socials: [],
        profilePicture: "scarra_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2],
        bookingEmail: "jamie@bad-company.nl",
    },
    "5":{
        id: "5",
        artistName: "Invaderz",
        realName: "Lars van der Loo",
        description: "Uptempo Hardcore Producer 🇳🇱",
        bannerPicture: "invaderz_banner.jpeg",
        releases: [releases[3], releases[4]],
        socials: [],
        profilePicture: "invaderz_pfp.jpg",
        genres: [genres[2]],
        label: labelShorts[1],
        bookingEmail: "Agency@Triple6.nl",
    },
    "6":{
        id: "6",
        artistName: "Bmberjck",
        realName: "Paul Haagmans",
        description: "Raw Hardstyle Artist",
        bannerPicture: "bmberjck_banner.jpeg",
        releases: [releases[5]],
        socials: [],
        profilePicture: "bmberjck_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[0],
        bookingEmail: "tom@purebookings.nl / Phil@purebookings.nl",
    },
    "7":{
        id: "7",
        artistName: "Cryex",
        realName: "Levi Weidmann",
        description: "HARDSTYLE DJ/PRODUCER 🏳️‍🌈",
        bannerPicture: "cryex_banner.jpeg",
        releases: [releases[6]],
        socials: [],
        profilePicture: "cryex_pfp2.jpg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2],
        bookingEmail: "INFO@THE-WISHLIST.nl",
    },
    "8":{
        id: "8",
        artistName: "Vasto",
        realName: "Marvin de Groot",
        description: "⚡️ THIS IS ELEKTRAWAVE",
        bannerPicture: "vasto_banner.jpeg",
        releases: [],
        socials: [],
        profilePicture: "vasto_pfp.jpeg",
        genres: [genres[4], genres[6]],
        label: labelShorts[2],
        bookingEmail: "jamie@bad-company.nl",
    },
    "9":{
        id: "9",
        artistName: "The Smiler",
        realName: "Alex Grosse",
        description: "DJ/ Producer 🇩🇪",
        bannerPicture: "default_banner.jpg",
        releases: [releases[7]],
        socials: [],
        profilePicture: "the_smiler_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3],
        bookingEmail: "jamie@bad-company.nl",
    },
    "10":{
        id: "10",
        artistName: "Chapter V",
        realName: "Mitchell de Jonge & Tim Udo",
        description: "📖 Unveiling a unique musical journey",
        bannerPicture: "chapter_v_banner.jpeg",
        releases: [releases[8]],
        socials: [],
        profilePicture: "chapter_v_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3],
        bookingEmail: "jamie@bad-company.nl",
    },
    "11":{
        id: "11",
        artistName: "Faceless",
        realName: "Dylan Adriaans & Less Hoesen",
        description: "🃏 why so serious?!",
        bannerPicture: "faceless_banner.jpeg",
        releases: [releases[9], releases[10]],
        socials: [],
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3],
        bookingEmail: "jamie@bad-company.nl",
    },
};

export {details, releases};
