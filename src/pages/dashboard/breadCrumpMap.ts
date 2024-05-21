type BreadCrumbEntry = {
	name: string;
	href: string;
};

export type BreadCrumbMap = {
	[key: string]: BreadCrumbEntry;
};

export const breadCrumbMap: BreadCrumbMap = {
    profile: {
        name: "Dashboard",
        href: "/profile",
    },
    releases: {
        name: "Releases",
        href: "/profile/releases",
    },
    addAsArtist: {
        name: "Add Release",
        href: "/profile/releases/addAsArtist",
    },
    addAsLabel: {
        name: "Add Release",
        href: "/profile/releases/addAsLabel",
    },
    user: {
        name: "User",
        href: "/profile/user",
    },
    requests: {
        name: "Requests",
        href: "/profile/requests",
    },
    analytics: {
        name: "Analytics",
        href: "/profile/analytics",
    },
    settings: {
        name: "Settings",
        href: "/profile/settings",
    },
    artists: {
        name: "Artists",
        href: "/profile/artists",
    },
    addArtist: {
        name: "Add Artist",
        href: "/profile/artists/addArtist",
    },
};