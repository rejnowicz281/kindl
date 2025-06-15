import { ClippingShowSetter } from "@/components/atoms/ClippingShowSetter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { IClipping, IClippingFilter, IClippingShow, IClippingsTemplate } from "@/lib/types";
import { formatDateToDatetimeLocal } from "@/lib/utils";
import { Funnel } from "lucide-react";
import { TemplateSelect } from "./TemplateSelect";

export const FiltersSheet = ({
    clippings,
    clippingFilter,
    setClippingFilter,
    clippingShow,
    setClippingShow,
    templates,
    setTemplates,
    currentTemplateId,
    setCurrentTemplateId
}: {
    clippings: IClipping[];
    clippingFilter?: IClippingFilter;
    setClippingFilter: React.Dispatch<React.SetStateAction<IClippingFilter | undefined>>;
    clippingShow: IClippingShow;
    setClippingShow: React.Dispatch<React.SetStateAction<IClippingShow>>;
    templates: IClippingsTemplate[];
    setTemplates: React.Dispatch<React.SetStateAction<IClippingsTemplate[]>>;
    currentTemplateId?: string;
    setCurrentTemplateId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    return (
        <Sheet>
            <Tooltip>
                <SheetTrigger asChild>
                    <TooltipTrigger asChild>
                        <Button variant="ghost">
                            <Funnel />
                        </Button>
                    </TooltipTrigger>
                </SheetTrigger>
                <TooltipContent>Manage clippings ({clippings.length})</TooltipContent>
            </Tooltip>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Manage clippings ({clippings.length})</SheetTitle>
                    <SheetDescription>Filter, sort and manage how your clippings are displayed</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 px-4 overflow-y-auto">
                    <TemplateSelect
                        classNames={{ container: "mb-2", selectTrigger: "w-full" }}
                        templates={templates}
                        setCurrentTemplateId={setCurrentTemplateId}
                        currentTemplateId={currentTemplateId}
                    />
                    <Separator className="mb-2" />
                    <ClippingShowSetter
                        className="mb-4"
                        clippingShow={clippingShow}
                        setClippingShow={setClippingShow}
                    />

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="bookTitleFilter" className="text-sm font-medium">
                            Book title
                        </Label>
                        <Input
                            id="bookTitleFilter"
                            type="text"
                            placeholder="Filter by book title"
                            value={clippingFilter?.bookTitle || ""}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    bookTitle: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="textFilter" className="text-sm font-medium">
                            Text
                        </Label>
                        <Input
                            id="textFilter"
                            type="text"
                            placeholder="Filter by text"
                            value={clippingFilter?.text || ""}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    text: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="dateFromFilter" className="text-sm font-medium">
                            Date start
                        </Label>
                        <Input
                            id="dateFromFilter"
                            type="datetime-local"
                            placeholder="Filter by date start"
                            value={formatDateToDatetimeLocal(clippingFilter?.dateFrom)}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    dateFrom: e.target.value ? new Date(e.target.value) : undefined
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="dateToFilter" className="text-sm font-medium">
                            Date end
                        </Label>
                        <Input
                            id="dateToFilter"
                            type="datetime-local"
                            placeholder="Filter by date end"
                            value={formatDateToDatetimeLocal(clippingFilter?.dateTo)}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    dateTo: e.target.value ? new Date(e.target.value) : undefined
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="locationFromFilter" className="text-sm font-medium">
                            Location start
                        </Label>
                        <Input
                            id="locationFromFilter"
                            type="number"
                            min={0}
                            placeholder="Filter by location start"
                            value={clippingFilter?.locationFrom || ""}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    locationFrom: e.target.value ? parseInt(e.target.value, 10) : undefined
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="locationToFilter" className="text-sm font-medium">
                            Location end
                        </Label>
                        <Input
                            min={0}
                            id="locationToFilter"
                            type="number"
                            placeholder="Filter by location end"
                            value={clippingFilter?.locationTo || ""}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    locationTo: e.target.value ? parseInt(e.target.value, 10) : undefined
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pageFromFilter" className="text-sm font-medium">
                            Page start
                        </Label>
                        <Input
                            min={0}
                            id="pageFromFilter"
                            type="number"
                            placeholder="Filter by page start"
                            value={clippingFilter?.pageFrom || ""}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    pageFrom: e.target.value ? parseInt(e.target.value, 10) : undefined
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pageToFilter" className="text-sm font-medium">
                            Page end
                        </Label>
                        <Input
                            min={0}
                            id="pageToFilter"
                            type="number"
                            placeholder="Filter by page end"
                            value={clippingFilter?.pageTo || ""}
                            onChange={(e) => {
                                setClippingFilter({
                                    ...clippingFilter,
                                    pageTo: e.target.value ? parseInt(e.target.value, 10) : undefined
                                });
                            }}
                        />
                    </div>
                </div>

                <SheetFooter>
                    <Button>Save template</Button>
                    {currentTemplateId && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                setCurrentTemplateId(undefined);
                                setTemplates((prev) => prev.filter((t) => t.id !== currentTemplateId));
                            }}
                        >
                            Delete template
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => {
                            setClippingFilter(undefined);
                        }}
                    >
                        Reset filters
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close & Apply</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
