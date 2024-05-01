import { Genre } from "../genres/genreTypes"
import { LabelIndex } from "../labels/labelTypes"
import { SocialInfo } from "../other/socialTypes"
import { ReleaseIndex } from "../releases/releaseTypes"

interface ArtistIndex {
    id: string,
    artistName: string,
    profilePicture: string,
    description: string,
    genres: Genre[],
    label?: LabelIndex
}

interface ArtistDetail {
    id: string,
    artistName: string,
    realName?: string,
    description: string
    profilePicture: string,
    bannerPicture: string,
    socials: SocialInfo[],
    genres: Genre[],
    label?: LabelIndex,
    releases: ReleaseIndex[]
    bookingEmail?: string
}

export type { ArtistIndex, ArtistDetail };