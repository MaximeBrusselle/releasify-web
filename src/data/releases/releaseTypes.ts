import { LabelIndex } from "../labels/labelTypes"
import { Social } from "../other/socialTypes"
import { Genre } from "../genres/genreTypes"


interface ReleaseIndex {
    id: string,
    name: string,
    artists: ReleaseArtist[],
    picture: string,
    urls: ReleasePlatform[],
    genres: Genre[],
    releaseDate: Date
    label: LabelIndex,
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

