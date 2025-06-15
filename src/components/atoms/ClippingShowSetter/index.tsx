import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { IClippingShow } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ClippingShowSetterProps {
    clippingShow: IClippingShow;
    setClippingShow: React.Dispatch<React.SetStateAction<IClippingShow>>;
    className?: string;
}

export const ClippingShowSetter = ({ clippingShow, setClippingShow, className }: ClippingShowSetterProps) => {
    const shouldBeDisabled = (key: keyof IClippingShow) => {
        return (
            (key === "text" && !clippingShow.details && !clippingShow.bookTitle && clippingShow.text) ||
            (key === "details" && !clippingShow.text && !clippingShow.bookTitle && clippingShow.details) ||
            (key === "bookTitle" && !clippingShow.text && !clippingShow.details && clippingShow.bookTitle)
        );
    };

    const disabled = {
        text: shouldBeDisabled("text"),
        details: shouldBeDisabled("details"),
        bookTitle: shouldBeDisabled("bookTitle")
    };

    const handleCheckedChange = (key: keyof IClippingShow, checked: boolean | string) => {
        if (!disabled[key])
            setClippingShow((prev) => ({
                ...prev,
                [key]: checked
            }));
    };

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="flex items-center gap-3">
                <Checkbox
                    disabled={disabled.text}
                    id="terms"
                    checked={clippingShow?.text}
                    onCheckedChange={(checked) => handleCheckedChange("text", checked)}
                />
                <Label htmlFor="terms">Show text</Label>
            </div>
            <div className="flex items-center gap-3">
                <Checkbox
                    disabled={disabled.details}
                    id="details"
                    checked={clippingShow?.details}
                    onCheckedChange={(checked) => handleCheckedChange("details", checked)}
                />
                <Label htmlFor="details">Show clipping details</Label>
            </div>
            <div className="flex items-center gap-3">
                <Checkbox
                    disabled={disabled.bookTitle}
                    id="bookTitle"
                    checked={clippingShow?.bookTitle}
                    onCheckedChange={(checked) => handleCheckedChange("bookTitle", checked)}
                />
                <Label htmlFor="bookTitle">Show book title</Label>
            </div>
        </div>
    );
};
