
"use client";

import Link from "next/link";
import SectionMessage from "../shared/sectionMessage";
import SectionTitle from "../shared/sectionTitle";
import { Button } from "../ui/button";
import { useGetServices } from "@/hooks/service.hook";
import { ArrowUpRight, Clock3, Star, UserRound } from "lucide-react";

export default function FeaturedServices() {
  const { data, isLoading, isError, refetch } = useGetServices();
  const services = data?.data ?? [];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="Our services"
            title="Small jobs. Big peace of mind."
            description="Reliable professionals for everyday home services."
          />
        </div>

        <div className="mt-8">
          {isError && (
            <SectionMessage
              title="Services couldn't load"
              description="Please try again."
              action={
                <Button variant="outline" onClick={() => void refetch()}>
                  Try again
                </Button>
              }
            />
          )}

          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="h-56 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          )}

          {!isLoading && !isError && services.length === 0 && (
            <SectionMessage
              title="No services available"
              description="Explore our catalog to see available services."
              action={
                <Button asChild variant="outline">
                  <Link href="/services">Explore services</Link>
                </Button>
              }
            />
          )}

          {!isLoading && !isError && services.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service:any) => {
                const technician = service.technician;
                const price = Number(service.price);
                const rating = Number(technician?.avgRating);
                const hasRating =
                  technician?.avgRating != null && Number.isFinite(rating);

                return (
                  <Link
                    key={service.id}
                    href={`/services/${encodeURIComponent(service.id)}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {service.category?.name && (
                          <p className="text-xs text-muted-foreground">
                            {service.category.name}
                          </p>
                        )}

                        <h3 className="mt-2 font-semibold text-card-foreground transition-colors group-hover:text-primary">
                          {service.name}
                        </h3>
                      </div>

                      {hasRating && (
                        <span className="flex shrink-0 items-center gap-1 text-sm text-foreground">
                          <Star className="size-4 fill-current text-muted-foreground" />
                          {rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {service.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                        {service.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                      <UserRound className="size-4 shrink-0" />
                      <span className="truncate">
                        {technician?.user?.name ??
                          technician?.userName ??
                          "Professional technician"}
                      </span>

                      {technician?.experienceYears != null && (
                        <span className="shrink-0">
                          · {technician.experienceYears} yrs
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="mt-1 text-xl font-semibold text-primary">
                          {Number.isFinite(price)
                            ? `৳${price.toLocaleString("en-BD")}`
                            : "Get a quote"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {service.duration != null && (
                          <span className="flex items-center gap-1">
                            <Clock3 className="size-3.5" />
                            {service.duration} min
                          </span>
                        )}

                        <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
