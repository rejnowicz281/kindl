export interface IHighlightInfo {
    page: number;
    location: {
        from: number;
        to: number;
    };
    date: string;
}

export type HighlightInfoType = IHighlightInfo | null;

export interface IClipping {
    bookTitle: string;
    highlightInfo: HighlightInfoType;
    text: string;
}

export type ClippingType = IClipping | null;
