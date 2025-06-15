export type IClippingType = "Highlight" | "Note" | "Unknown";

export interface IClippingDetails {
    type: IClippingType;
    page: number;
    location: {
        from: number;
        to: number;
    };
    date: string;
}

export interface IClipping {
    bookTitle: string;
    details?: IClippingDetails;
    text: string;
}

export interface IClippingShow {
    text?: boolean;
    details?: boolean;
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

    type?: IClippingType;
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
