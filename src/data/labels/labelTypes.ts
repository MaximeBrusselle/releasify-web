import { ArtistIndex } from "../artists/artistTypes";
import { Genre } from "../genres/genreTypes"
import { SocialInfo } from "../other/socialTypes";
import { ReleaseIndex } from "../releases/releaseTypes";

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