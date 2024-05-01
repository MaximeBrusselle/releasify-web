interface Artist {
    id: string,
    artistName: string,
    profilePicture: string,
    genres: Genre[],
    label?: LabelShort
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
    label?: LabelShort,
    releases: ReleaseShort[]
    bookingEmail?: string
}

interface SocialInfo {
    id: string,
    platform: Social,
    username: string,
    url: string
}

interface Social {
    name: SocialPlatform,
    logo: string
}

enum SocialPlatform {
    Spotify,
    Soundcloud,
    Instagram,
    Facebook,
    Apple_music,
    Beatport,
    Tiktok,
    Twitter_x,
    Reddit,
    Tidal,
    Youtube,
}

interface Genre {
    id: string,
    name: string,
    group: GenreGroup
}

interface GenreGroup {
    id: string,
    name: string
    color: string
}

interface LabelShort {
    id?: string,
    name: string,
    picture: string,
    description?: string
}

interface ReleaseShort {
    id: string,
    name: string,
    artists: ArtistShort[],
    picture: string,
    urls: ReleasePlatform[],
    releaseDate: Date
    label: LabelShort,
}

interface ReleasePlatform {
    platform: Social,
    url: string
}

interface ArtistShort {
    id?: string,
    name: string,
    description?: string,
    picture: string
}

export type { Artist, ArtistDetail, SocialInfo, Social, Genre, GenreGroup, LabelShort, ReleaseShort, ArtistShort, ReleasePlatform };
export {SocialPlatform};