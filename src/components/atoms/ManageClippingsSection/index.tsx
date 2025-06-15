import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { IClipping, IClippingFilter, IClippingShow } from "@/lib/types";
import { Save } from "lucide-react";
import type React from "react";
import { ClippingsImporter } from "../ClippingsImporter";
import { FiltersSheet } from "./FiltersSheet";

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
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <ClippingsImporter className="max-w-[520px]" onImport={(clippings) => setClippings(clippings)} />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost">
                            <Save />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Save template</TooltipContent>
                </Tooltip>

                <FiltersSheet
                    clippings={clippings}
                    clippingShow={clippingShow}
                    setClippingShow={setClippingShow}
                    clippingFilter={clippingFilter}
                    setClippingFilter={setClippingFilter}
                />
            </div>
            {!clippings.length ? (
                <p className="mx-2">Import a kindle My Clippings.txt file to see its content formatted below</p>
            ) : null}
        </div>
    );
};
