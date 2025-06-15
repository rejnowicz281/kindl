import type { IClipping, IClippingFilter } from "@/lib/types";

export const getFilteredClippings = (clippings: IClipping[], filter?: IClippingFilter) => {
    return filter
        ? clippings.filter((clipping) => {
              const clippingDate = new Date(clipping.highlightInfo?.date || "");
              const clippingBookTitle = clipping.bookTitle?.trim().toLowerCase() || "";
              const clippingText = clipping.text?.trim().toLowerCase() || "";

              const filterBookTitle = filter.bookTitle?.trim().toLowerCase() || "";
              const filterText = filter.text?.trim().toLowerCase() || "";

              if (filter.bookTitle && !clippingBookTitle.includes(filterBookTitle)) return false;
              if (filter.text && !clippingText.includes(filterText)) return false;

              if (filter.dateFrom && clippingDate.getTime() < filter.dateFrom.getTime()) return false;
              if (filter.dateTo && clippingDate.getTime() > filter.dateTo.getTime()) return false;

              if (
                  filter.locationFrom &&
                  clipping.highlightInfo &&
                  clipping.highlightInfo.location.from < filter.locationFrom
              )
                  return false;
              if (
                  filter.locationTo &&
                  clipping.highlightInfo &&
                  clipping.highlightInfo.location.from > filter.locationTo
              )
                  return false;

              if (filter.pageFrom && clipping.highlightInfo && clipping.highlightInfo.page < filter.pageFrom)
                  return false;

              if (filter.pageTo && clipping.highlightInfo && clipping.highlightInfo?.page > filter.pageTo) return false;

              return true;
          })
        : clippings;
};
