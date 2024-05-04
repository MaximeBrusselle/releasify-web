import { Genre } from "@/data/genres/genreTypes"
import { LabelIndex } from "@/data/labels/labelTypes"
import { SocialInfo } from "@/data/other/socialTypes"
import { ReleaseIndex } from "@/data/releases/releaseTypes"

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