interface SocialInfo {
    platform: Social;
    url: string;
}

interface Social {
    platform: SocialPlatform;
    name: string;
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