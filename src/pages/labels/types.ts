import { SocialInfo } from "../artists/types"

interface Label {
    id: string,
    name: string,
    picture: string,
    banner: string,
    description: string,
    socials: SocialInfo[]
    artists: Artist[]
}

interface Artist {
    id: string,
    name: string,
    picture: string,
}