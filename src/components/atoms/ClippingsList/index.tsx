import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClippingType } from "@/lib/types";

export const ClippingsList = ({
    clippings,
    clippingShow = {
        bookTitle: true,
        highlightInfo: true,
        text: true
    }
}: {
    clippings: ClippingType[];
    clippingShow?: {
        bookTitle?: boolean;
        highlightInfo?: boolean;
        text?: boolean;
    };
}) => {
    return (
        <div className="flex flex-col gap-8 my-8">
            {clippings.map((clipping, index) =>
                clipping ? (
                    <Card key={index}>
                        {clippingShow.bookTitle || clippingShow.highlightInfo ? (
                            <CardHeader>
                                {clippingShow.bookTitle ? (
                                    <CardTitle className="text-lg font-semibold">{clipping.bookTitle}</CardTitle>
                                ) : null}
                                {clippingShow.highlightInfo ? (
                                    <CardDescription className="text-sm text-gray-600">
                                        {clipping.highlightInfo
                                            ? `Page: ${clipping.highlightInfo.page} | Location: ${clipping.highlightInfo.location.from}-${clipping.highlightInfo.location.to} | Date: ${clipping.highlightInfo.date}`
                                            : "No highlight information available"}
                                    </CardDescription>
                                ) : null}
                            </CardHeader>
                        ) : null}
                        {clippingShow.text && <CardContent className="mt-2">{clipping.text}</CardContent>}
                    </Card>
                ) : null
            )}
        </div>
    );
};
