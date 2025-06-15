import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IClipping, IClippingFilter, IClippingShow } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getFilteredClippings } from "./utils/get-filtered-clippings";

export const ClippingsList = ({
    className,
    filter,
    clippings,
    clippingShow = {
        bookTitle: true,
        details: true,
        text: true
    }
}: {
    className?: string;
    filter?: IClippingFilter;
    clippings: IClipping[];
    clippingShow?: IClippingShow;
}) => {
    const filteredClippings = getFilteredClippings(clippings, filter);

    return (
        <div className={cn("flex flex-col gap-8", className)}>
            {filteredClippings.map(({ bookTitle, details, text }, index) =>
                bookTitle && details && text ? (
                    <Card key={index}>
                        {clippingShow.bookTitle || clippingShow.details ? (
                            <CardHeader>
                                {clippingShow.bookTitle ? (
                                    <CardTitle className="text-lg font-semibold">{bookTitle}</CardTitle>
                                ) : null}
                                {clippingShow.details ? (
                                    <CardDescription className="text-sm text-gray-600">
                                        {details
                                            ? `Page: ${details.page} | Type: ${details.type} | Location: ${details.location.from}-${details.location.to} | Date: ${details.date}`
                                            : "No clipping details available"}
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
