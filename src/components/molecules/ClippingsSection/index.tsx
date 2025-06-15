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
        <div className={clsx("flex flex-col", className)}>
            <ManageClippingsSection
                className="sticky top-0 bg-white z-10 px-8 pt-8 pb-4 mb-8 border-b border-b-gray-200"
                clippings={clippings}
                setClippings={setClippings}
                clippingFilter={clippingFilter}
                setClippingFilter={setClippingFilter}
                clippingShow={clippingShow}
                setClippingShow={setClippingShow}
            />

            <ClippingsList
                className="mx-8 mb-8"
                filter={clippingFilter}
                clippingShow={clippingShow}
                clippings={clippings}
            />
        </div>
    );
};
