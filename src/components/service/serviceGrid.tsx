
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Search,
  Star,
  UserRound,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  duration: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  } | null;
  technician: {
    id: string;
    userName: string;
    avgRating: number | string | null;
    experienceYears: number;
    isAvailable: boolean;
    user: {
      id: string;
      name: string;
      address: string | null;
    } | null;
  } | null;
};

type ServicesGridProps = {
  services: Service[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
};

type PaginationItem = number | "...";

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function ServicesGrid({
  services,
  isLoading,
  isError,
  currentPage,
  totalPages,
  onPageChange,
  onClearFilters,
}: ServicesGridProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const paginationItems = getPaginationItems(currentPage, safeTotalPages);

  function goToPage(page: number) {
    if (isLoading) return;
    if (page < 1 || page > safeTotalPages) return;
    if (page === currentPage) return;

    onPageChange(page);
  }

  return (
    <>
      {isLoading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-gray-400  p-6"
            >
              <div className="h-5 w-24 rounded bg-gray-300" />
              <div className="mt-6 h-6 w-3/4 rounded  bg-gray-300" />
              <div className="mt-3 h-4 w-full rounded  bg-gray-300" />
              <div className="mt-2 h-4 w-2/3 rounded  bg-gray-300" />
              <div className="mt-8 h-10 rounded  bg-gray-300" />
            </div>
          ))}
        </div>
      )}

      {isError && !isLoading && (
        <div className="rounded-xl border border-border px-6 py-16 text-center">
          <h3 className="text-lg font-semibold">Could not load services</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Please try again in a moment.
          </p>
        </div>
      )}

      {!isLoading && !isError && services.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const rating = service.technician?.avgRating;
              const technician =
                service.technician?.user?.name ??
                service.technician?.userName ??
                "Technician";
              const address = service.technician?.user?.address;

              return (
                <article
                  key={service.id}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:p-6"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {service.category?.name ?? "General"}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight">
                    {service.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
                    {service.description ||
                      "Explore this service to learn more."}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-4" />
                      {service.duration} min
                    </span>

                    {rating != null && (
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="size-4 fill-current text-amber-500" />
                        {Number(rating).toFixed(1)}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                    <UserRound className="mt-0.5 size-4 shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate text-foreground">{technician}</p>

                      {address && (
                        <p className="mt-1 flex items-center gap-1">
                          <MapPin className="size-3.5 shrink-0" />
                          <span className="truncate">{address}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-border pt-5">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Service price
                      </p>
                      <p className="mt-1 text-xl font-semibold">
                        ৳{Number(service.price).toLocaleString("en-BD")}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      View details
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {safeTotalPages > 1 && (
            <nav
              aria-label="Services pagination"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                disabled={isLoading || currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
              >
                Previous
              </button>

              {paginationItems.map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 text-muted-foreground"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    disabled={isLoading || item === currentPage}
                    onClick={() => goToPage(item)}
                    aria-current={currentPage === item ? "page" : undefined}
                    className={`min-w-10 rounded-lg border px-3 py-2 text-sm transition-colors disabled:cursor-default ${
                      currentPage === item
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-accent disabled:opacity-60"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={isLoading || currentPage >= safeTotalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}

      {!isLoading && !isError && services.length === 0 && (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <Search className="mx-auto size-8 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No services found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 text-sm font-semibold text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
