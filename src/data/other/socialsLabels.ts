import { SocialInfo } from "./socialTypes";
import { socialPlatforms } from "./socialsArtists";

const socialsUnfoldRecords: SocialInfo[] = [
    {
        entityId: "1",
        platform: socialPlatforms[0],
        username: "Unfoldrecordsnl",
        url: "https://www.facebook.com/Unfoldrecordsnl"
    },
    {
        entityId: "1",
        platform: socialPlatforms[1],
        username: "unfold.records",
        url: "https://www.instagram.com/unfold.records/"
    },
    {
        entityId: "1",
        platform: socialPlatforms[3],
        username: "unfoldrecords",
        url: "https://soundcloud.com/unfoldrecords"
    },
    {
        entityId: "1",
        platform: socialPlatforms[4],
        username: "unfoldrecords",
        url: "https://www.youtube.com/@unfoldrecords"
    },
    {
        entityId: "1",
        platform: socialPlatforms[7],
        username: "Unfold Music Records",
        url: "https://www.beatport.com/it/label/unfold-music-records/104682"
    },
    {
        entityId: "1",
        platform: socialPlatforms[9],
        username: "unfold.records",
        url: "https://www.tiktok.com/@unfold.records"
    }
];
const socialsNewWave: SocialInfo[] = [
    {
        entityId: "2",
        platform: socialPlatforms[1],
        username: "unfold.records",
        url: "https://www.instagram.com/thenewwave.music/"
    },
    {
        entityId: "2",
        platform: socialPlatforms[3],
        username: "new_wave_music",
        url: "https://soundcloud.com/new_wave_music"
    },
    {
        entityId: "2",
        platform: socialPlatforms[4],
        username: "NewWaveMusic0",
        url: "https://www.youtube.com/@NewWaveMusic0"
    },
];
const socialsApexRecords: SocialInfo[] = [
    {
        entityId: "3",
        platform: socialPlatforms[0],
        username: "ApexRecordsNL",
        url: "https://www.facebook.com/ApexRecordsNL"
    },
    {
        entityId: "3",
        platform: socialPlatforms[1],
        username: "apex_records_nl",
        url: "https://www.instagram.com/apex_records_nl/"
    },
    {
        entityId: "3",
        platform: socialPlatforms[2],
        username: "APEX_Records_NL",
        url: "https://twitter.com/APEX_Records_NL"
    },
    {
        entityId: "3",
        platform: socialPlatforms[3],
        username: "apex_records_nl",
        url: "https://soundcloud.com/apex_records_nl"
    },
    {
        entityId: "3",
        platform: socialPlatforms[4],
        username: "ApexRecords_NL",
        url: "https://www.youtube.com/@ApexRecords_NL"
    },
    {
        entityId: "3",
        platform: socialPlatforms[7],
        username: "apex-records",
        url: "https://www.beatport.com/it/label/apex-records/84793"
    },
    {
        entityId: "3",
        platform: socialPlatforms[9],
        username: "apex_records_nl",
        url: "https://www.tiktok.com/@apex_records_nl"
    }
];
const socialsSpoontech: SocialInfo[] = [
    {
        entityId: "4",
        platform: socialPlatforms[0],
        username: "spoontechrecords",
        url: "https://www.facebook.com/spoontechrecords"
    },
    {
        entityId: "4",
        platform: socialPlatforms[1],
        username: "spoontechrecords",
        url: "https://www.instagram.com/spoontechrecords/"
    },
    {
        entityId: "4",
        platform: socialPlatforms[2],
        username: "spoontech",
        url: "https://twitter.com/spoontech"
    },
    {
        entityId: "4",
        platform: socialPlatforms[3],
        username: "sparkz_raw",
        url: "https://soundcloud.com/spoontechrecords"
    },
    {
        entityId: "4",
        platform: socialPlatforms[4],
        username: "spoontechrecords",
        url: "https://www.youtube.com/@spoontechrecords"
    },
    {
        entityId: "4",
        platform: socialPlatforms[7],
        username: "Spoontech Records",
        url: "https://www.beatport.com/it/label/spoontech-records/20614"
    },
    {
        entityId: "4",
        platform: socialPlatforms[9],
        username: "spoontechrecords",
        url: "https://www.tiktok.com/@spoontechrecords"
    }
];

const socialsLabels: SocialInfo[] = [
    ...socialsUnfoldRecords, ...socialsNewWave, ...socialsApexRecords, ...socialsSpoontech
];

export { socialsLabels };