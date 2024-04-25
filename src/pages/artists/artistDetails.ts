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
        logo: "twitter_logo.png"
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

type ArtistDetailMap = { [key: string]: ArtistDetail };

const details: ArtistDetailMap = {
    "1":{
        id: "1",
        artistName: "Synthsation",
        description: "Hardstyle / EDM Producer & DJ based in the Netherlands 🇳🇱",
        bannerPicture: "",
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
        releases: [],
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
        bannerPicture: "",
        releases: [],
        socials: [socials[1], socials[2], socials[3]],
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labelShorts[3],
        bookingEmail: "jamie@bad-company.nl",
    },
};

export {details};
