interface SocialInfo {
    artistId: string;
    platform: Social;
    username: string;
    url: string;
}

interface Social {
    name: SocialPlatform;
    logo: string;
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
export type { SocialInfo, Social };
export { SocialPlatform };