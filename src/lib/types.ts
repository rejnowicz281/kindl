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

export interface IClippingFilter {
    bookTitle?: string;

    text?: string;
    // afterText?: string;
    // beforeText?: string;

    dateFrom?: string;
    dateTo?: string;

    locationFrom?: number;
    locationTo?: number;

    pageFrom?: number;
    pageTo?: number;
}

export interface IClippingsTemplateInfo {
    id: string;
    name: string;
}

export interface IClippingsTemplate extends IClippingsTemplateInfo {
    template: {
        filter?: IClippingFilter;
        show: IClippingShow;
        clippings: IClipping[];
    };
}
