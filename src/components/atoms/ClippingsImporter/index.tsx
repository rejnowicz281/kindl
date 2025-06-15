import { Input } from "@/components/ui/input";
import type { IClipping, IClippingDetails } from "@/lib/types";
import React from "react";

export const ClippingsImporter = ({
    onImport,
    className
}: {
    onImport?: (clippings: IClipping[], clippingsStringified?: string) => void;
    className?: string;
}) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target?.result as string;
                onImport?.(mapStringAsClippings(content));
            };

            reader.readAsText(file);
        }
    };

    const mapStringAsClippings = (string: string): IClipping[] => {
        const entries = string.split(/==========\r?\n/).map((entry) => {
            const parts = entry.split(/\r?\n/);
            if (parts.length < 3) {
                return {
                    bookTitle: "",
                    details: undefined,
                    text: ""
                };
            }
            const bookTitle = parts[0].trim();
            const details = extractDetails(parts[1].trim());
            const text = parts.slice(2).join("\n").trim();

            return { bookTitle, details, text };
        });

        return entries;
    };

    const extractDetails = (string: string): IClippingDetails | undefined => {
        const noteRegex = /Your Note on page (\d+) \| Location (\d+) \| Added on (.+)/;
        const highlightRegex = /Your (Note|Highlight) on page (\d+) \| Location (\d+)-(\d+) \| Added on (.+)/;

        const noteMatch = string.match(noteRegex);
        const highlightMatch = string.match(highlightRegex);

        if (noteMatch) {
            return {
                type: "Note",
                page: parseInt(noteMatch[1], 10),
                location: {
                    from: parseInt(noteMatch[2], 10),
                    to: parseInt(noteMatch[2], 10)
                },
                date: noteMatch[3]
            };
        } else if (highlightMatch) {
            return {
                type:
                    highlightMatch[1] === "Highlight" ? "Highlight" : highlightMatch[1] === "Note" ? "Note" : "Unknown",
                page: parseInt(highlightMatch[2], 10),
                location: {
                    from: parseInt(highlightMatch[3], 10),
                    to: parseInt(highlightMatch[4], 10)
                },
                date: highlightMatch[5]
            };
        } else return undefined;
    };

    return <Input className={className} type="file" accept=".txt" onChange={handleFileChange} />;
};
