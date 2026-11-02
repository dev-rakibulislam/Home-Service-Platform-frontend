import { ArrowRight, ArrowUpRight, Mail, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import siteDetails from "@/config/publicSiteData";

const linkGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Browse services", href: "/services" },
      { label: "Find a technician", href: "/technicians" },
      { label: "About FixItNow", href: "/about-us" },
    ],
  },
  {
    title: "For professionals",
    links: [
      { label: "Join as a technician", href: "/register" },
      { label: "Technician sign in", href: "/login" },
    ],
  },
  {
    title: "Help & information",
    links: [
      { label: "Customer sign in", href: "/login" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Contact support", href: "mailto:support@fixitnow.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b3f45] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 size-[28rem] rounded-full bg-teal-400/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-white/15 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-teal-200 uppercase">
              Need a hand at home?
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Let’s find the right pro for the job.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-semibold text-[#0b3f45] transition-colors hover:bg-teal-50 sm:self-auto"
          >
            Explore services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 lg:py-14">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Image
                  src="/logo.png"
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                />
              </span>
              <span className="text-xl font-semibold tracking-tight">
                {siteDetails.name}
              </span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-teal-50/75">
              A simpler way to find skilled help for the home. Browse services,
              meet local professionals, and book on your schedule.
            </p>
            <a
              href="mailto:support@fixitnow.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-teal-200"
            >
              <Mail className="size-4 text-teal-200" />
              support@fixitnow.com
              <ArrowUpRight className="size-3.5 opacity-60" />
            </a>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold text-white">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-teal-50/70 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs text-teal-50/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteDetails.name}. All rights
            reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Made for the place you call home{" "}
            <Wrench className="size-3.5 text-teal-200" />
          </p>
        </div>
      </div>
    </footer>
  );
}
