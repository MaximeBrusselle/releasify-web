interface Update {
    version: string;
    date: string;
    name: string;
    changes?: string[];
    addedFeatures?: string[];
}

export type { Update };