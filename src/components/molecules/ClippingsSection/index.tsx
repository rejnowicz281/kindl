import { ClippingsList } from "@/components/atoms/ClippingsList";
import { ManageClippingsSection } from "@/components/atoms/ManageClippingsSection";
import type { IClipping, IClippingFilter, IClippingShow } from "@/lib/types";
import clsx from "clsx";
import { useState } from "react";

export const ClippingsSection = ({ className }: { className?: string }) => {
    const [clippings, setClippings] = useState<IClipping[]>([]);
    const [clippingShow, setClippingShow] = useState<IClippingShow>({
        text: true,
        highlightInfo: true,
        bookTitle: true
    });
    const [clippingFilter, setClippingFilter] = useState<IClippingFilter>();

    return (
        <div className={clsx("flex flex-col gap-8", className)}>
            <div className="flex flex-col gap-4">
                <ManageClippingsSection
                    clippings={clippings}
                    setClippings={setClippings}
                    clippingFilter={clippingFilter}
                    setClippingFilter={setClippingFilter}
                    clippingShow={clippingShow}
                    setClippingShow={setClippingShow}
                />
            </div>
            <ClippingsList filter={clippingFilter} clippingShow={clippingShow} clippings={clippings} />
        </div>
    );
};
