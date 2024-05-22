import { Questions } from "@/data/faq/types";

const questions: Questions = {
    "Artist": [
        {
            id: "Artist1",
            question: "How do I make an artist profile?",
            answer: "To make an artist profile u need to register as an artist. You can do this by going to the registration page and selecting the register as an artist option. After that fill out your details and the account will be created for you.",
        },
        {
            id: "Artist2",
            question: "How do I announce a new release?",
            answer: "You can announce a new release by going to the dashboard and selecting the releases tab. Here you can add a new release by clicking the add release button at the top of the page. Fill out the details and the release will be added to the system.",
        },
        {
            id: "Artist3",
            question: "How do I edit my profile?",
            answer: "You can edit your profile in the dashboard by going to the user tab. Once you click on the edit button a form should appear. Here you can edit your details and save them to the system.",
        }
    ],
    "Label": [
        {
            id: "Label1",
            question: "How do I make a label profile?",
            answer: "To make an label profile u need to register as a label. You can do this by going to the registration page and selecting the register as a label option. After that fill out your details and the account will be created for you.",
        },
        {
            id: "Label2",
            question: "How do I add an artist to my label?",
            answer: "You can add artists to your label by going to the dashboard and selecting the artists tab. Here you can add new artists by clicking the add artists button at the top of the page. Fill out the details and the artists will be added to your label",
        },
        {
            id: "Label3",
            question: "How do I edit my label profile?",
            answer: "You can edit your profile in the dashboard by going to the user tab. Once you click on the edit button a form should appear. Here you can edit your details and save them to the system.",
        },
        {
            id: "Label4",
            question: "How do I announce a release for one of my artists?",
            answer: "You can announce a new release by going to the dashboard and selecting the releases tab. Here you can add a new release by clicking the add release button at the top of the page. Fill out the details and the release will be added to the system.",
        }
    ],
    "Fan": [
        {
            id: "Fan1",
            question: "How do I make a profile?",
            answer: "To make a profile you need to register as a fan. You can do this by going to the registration page and selecting the register as a fan option. After that fill out your details and the account will be created for you.",
        },
        {
            id: "Fan2",
            question: "How do I follow an artist?",
            answer: "You can follow an artist by going to their profile and clicking the follow button. This will add the artist to your following list and you will be able to see their releases in your feed.",
        },
        {
            id: "Fan3",
            question: "How do I follow a label?",
            answer: "You can follow a label by going to their profile and clicking the follow button. This will add the label to your following list and you will be able to see their releases in your feed.",
        },
        {
            id: "Fan4",
            question: "How do I edit my profile?",
            answer: "You can edit your profile in the dashboard by going to the user tab. Once you click on the edit button a form should appear. Here you can edit your details and save them to the system.",
        },
    ],
    "Other": [
        {
            id: "Other1",
            question: "How do I report a bug?",
            answer: "This option is not implemented yet but will be soon.",
        },
        {
            id: "Other2",
            question: "How do I contact support?",
            answer: "This option is not implemented yet but will be soon.",
        },
    ]
}

export default questions;