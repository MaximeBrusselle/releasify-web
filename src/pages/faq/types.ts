interface Question {
    question: string;
    answer: string;
}

interface Questions {
    [category: string]: Question[];
}

export type { Question, Questions };