import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { IClippingsTemplate, IClippingsTemplateInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TemplateSelect = ({
    classNames,
    templates,
    setCurrentTemplateInfo,
    currentTemplateInfo
}: {
    classNames?: {
        container?: string;
        selectTrigger?: string;
    };
    templates: IClippingsTemplate[];
    currentTemplateInfo?: IClippingsTemplateInfo;
    setCurrentTemplateInfo: React.Dispatch<React.SetStateAction<IClippingsTemplateInfo | undefined>>;
}) => {
    return (
        <div className={cn("flex flex-col gap-2", classNames?.container)}>
            <Label>Template</Label>
            <Select
                value={currentTemplateInfo?.id || " "}
                onValueChange={(value) => {
                    if (value === " ") {
                        setCurrentTemplateInfo(undefined);
                    } else {
                        const template = templates.find((t) => t.id === value);

                        if (!template) return;

                        setCurrentTemplateInfo({
                            id: template.id,
                            name: template.name
                        });
                    }
                }}
            >
                <SelectTrigger className={classNames?.selectTrigger}>
                    <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value=" ">None</SelectItem>
                    {templates.map(({ id, name, template: { clippings } }) => (
                        <SelectItem key={id} value={id}>
                            {name} {`${clippings.length ? `(${clippings.length})` : ""}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
