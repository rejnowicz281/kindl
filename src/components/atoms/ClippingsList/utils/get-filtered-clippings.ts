import type { IClipping, IClippingFilter } from "@/lib/types";

export const getFilteredClippings = (clippings: IClipping[], filter?: IClippingFilter) => {
    return filter
        ? clippings.filter((clipping) => {
              const clippingDate = new Date(clipping.details?.date || "");
              const clippingBookTitle = clipping.bookTitle?.trim().toLowerCase() || "";
              const clippingText = clipping.text?.trim().toLowerCase() || "";

              const filterBookTitle = filter.bookTitle?.trim().toLowerCase() || "";
              const filterText = filter.text?.trim().toLowerCase() || "";
              const filterDateFrom = filter.dateFrom ? new Date(filter.dateFrom) : null;
              const filterDateTo = filter.dateTo ? new Date(filter.dateTo) : null;

              if (filter.type && clipping.details?.type !== filter.type) return false;

              if (filter.bookTitle && !clippingBookTitle.includes(filterBookTitle)) return false;
              if (filter.text && !clippingText.includes(filterText)) return false;

              if (filterDateFrom && clippingDate.getTime() < filterDateFrom.getTime()) return false;
              if (filterDateTo && clippingDate.getTime() > filterDateTo.getTime()) return false;

              if (filter.locationFrom && clipping.details && clipping.details.location.from < filter.locationFrom)
                  return false;
              if (filter.locationTo && clipping.details && clipping.details.location.from > filter.locationTo)
                  return false;

              if (filter.pageFrom && clipping.details && clipping.details.page < filter.pageFrom) return false;

              if (filter.pageTo && clipping.details && clipping.details?.page > filter.pageTo) return false;

              return true;
          })
        : clippings;
};
