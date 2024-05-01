import { Social, SocialInfo, SocialPlatform } from "./socialTypes";

const socialPlatforms: Social[] = [
    {
        name: SocialPlatform.Facebook,
        logo: "facebook_logo.png"
    },
    {
        name: SocialPlatform.Instagram,
        logo: "instagram_logo.png"
    },
    {
        name: SocialPlatform.Twitter_x,
        logo: "twitter_x_logo.jpg"
    },
    {
        name: SocialPlatform.Soundcloud,
        logo: "soundcloud_logo.jpg"
    },
    {
        name: SocialPlatform.Youtube,
        logo: "youtube_logo.png"
    },
    {
        name: SocialPlatform.Spotify,
        logo: "spotify_logo.png"
    }
];

const socialsSparkz: SocialInfo[] = [
    {
        id: "1",
        platform: socialPlatforms[0],
        username: "SparkzDj",
        url: "https://www.facebook.com/SparkzDj"
    },
    {
        id: "2",
        platform: socialPlatforms[1],
        username: "Sparkz_dj",
        url: "https://www.instagram.com/sparkz_dj"
    },
    {
        id: "3",
        platform: socialPlatforms[3],
        username: "sparkz_raw",
        url: "https://www.soundcloud.com/sparkz_raw"
    },
    {
        id: "6",
        platform: socialPlatforms[5],
        username: "Sparkz",
        url: "https://open.spotify.com/artist/0kXJAI2hR2vdzVHsu9OLka?si=kb0CCAksR1WFUw4WigqIiw"
    }
];

export { socialPlatforms, socialsSparkz };