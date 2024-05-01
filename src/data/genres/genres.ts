import { GenreGroup, Genre } from "./genreTypes";

const groups: GenreGroup[] = [
    {
        id: "1",
        name: "Hardcore",
        color: "#ff0"
    },
    {
        id: "2",
        name: "Hardstyle",
        color: "#0f0"
    }
];

const genres: Genre[] = [
    {
        id: "1",
        name: "Hardcore",
        group: groups[0]
    },
    {
        id: "2",
        name: "Frenchcore",
        group: groups[0]
    },
    {
        id: "3",
        name: "Uptempo",
        group: groups[0]
    },
    {
        id: "4",
        name: "Euphoric Hardstyle",
        group: groups[1]
    },
    {
        id: "5",
        name: "Rawstyle",
        group: groups[1]
    },
    {
        id: "6",
        name: "Industrial rawstyle",
        group: groups[1]
    },
    {
        id: "7",
        name: "Xtra Raw",
        group: groups[1]
    },
    {
        id: "8",
        name: "Rawphoric",
        group: groups[1]
    }
];

export { groups, genres };