import { ArtistIndex } from "@/data/artists/artistTypes";
import { Genre } from "@/data/genres/genreTypes"
import { SocialInfo } from "@/data/other/socialTypes";
import { ReleaseIndex } from "@/data/releases/releaseTypes";

interface LabelDetail {
    id: string,
    name: string,
    profilePicture: string,
    bannerPicture: string,
    genres: Genre[],
    description: string,
    socials: SocialInfo[],
    artists: ArtistIndex[],
    releases: ReleaseIndex[],
    contactEmail?: string
}

interface LabelIndex {
    id: string,
    name: string,
    profilePicture: string,
    description?: string,
    genres: Genre[],
}

export type { LabelDetail, LabelIndex };