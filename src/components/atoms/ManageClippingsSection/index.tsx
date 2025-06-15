import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocalState } from "@/hooks/useLocalState";
import type {
    IClipping,
    IClippingFilter,
    IClippingShow,
    IClippingsTemplate,
    IClippingsTemplateInfo
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { ClippingsImporter } from "../ClippingsImporter";
import { FiltersSheet } from "./FiltersSheet";
import { SaveTemplate } from "./SaveTemplate";

export const ManageClippingsSection = ({
    clippings,
    setClippings,
    clippingFilter,
    setClippingFilter,
    clippingShow,
    setClippingShow,
    className
}: {
    className?: string;
    clippings: IClipping[];
    setClippings: React.Dispatch<React.SetStateAction<IClipping[]>>;
    clippingFilter?: IClippingFilter;
    setClippingFilter: React.Dispatch<React.SetStateAction<IClippingFilter | undefined>>;
    clippingShow: IClippingShow;
    setClippingShow: React.Dispatch<React.SetStateAction<IClippingShow>>;
}) => {
    const [templates, setTemplates] = useLocalState<IClippingsTemplate[]>("clippingsTemplates", []);

    const [currentTemplateInfo, setCurrentTemplateInfo] = useLocalState<IClippingsTemplateInfo | undefined>(
        "currentClippingsTemplateInfo"
    );

    useEffect(() => {
        if (currentTemplateInfo?.id) {
            const template = templates.find((t) => t.id === currentTemplateInfo.id);

            if (!template) return;

            setClippingFilter(template.template.filter);
            setClippingShow(template.template.show);
            setClippings(template.template.clippings);
        } else {
            setClippingFilter(undefined);
            setClippingShow({
                bookTitle: true,
                details: true,
                text: true
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTemplateInfo]);

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="flex gap-2">
                <ClippingsImporter className="max-w-[520px]" onImport={(clippings) => setClippings(clippings)} />

                {clippings.length ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" onClick={() => setClippings([])}>
                                <X />
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>Clear clippings ({clippings.length})</TooltipContent>
                    </Tooltip>
                ) : null}

                <Tooltip>
                    <TooltipTrigger asChild>
                        <SaveTemplate
                            setCurrentTemplateInfo={setCurrentTemplateInfo}
                            clippings={clippings}
                            clippingFilter={clippingFilter}
                            clippingShow={clippingShow}
                            setTemplates={setTemplates}
                            currentTemplateInfo={currentTemplateInfo}
                        />
                    </TooltipTrigger>

                    <TooltipContent>Save template</TooltipContent>
                </Tooltip>

                <FiltersSheet
                    clippings={clippings}
                    clippingShow={clippingShow}
                    setClippingShow={setClippingShow}
                    clippingFilter={clippingFilter}
                    setClippingFilter={setClippingFilter}
                    templates={templates}
                    setTemplates={setTemplates}
                    setCurrentTemplateInfo={setCurrentTemplateInfo}
                    currentTemplateInfo={currentTemplateInfo}
                />
            </div>
            {!clippings.length ? (
                <p className="mx-2">Import a kindle My Clippings.txt file to see its content formatted below</p>
            ) : currentTemplateInfo?.id ? (
                <p className="mx-2">
                    Using template: <span className="underline font-bold">{currentTemplateInfo.name}</span>
                </p>
            ) : null}
        </div>
    );
};
