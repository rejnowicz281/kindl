import { useState } from "react";
import { ClippingsList } from "./components/atoms/ClippingsList";
import { ManageClippingsSection } from "./components/atoms/ManageClippingsSection";
import { TooltipProvider } from "./components/ui/tooltip";
import { type IClipping, type IClippingFilter, type IClippingShow } from "./lib/types";

function App() {
    const [clippings, setClippings] = useState<IClipping[]>([]);
    const [clippingShow, setClippingShow] = useState<IClippingShow>({
        text: true,
        highlightInfo: true,
        bookTitle: true
    });
    const [clippingFilter, setClippingFilter] = useState<IClippingFilter>();

    return (
        <TooltipProvider>
            <div className="m-8">
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
        </TooltipProvider>
    );
}

export default App;
