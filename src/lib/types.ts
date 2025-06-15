export interface IHighlightInfo {
    page: number;
    location: {
        from: number;
        to: number;
    };
    date: string;
}

export interface IClipping {
    bookTitle: string;
    highlightInfo?: IHighlightInfo;
    text: string;
}

export interface IClippingShow {
    text?: boolean;
    highlightInfo?: boolean;
    bookTitle?: boolean;
}
