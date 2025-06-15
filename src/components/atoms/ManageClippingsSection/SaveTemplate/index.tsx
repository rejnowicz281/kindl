import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type {
    IClipping,
    IClippingFilter,
    IClippingShow,
    IClippingsTemplate,
    IClippingsTemplateInfo
} from "@/lib/types";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

export const SaveTemplate = ({
    currentTemplateInfo,
    setTemplates,
    clippingFilter,
    clippingShow,
    clippings,
    setCurrentTemplateInfo,
    trigger
}: {
    clippingFilter?: IClippingFilter;
    clippingShow: IClippingShow;
    clippings: IClipping[];
    currentTemplateInfo?: IClippingsTemplateInfo;
    setCurrentTemplateInfo: React.Dispatch<React.SetStateAction<IClippingsTemplateInfo | undefined>>;
    setTemplates: React.Dispatch<React.SetStateAction<IClippingsTemplate[]>>;
    trigger?: React.ReactNode;
}) => {
    const initialChosenOption = currentTemplateInfo?.id ? null : "new";
    const [chosenOption, setChosenOption] = useState<"new" | null>(initialChosenOption);

    const [newTemplateName, setNewTemplateName] = useState("");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setNewTemplateName("");
            setChosenOption(initialChosenOption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, currentTemplateInfo]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger ? (
                <DialogTrigger asChild>{trigger}</DialogTrigger>
            ) : (
                <Tooltip>
                    <DialogTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button variant="ghost">
                                <Save />
                            </Button>
                        </TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent>Save template ({clippings.length} clippings)</TooltipContent>
                </Tooltip>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{chosenOption === "new" ? "Create new template" : "Choose an option"}</DialogTitle>
                </DialogHeader>
                {chosenOption && (
                    <Input
                        placeholder="Template name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                    />
                )}

                <DialogFooter>
                    {!chosenOption && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                setChosenOption("new");
                            }}
                        >
                            Create new template
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            if (chosenOption) {
                                if (!newTemplateName.trim()) return;

                                const newTemplate: IClippingsTemplate = {
                                    id: uniqid(),
                                    name: newTemplateName,
                                    template: {
                                        filter: clippingFilter,
                                        show: clippingShow,
                                        clippings
                                    }
                                };
                                setTemplates((prev) => [...prev, newTemplate]);

                                setCurrentTemplateInfo({
                                    id: newTemplate.id,
                                    name: newTemplate.name
                                });
                            } else {
                                setTemplates((prev) =>
                                    prev.map((template) =>
                                        template.id === currentTemplateInfo?.id
                                            ? {
                                                  ...template,
                                                  template: { filter: clippingFilter, show: clippingShow, clippings }
                                              }
                                            : template
                                    )
                                );
                            }
                            setOpen(false);
                        }}
                    >
                        {chosenOption === "new" ? "Create" : "Save template changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
