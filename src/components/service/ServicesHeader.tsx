"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

type ServicesHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: [string, string][];
  category: string;
  onCategoryChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
};

export default function ServicesHeader({
  search,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
  showFilters,
  onToggleFilters,
}: ServicesHeaderProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Find your service
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            The right service.
            <br className="hidden sm:block" /> The right professional.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Explore our services, compare prices, and find the right
            professional for your needs.
          </p>
        </div>

        <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-xl border border-border bg-card px-4 focus-within:border-primary">
          <Search className="size-5 shrink-0 text-muted-foreground" />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search services by name or category..."
            aria-label="Search services"
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Browse categories</h2>

            <button
              type="button"
              onClick={onToggleFilters}
              aria-expanded={showFilters}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={`min-w-0 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                category === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-accent"
              }`}
            >
              All services
            </button>

            {categories.map(([id, name]) => (
              <button
                type="button"
                key={id}
                onClick={() => onCategoryChange(name)}
                title={name}
                className={`min-w-0 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                  category === name
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                <span className="block truncate">{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
