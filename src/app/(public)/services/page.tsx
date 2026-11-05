"use client";

import { useMemo, useState } from "react";

import { useGetAllServices } from "@/hooks";
import ServicesGrid, { type Service } from "@/components/service/serviceGrid";
import ServicesHeader from "@/components/service/ServicesHeader";

const ITEMS_PER_PAGE = 6;

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetAllServices({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    category: category !== "all" ? category : undefined,
    location: location.trim() || undefined,
    minRating: minRating !== "all" ? Number(minRating) : undefined,
    maxPrice: maxPrice.trim() ? Number(maxPrice) : undefined,
  });

  const services: Service[] = data?.data ?? [];
  const totalPages = data?.metaData?.totalPages ?? 1;
  const totalServices = data?.metaData?.total ?? 0;

  const categories = useMemo<[string, string][]>(
    () =>
      Array.from(
        new Map(
          services
            .filter((service) => service.category)
            .map((service) => [service.category!.id, service.category!.name]),
        ).entries(),
      ),
    [services],
  );

  // Filter change handlers: reset pagination immediately.
  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setCurrentPage(1);
  }

  function handleLocationChange(value: string) {
    setLocation(value);
    setCurrentPage(1);
  }

  function handleMinRatingChange(value: string) {
    setMinRating(value);
    setCurrentPage(1);
  }

  function handleMaxPriceChange(value: string) {
    setMaxPrice(value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;

    setCurrentPage(page);
  }

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setLocation("");
    setMinRating("all");
    setMaxPrice("");
    setCurrentPage(1);
  }

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    location.trim() !== "" ||
    minRating !== "all" ||
    maxPrice.trim() !== "";

  const displayedServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return services;

    return services.filter((service) => {
      return (
        service.name.toLowerCase().includes(query) ||
        (service.description ?? "").toLowerCase().includes(query) ||
        (service.category?.name ?? "").toLowerCase().includes(query) ||
        (service.technician?.user?.name ?? "").toLowerCase().includes(query)
      );
    });
  }, [services, search]);

  return (
    <main className="min-h-screen">
      <ServicesHeader
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        location={location}
        onLocationChange={handleLocationChange}
        minRating={minRating}
        onMinRatingChange={handleMinRatingChange}
        maxPrice={maxPrice}
        onMaxPriceChange={handleMaxPriceChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((value) => !value)}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Available services
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {totalServices > 0
                ? `${totalServices} services available`
                : "Browse available services"}
            </p>
          </div>

          {isFetching && (
            // biome-ignore lint/a11y/useSemanticElements: <explanation>
            <span role="status" className="text-sm text-muted-foreground">
              Updating services...
            </span>
          )}
        </div>

        <ServicesGrid
          services={displayedServices}
          isLoading={isLoading}
          isError={isError}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onClearFilters={clearFilters}
        />
      </section>
    </main>
  );
}
