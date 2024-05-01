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

export type { Genre, GenreGroup };