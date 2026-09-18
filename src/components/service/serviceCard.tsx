import { ArrowRight, Clock, Wrench } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: number;
  isActive: boolean;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Icon */}
      <div className="flex h-44 items-center justify-center bg-primary/5">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <Wrench className="size-9" strokeWidth={1.7} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{service.name}</h3>

          <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
            Available
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-5 flex items-end justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              ৳{Number(service.price).toLocaleString("en-BD")}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" />
            {service.duration} min
          </div>
        </div>

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
        >
          Book Service
          <ArrowRight className="size-4" />
        </button>
      </div>
    </article>
  );
}
