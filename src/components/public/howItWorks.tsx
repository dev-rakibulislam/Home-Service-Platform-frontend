import { ArrowRight, CalendarDays, Check, Search } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Find what you need",
    text: "Choose a service and see professionals who can help.",
  },
  {
    icon: CalendarDays,
    number: "02",
    title: "Pick a time",
    text: "Choose an available slot that fits your schedule.",
  },
  {
    icon: Check,
    number: "03",
    title: "Feel right at home",
    text: "Track your booking and get the job done with confidence.",
  },
];
export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-[0.18em] text-primary uppercase">
            Simple from start to done
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Good help, in three easy steps.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, text }, index) => (
            <div
              key={number}
              className="relative rounded-3xl border border-slate-200 bg-[#fbfdfd] p-7"
            >
              {index < steps.length - 1 ? (
                <div className="absolute top-12 right-[-1.6rem] z-10 hidden text-teal-300 lg:block">
                  <ArrowRight className="size-6" />
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold tracking-widest text-slate-300">
                  {number}
                </span>
              </div>
              <h3 className="mt-7 text-lg font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
