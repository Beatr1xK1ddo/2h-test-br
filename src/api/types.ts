
export type IStory = {
    by: string;
    id: number;
    score: number;
    text: string;
    time: number;
    title: string;
    type: string;
    url: string;
    descendants: number;
    kids: Array<number>;
}

export type IComment = {
    by: string;
    id: number;
    kids: Array<number>;
    parent: number;
    text: string;
    type: string;
}