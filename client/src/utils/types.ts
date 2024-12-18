export type Rate = {
    name: string;
    _id: string;
    image: string;
    rate: string;
}

export type questionnaireTypes = {
    title: string;
    _id: string;
    rating: Rate[];
}