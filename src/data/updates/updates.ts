import { Update } from "@/data/updates/updateTypes";

const updates: Update[] = [
    {
        version: "0.0.1",
        date: new Date("2024-04-08"),
        name: "Initial Release",
        changes: [
            "Initial release of the platform",
        ],
    },
    {
        version: "0.0.2",
        date: new Date("2024-04-09"),
        name: "Hosting",
        addedFeatures: [
            "The app is now hosted online",
        ],
    },
    {
        version: "0.1.0",
        date: new Date("2024-04-25"),
        name: "Artist Overview",
        addedFeatures: [
            "Add artist overview page",
        ],
    },
    {
        version: "0.1.1",
        date: new Date("2024-05-01"),
        name: "Artist Detail",
        addedFeatures: [
            "Add artist detail page",
        ],
    },
    {
        version: "0.2.0",
        date: new Date("2024-05-01"),
        name: "Label Overview",
        changes: [
            "Change the way data is structured for both artists and labels",
        ],
        addedFeatures: [
            "Add label overview page",
        ],
    },
    {
        version: "0.2.1",
        date: new Date("2024-05-01"),
        name: "Label Detail",
        addedFeatures: [
            "Add label detail page",
        ],
    },
    {
        version: "0.3.0",
        date: new Date("2024-05-01"),
        name: "Updates Overview",
        addedFeatures: [
            "Add updates overview page",
        ],
    },
    {
        version: "0.3.1",
        date: new Date("2024-05-02"),
        name: "Responsive Design",
        addedFeatures: [
            "Added responsive design for mobile devices",
        ],
    },
    {
        version: "0.4.0",
        date: new Date("2024-05-04"),
        name: "Releases Page",
        changes: [
            "Releases are now sorted by release date",
            "Fixed a bug where clicking on anything inside a card would navigate to both the clicked item and card page",
            "Format dates to the users locale",
        ],
        addedFeatures: [
            "Add releases overview page",
        ],
    },
    {
        version: "0.5.0",
        date: new Date("2024-05-06"),
        name: "Registration Forms",
        changes: [
            "Restructured some social data",
        ],
        addedFeatures: [
            "Add a registration form for artists",
        ],
    },
    {
        version: "0.5.1",
        date: new Date("2024-05-07"),
        name: "Registration Forms",
        addedFeatures: [
            "Add a registration form for labels",
        ],
    },
    {
        version: "0.5.2",
        date: new Date("2024-05-07"),
        name: "Registration Forms",
        addedFeatures: [
            "Add a registration form for users",
        ],
    },
    {
        version: "0.6.0",
        date: new Date("2024-05-13"),
        name: "Artist Dashboard",
        addedFeatures: [
            "Example artist dashboard (home and releases page)",
        ],
    },
    {
        version: "0.7.0",
        date: new Date("2024-05-18"),
        name: "Add releases",
        changes: [
            "Fixed profile picture not showing after registration/login",
            "Fixed getting releases for label in dashboard",
            "All of the data now comes from the database instead of sampledata",
        ],
        addedFeatures: [
            "You can now add releases from the dashboard as an artist",
        ],
    },
    {
        version: "0.7.1",
        date: new Date("2024-05-19"),
        name: "Remove releases",
        changes: [
            "Lots of bugfixes"
        ],
        addedFeatures: [
            "You can now remove releases from the dashboard as an artist",
        ],
    },
    {
        version: "0.7.2",
        date: new Date("2024-05-19"),
        name: "Add and remove releases as a label",
        addedFeatures: [
            "You can now add and remove releases from the dashboard as a label",
        ],
    },
    {
        version: "0.8.0",
        date: new Date("2024-05-20"),
        name: "Overview of Artists",
        addedFeatures: [
            "You can now see an overview of all artists on your label",
        ],
    },
];

export default updates;