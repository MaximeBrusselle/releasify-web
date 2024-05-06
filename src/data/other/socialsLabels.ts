import { SocialInfo } from "@/data/other/socialTypes";
import { socialPlatforms } from "@/data/other/socialsArtists";

const socialsUnfoldRecords: SocialInfo[] = [
    {
        platform: socialPlatforms[0],
        url: "https://www.facebook.com/Unfoldrecordsnl"
    },
    {
        platform: socialPlatforms[1],
        url: "https://www.instagram.com/unfold.records/"
    },
    {
        platform: socialPlatforms[3],
        url: "https://soundcloud.com/unfoldrecords"
    },
    {
        platform: socialPlatforms[4],
        url: "https://www.youtube.com/@unfoldrecords"
    },
    {
        platform: socialPlatforms[7],
        url: "https://www.beatport.com/it/label/unfold-music-records/104682"
    },
    {
        platform: socialPlatforms[9],
        url: "https://www.tiktok.com/@unfold.records"
    }
];
const socialsNewWave: SocialInfo[] = [
    {
        platform: socialPlatforms[1],
        url: "https://www.instagram.com/thenewwave.music/"
    },
    {
        platform: socialPlatforms[3],
        url: "https://soundcloud.com/new_wave_music"
    },
    {
        platform: socialPlatforms[4],
        url: "https://www.youtube.com/@NewWaveMusic0"
    },
];
const socialsApexRecords: SocialInfo[] = [
    {
        platform: socialPlatforms[0],
        url: "https://www.facebook.com/ApexRecordsNL"
    },
    {
        platform: socialPlatforms[1],
        url: "https://www.instagram.com/apex_records_nl/"
    },
    {
        platform: socialPlatforms[2],
        url: "https://twitter.com/APEX_Records_NL"
    },
    {
        platform: socialPlatforms[3],
        url: "https://soundcloud.com/apex_records_nl"
    },
    {
        platform: socialPlatforms[4],
        url: "https://www.youtube.com/@ApexRecords_NL"
    },
    {
        platform: socialPlatforms[7],
        url: "https://www.beatport.com/it/label/apex-records/84793"
    },
    {
        platform: socialPlatforms[9],
        url: "https://www.tiktok.com/@apex_records_nl"
    }
];
const socialsSpoontech: SocialInfo[] = [
    {
        platform: socialPlatforms[0],
        url: "https://www.facebook.com/spoontechrecords"
    },
    {
        platform: socialPlatforms[1],
        url: "https://www.instagram.com/spoontechrecords/"
    },
    {
        platform: socialPlatforms[2],
        url: "https://twitter.com/spoontech"
    },
    {
        platform: socialPlatforms[3],
        url: "https://soundcloud.com/spoontechrecords"
    },
    {
        platform: socialPlatforms[4],
        url: "https://www.youtube.com/@spoontechrecords"
    },
    {
        platform: socialPlatforms[7],
        url: "https://www.beatport.com/it/label/spoontech-records/20614"
    },
    {
        platform: socialPlatforms[9],
        url: "https://www.tiktok.com/@spoontechrecords"
    }
];

const socialsLabels: SocialInfo[] = [
    ...socialsUnfoldRecords, ...socialsNewWave, ...socialsApexRecords, ...socialsSpoontech
];

export { socialsLabels };