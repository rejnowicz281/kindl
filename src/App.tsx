import { useState } from "react";
import { ClippingsImporter } from "./components/atoms/ClippingsImporter";
import { ClippingsList } from "./components/atoms/ClippingsList";
import type { ClippingType } from "./lib/types";

function App() {
    const [clippings, setClippings] = useState<ClippingType[]>([]);

    return (
        <div className="m-8">
            <ClippingsImporter
                helperText={
                    !clippings.length
                        ? "Import a kindle My Clippings.txt file to see its content formatted below:"
                        : null
                }
                onImport={(clippings) => setClippings(clippings)}
            />
            <ClippingsList
                clippingShow={{
                    text: true,
                    highlightInfo: true,
                    bookTitle: true
                }}
                clippings={clippings}
            />
        </div>
    );
}

export default App;
