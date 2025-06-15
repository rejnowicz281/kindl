import { useState } from "react";
import { ClippingShowSetter } from "./components/atoms/ClippingShowSetter";
import { ClippingsImporter } from "./components/atoms/ClippingsImporter";
import { ClippingsList } from "./components/atoms/ClippingsList";
import type { IClipping, IClippingShow } from "./lib/types";

function App() {
    const [clippings, setClippings] = useState<IClipping[]>([]);
    const [clippingShow, setClippingShow] = useState<IClippingShow>({
        text: true,
        highlightInfo: true,
        bookTitle: true
    });

    return (
        <div className="m-8">
            <div className="flex flex-col gap-4">
                <ClippingsImporter
                    helperText={
                        !clippings.length
                            ? "Import a kindle My Clippings.txt file to see its content formatted below:"
                            : null
                    }
                    onImport={(clippings) => setClippings(clippings)}
                />
                {clippings.length ? (
                    <ClippingShowSetter clippingShow={clippingShow} setClippingShow={setClippingShow} />
                ) : null}
            </div>

            <ClippingsList clippingShow={clippingShow} clippings={clippings} />
        </div>
    );
}

export default App;
