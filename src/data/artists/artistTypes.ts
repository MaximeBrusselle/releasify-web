import { Genre } from "@/data/genres/genreTypes"
import { LabelDetail } from "@/data/labels/labelTypes"
import { SocialInfo } from "@/data/other/socialTypes"
import { ReleaseIndex } from "@/data/releases/releaseTypes"

interface ArtistIndex {
    id?: string,
    artistName: string,
    profilePicture: string,
    description?: string,
    genres: Genre[],
    label?: LabelDetail
}

interface ArtistDetail {
    id: string,
    artistName: string,
    realName?: string,
    description?: string
    profilePicture: string,
    bannerPicture: string,
    socials: SocialInfo[],
    genres: Genre[],
    label?: LabelDetail,
    releases: ReleaseIndex[]
    bookingEmail?: string
}

export type { ArtistIndex, ArtistDetail };