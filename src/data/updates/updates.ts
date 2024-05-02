import { Update } from "./updateTypes";

const updates: Update[] = [
    {
        version: "0.0.1",
        date: "2024-04-08",
        name: "Initial Release",
        changes: [
            "Initial release of the platform",
        ],
    },
    {
        version: "0.0.2",
        date: "2024-04-09",
        name: "Hosting",
        addedFeatures: [
            "The app is now hosted online",
        ],
    },
    {
        version: "0.1.0",
        date: "2024-04-25",
        name: "Artist Overview",
        addedFeatures: [
            "Add artist overview page",
        ],
    },
    {
        version: "0.1.1",
        date: "2024-05-01",
        name: "Artist Detail",
        addedFeatures: [
            "Add artist detail page",
        ],
    },
    {
        version: "0.2.0",
        date: "2024-05-01",
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
        date: "2024-05-01",
        name: "Label Detail",
        addedFeatures: [
            "Add label detail page",
        ],
    },
    {
        version: "0.3.0",
        date: "2024-05-01",
        name: "Updates Overview",
        addedFeatures: [
            "Add updates overview page",
        ],
    },
    {
        version: "0.3.1",
        date: "2024-05-02",
        name: "Responsive Design",
        addedFeatures: [
            "Added responsive design for mobile devices",
        ],
    },
];

export default updates;