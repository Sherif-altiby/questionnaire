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

export interface LatestImageResponse {
    imageUrl: string;
    name: string;
}


export  interface ImageInterface {
    image: {
        _id: string;
        name: string;
        imageUrl: string;
    };
    message: string
}