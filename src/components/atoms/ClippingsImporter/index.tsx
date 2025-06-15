import { Input } from "@/components/ui/input";
import type { IClipping, IHighlightInfo } from "@/lib/types";
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
                    highlightInfo: undefined,
                    text: ""
                };
            }
            const bookTitle = parts[0].trim();
            const highlightInfo = extractHighlighInfo(parts[1].trim());
            const text = parts.slice(2).join("\n").trim();

            return { bookTitle, highlightInfo, text };
        });

        return entries;
    };

    const extractHighlighInfo = (string: string): IHighlightInfo | undefined => {
        const regex = /Your Highlight on page (\d+) \| Location (\d+)-(\d+) \| Added on (.+)/;
        const match = string.match(regex);
        if (match) {
            return {
                page: parseInt(match[1], 10),
                location: {
                    from: parseInt(match[2], 10),
                    to: parseInt(match[3], 10)
                },
                date: match[4]
            };
        } else return undefined;
    };

    return <Input className={className} type="file" accept=".txt" onChange={handleFileChange} />;
};
