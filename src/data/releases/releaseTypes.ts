import { LabelIndex } from "@/data/labels/labelTypes"
import { Social } from "@/data/other/socialTypes"
import { Genre } from "@/data/genres/genreTypes"


type ReleaseIndex = {
    id: string,
    name: string,
    artists: ReleaseArtist[],
    picture: string,
    urls: ReleasePlatform[],
    genres: Genre[],
    releaseDate: Date,
    announcementDate: Date,
    label?: LabelIndex,
}

interface ReleasePlatform {
    platform: Social,
    url: string
}

interface ReleaseArtist {
    id?: string,
    artistName: string,
    label?: LabelIndex,
    profilePicture: string,
    description?: string
}

export type { ReleaseIndex, ReleasePlatform, ReleaseArtist };

