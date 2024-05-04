interface Update {
    version: string;
    date: Date;
    name: string;
    changes?: string[];
    addedFeatures?: string[];
}

export type { Update };