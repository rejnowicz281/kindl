import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocalState } from "@/hooks/useLocalState";
import type { IClipping, IClippingFilter, IClippingShow, IClippingsTemplate } from "@/lib/types";
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
    setClippingShow
}: {
    clippings: IClipping[];
    setClippings: React.Dispatch<React.SetStateAction<IClipping[]>>;
    clippingFilter?: IClippingFilter;
    setClippingFilter: React.Dispatch<React.SetStateAction<IClippingFilter | undefined>>;
    clippingShow: IClippingShow;
    setClippingShow: React.Dispatch<React.SetStateAction<IClippingShow>>;
}) => {
    const [templates, setTemplates] = useLocalState<IClippingsTemplate[]>("clippingsTemplates", []);

    const [currentTemplateId, setCurrentTemplateId] = useLocalState<string | undefined>("currentClippingsTemplateId");

    useEffect(() => {
        if (currentTemplateId) {
            const template = templates.find((t) => t.id === currentTemplateId);

            if (!template) return;

            setClippingFilter(template.template.filter);
            setClippingShow(template.template.show);
            setClippings(template.template.clippings);
        } else {
            setClippingFilter(undefined);
            setClippingShow({
                bookTitle: true,
                highlightInfo: true,
                text: true
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTemplateId]);

    return (
        <div className="flex flex-col gap-4">
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
                            setCurrentTemplateId={setCurrentTemplateId}
                            clippings={clippings}
                            clippingFilter={clippingFilter}
                            clippingShow={clippingShow}
                            setTemplates={setTemplates}
                            currentTemplateId={currentTemplateId}
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
                    setCurrentTemplateId={setCurrentTemplateId}
                    currentTemplateId={currentTemplateId}
                />
            </div>
            {!clippings.length ? (
                <p className="mx-2">Import a kindle My Clippings.txt file to see its content formatted below</p>
            ) : null}
        </div>
    );
};
