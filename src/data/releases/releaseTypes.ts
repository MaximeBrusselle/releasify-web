import { LabelIndex } from "../labels/labelTypes"
import { Social } from "../other/socialTypes"


interface ReleaseIndex {
    id: string,
    name: string,
    artists: ReleaseArtist[],
    picture: string,
    urls: ReleasePlatform[],
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
    profilePicture: string,
    description?: string
}

export type { ReleaseIndex, ReleasePlatform, ReleaseArtist };

