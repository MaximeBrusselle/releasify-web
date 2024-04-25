import { ArtistDetail, Genre, GenreGroup, LabelShort, SocialInfo, SocialPlatform, Social, ReleaseShort } from "./types";

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
        logo: "soundcloud_logo.png"
    },
    {
        name: SocialPlatform.Youtube,
        logo: "youtube_logo.png"
    }
];

const socials: SocialInfo[] = [
    {
        id: "1",
        platform: socialPlatforms[0],
        url: "https://www.facebook.com"
    },
    {
        id: "2",
        platform: socialPlatforms[1],
        url: "https://www.instagram.com"
    },
    {
        id: "3",
        platform: socialPlatforms[2],
        url: "https://www.twitter.com"
    },
    {
        id: "4",
        platform: socialPlatforms[3],
        url: "https://www.soundcloud.com"
    },
    {
        id: "5",
        platform: socialPlatforms[4],
        url: "https://www.youtube.com"
    
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
        genres: [genres[6], genres[4]],
        releaseDate: new Date("2024-04-11")
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
        genres: [genres[6], genres[4]],
        releaseDate: new Date("2024-04-11")
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
        picture: "carinval_cover.jpeg",
        genres: [genres[4]],
        releaseDate: new Date("2024-04-18")
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
        genres: [genres[2]],
        releaseDate: new Date("2023-07-27")
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
        genres: [genres[2]],
        releaseDate: new Date("2023-03-31")
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
        genres: [genres[6], genres[4]],
        releaseDate: new Date("2024-04-11")
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
        genres: [genres[4]],
        releaseDate: new Date("2024-03-15")
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
        genres: [genres[5], genres[4]],
        releaseDate: new Date("2024-03-28")
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
        genres: [genres[5], genres[4]],
        releaseDate: new Date("2024-04-18")
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
        genres: [genres[5], genres[4]],
        releaseDate: new Date("2024-01-18")
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
        genres: [genres[5], genres[4]],
        releaseDate: new Date("2024-03-21")
    },
];

type ArtistDetailMap = { [key: string]: ArtistDetail };

const details: ArtistDetailMap = {
    "1":{
        id: "1",
        artistName: "Synthsation",
        description: "Hardstyle / EDM Producer & DJ based in the Netherlands 🇳🇱",
        bannerPicture: "default_banner.jpeg",
        releases: [],
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        bannerPicture: "default_banner.jpeg",
        releases: [releases[7]],
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
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
        socials: [socials[1], socials[2], socials[3]],
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3],
        bookingEmail: "jamie@bad-company.nl",
    },
};

export {details, releases};
