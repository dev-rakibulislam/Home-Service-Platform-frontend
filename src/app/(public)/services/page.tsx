import ServiceCard from "@/components/service/serviceCard";

const services = [
  {
    id: "1",
    name: "AC Repair",
    description: "Professional air conditioner repair service",
    price: "1200.45",
    duration: 60,
    isActive: true,
  },
  {
    id: "2",
    name: "Plumbing",
    description: "Reliable plumbing repair and installation service",
    price: "800",
    duration: 45,
    isActive: true,
  },
  {
    id: "3",
    name: "Electrical Repair",
    description: "Professional electrical repair and maintenance",
    price: "1000",
    duration: 60,
    isActive: true,
  },
];

export default function ServicePage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-primary">
              FixItNow Services
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Professional Services for Your Home
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Find trusted professionals and book reliable home services
              quickly and easily.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Available Services
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose a service that fits your needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
