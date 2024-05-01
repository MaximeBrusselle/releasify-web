import { genres } from "../genres/genres";
import { labels } from "../labels/labels";
import { socialsSparkz } from "../other/socials";
import { releases } from "../releases/releases";
import { ArtistDetail } from "./artistTypes";

type ArtistDetailMap = { [key: string]: ArtistDetail };

const details: ArtistDetailMap = {
    "1":{
        id: "1",
        artistName: "Synthsation",
        description: "Hardstyle / EDM Producer & DJ based in the Netherlands 🇳🇱",
        bannerPicture: "default_banner.jpg",
        releases: releases.filter(release => {
            return release.artists.some(artist => artist.id === "1");
        }),
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
        releases: releases.filter(release => {
            return release.artists.some(artist => artist.id === "2") === true;
        }),
        socials: [...socialsSparkz],
        profilePicture: "sparkz_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[0],
        bookingEmail: "phil@purebookings.nl",
    },
    "3":{
        id: "3",
        artistName: "Kenai",
        realName: "Matteo Pellegrinenlli",
        description: "Rawstyle DJ/Producer 🇮🇹",
        bannerPicture: "kenai_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "3");
        }),
        socials: [],
        profilePicture: "kenai_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[2],
        bookingEmail: "jamie@bad-company.nl",
    },
    "4":{
        id: "4",
        artistName: "Scarra",
        realName: "Oscar van der Staak",
        description: "Professional noisemaker 🇳🇱",
        bannerPicture: "scarra_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "4");
        }),
        socials: [],
        profilePicture: "scarra_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[2],
        bookingEmail: "jamie@bad-company.nl",
    },
    "5":{
        id: "5",
        artistName: "Invaderz",
        realName: "Lars van der Loo",
        description: "Uptempo Hardcore Producer 🇳🇱",
        bannerPicture: "invaderz_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "5");
        }),
        socials: [],
        profilePicture: "invaderz_pfp.jpg",
        genres: [genres[2]],
        label: labels[1],
        bookingEmail: "Agency@Triple6.nl",
    },
    "6":{
        id: "6",
        artistName: "Bmberjck",
        realName: "Paul Haagmans",
        description: "Raw Hardstyle Artist",
        bannerPicture: "bmberjck_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "6");
        }),
        socials: [],
        profilePicture: "bmberjck_pfp.jpg",
        genres: [genres[4], genres[6]],
        label: labels[0],
        bookingEmail: "tom@purebookings.nl / Phil@purebookings.nl",
    },
    "7":{
        id: "7",
        artistName: "Cryex",
        realName: "Levi Weidmann",
        description: "HARDSTYLE DJ/PRODUCER 🏳️‍🌈",
        bannerPicture: "cryex_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "7");
        }),
        socials: [],
        profilePicture: "cryex_pfp2.jpg",
        genres: [genres[4], genres[6]],
        label: labels[2],
        bookingEmail: "INFO@THE-WISHLIST.nl",
    },
    "8":{
        id: "8",
        artistName: "Vasto",
        realName: "Marvin de Groot",
        description: "⚡️ THIS IS ELEKTRAWAVE",
        bannerPicture: "vasto_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "8");
        }),
        socials: [],
        profilePicture: "vasto_pfp.jpeg",
        genres: [genres[4], genres[6]],
        label: labels[2],
        bookingEmail: "jamie@bad-company.nl",
    },
    "9":{
        id: "9",
        artistName: "The Smiler",
        realName: "Alex Grosse",
        description: "DJ/ Producer 🇩🇪",
        bannerPicture: "default_banner.jpg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "9");
        }),
        socials: [],
        profilePicture: "the_smiler_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labels[3],
        bookingEmail: "jamie@bad-company.nl",
    },
    "10":{
        id: "10",
        artistName: "Chapter V",
        realName: "Mitchell de Jonge & Tim Udo",
        description: "📖 Unveiling a unique musical journey",
        bannerPicture: "chapter_v_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "10");
        }),
        socials: [],
        profilePicture: "chapter_v_pfp.jpg",
        genres: [genres[4], genres[5], genres[6]],
        label: labels[3],
        bookingEmail: "jamie@bad-company.nl",
    },
    "11":{
        id: "11",
        artistName: "Faceless",
        realName: "Dylan Adriaans & Less Hoesen",
        description: "🃏 why so serious?!",
        bannerPicture: "faceless_banner.jpeg",
        releases: releases.filter((release) => {
            return release.artists.some((artist) => artist.id === "11");
        }),
        socials: [],
        profilePicture: "faceless_pfp.jpeg",
        genres: [genres[4], genres[5], genres[6]],
        label: labels[3],
        bookingEmail: "jamie@bad-company.nl",
    },
};


export {details, releases};
