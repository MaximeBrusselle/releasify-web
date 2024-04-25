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
    id: string,
    name: string,
    picture: string
}

interface ReleaseShort {
    id: string,
    name: string,
    artists: ArtistShort[],
    picture: string,
    genres: Genre[],
    releaseDate: Date
}

interface ArtistShort {
    id: string,
    name: string,
    picture: string
}

export type { Artist, ArtistDetail, SocialInfo, Social, Genre, GenreGroup, LabelShort, ReleaseShort, ArtistShort };
export {SocialPlatform};