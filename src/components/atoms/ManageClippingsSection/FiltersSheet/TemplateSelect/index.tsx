import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { IClippingsTemplate } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TemplateSelect = ({
    classNames,
    templates,
    setCurrentTemplateId,
    currentTemplateId
}: {
    classNames?: {
        container?: string;
        selectTrigger?: string;
    };
    templates: IClippingsTemplate[];
    currentTemplateId: string | undefined;
    setCurrentTemplateId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    return (
        <div className={cn("flex flex-col gap-2", classNames?.container)}>
            <Label>Template</Label>
            <Select
                value={currentTemplateId || " "}
                onValueChange={(value) => {
                    if (value === " ") {
                        setCurrentTemplateId(undefined);
                    } else {
                        const template = templates.find((t) => t.id === value);

                        if (!template) return;

                        setCurrentTemplateId(template.id);
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
