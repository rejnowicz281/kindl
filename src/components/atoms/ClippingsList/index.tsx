import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IClipping, IClippingFilter, IClippingShow } from "@/lib/types";
import { getFilteredClippings } from "./utils/get-filtered-clippings";

export const ClippingsList = ({
    filter,
    clippings,
    clippingShow = {
        bookTitle: true,
        highlightInfo: true,
        text: true
    }
}: {
    filter?: IClippingFilter;
    clippings: IClipping[];
    clippingShow?: IClippingShow;
}) => {
    const filteredClippings = getFilteredClippings(clippings, filter);

    return (
        <div className="flex flex-col gap-8">
            {filteredClippings.map(({ bookTitle, highlightInfo, text }, index) =>
                bookTitle && highlightInfo && text ? (
                    <Card key={index}>
                        {clippingShow.bookTitle || clippingShow.highlightInfo ? (
                            <CardHeader>
                                {clippingShow.bookTitle ? (
                                    <CardTitle className="text-lg font-semibold">{bookTitle}</CardTitle>
                                ) : null}
                                {clippingShow.highlightInfo ? (
                                    <CardDescription className="text-sm text-gray-600">
                                        {highlightInfo
                                            ? `Page: ${highlightInfo.page} | Location: ${highlightInfo.location.from}-${highlightInfo.location.to} | Date: ${highlightInfo.date}`
                                            : "No highlight information available"}
                                    </CardDescription>
                                ) : null}
                            </CardHeader>
                        ) : null}
                        {clippingShow.text && <CardContent>{text}</CardContent>}
                    </Card>
                ) : null
            )}
        </div>
    );
};
