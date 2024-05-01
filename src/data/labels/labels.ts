import { genres } from "../genres/genres";
import { LabelIndex } from "./labelTypes";

const labels: LabelIndex[] = [
    {
        id: "1",
        name: "Unfold Records",
        profilePicture: "unfold_pfp.png",
        description: "📖 UNFOLDING THE FUTURE",
        genres: [genres[4], genres[6]]
    },
    {
        id: "2",
        name: "New Wave",
        profilePicture: "newwave_pfp.jpg",
        description: "🤝 NEXT-GEN UPTEMPO LABEL",
        genres: [genres[4], genres[6]]
    },
    {
        id: "3",
        name: "Apex Records",
        profilePicture: "apex_pfp.jpg",
        description: "🚀 We are the brotherhood!",
        genres: [genres[4], genres[6]]
    },
    {
        id: "4",
        name: "Spoontech Records",
        profilePicture: "spoontech_pfp.jpeg",
        description: "🥄 Representing our Underground Identity",
        genres: [genres[4], genres[5], genres[6]]
    }
];

export { labels };