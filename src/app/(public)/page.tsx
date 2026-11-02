import Hero from "@/components/public/hero";
import HowItWorks from "@/components/public/howItWorks";
import FeaturedServices from "@/components/public/futuredService";

// type Technician = {
//   id?: string;
//   name?: string;
//   bio?: string | null;
//   avgRating?: number | string | null;
//   hourlyRate?: number | string | null;
//   experienceYears?: number | null;
//   skills?: string[];
//   status?: string;
//   user?: { id?: string; name?: string; image?: string | null };
// };

// function getItems<T>(response: unknown): T[] {
//   if (Array.isArray(response)) return response as T[];
//   if (response && typeof response === "object" && "data" in response) {
//     const data = (response as { data?: unknown }).data;
//     if (Array.isArray(data)) return data as T[];
//   }
//   return [];
// }





// function LoadingCards({ kind }: { kind: "service" | "technician" }) {
//   return (
//     <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//       {[0, 1, 2].map((item) => (
//         <output
//           key={item}
//           aria-label={`Loading ${kind}`}
//           className="block animate-pulse rounded-3xl border border-slate-200 bg-white p-6"
//         >
//           <div className="size-12 rounded-2xl bg-slate-100" />
//           <div className="mt-6 h-5 w-2/3 rounded bg-slate-100" />
//           <div className="mt-3 h-4 w-full rounded bg-slate-100" />
//           <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
//           <div className="mt-8 h-10 rounded-xl bg-slate-100" />
//         </output>
//       ))}
//     </div>
//   );
// }



// function FeaturedTechnicians() {
//   const { data, isLoading, isError, refetch } = useGetAvailableTechnicians();
//   const technicians = useMemo(
//     () =>
//       getItems<Technician>(data)
//         .filter(
//           (technician) => !technician.status || technician.status === "ACTIVE",
//         )
//         .sort((a, b) => Number(b.avgRating ?? 0) - Number(a.avgRating ?? 0))
//         .slice(0, 3),
//     [data],
//   );

//   return (
//     <section className="bg-[#f4f8f8] py-20 sm:py-24">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
//           <SectionTitle
//             eyebrow="People you can trust"
//             title="Meet the hands behind the help."
//             description="Get to know skilled technicians, see what they do best, and choose the right person for your home."
//           />
//           <SectionLink href="/technicians">Meet all technicians</SectionLink>
//         </div>
//         <div className="mt-10">
//           {isLoading ? <LoadingCards kind="technician" /> : null}
//           {isError ? (
//             <SectionMessage
//               title="Technicians couldn't load"
//               description="We couldn't reach the technician list. Please try again in a moment."
//               action={
//                 <Button variant="outline" onClick={() => void refetch()}>
//                   Try again
//                 </Button>
//               }
//             />
//           ) : null}
//           {!isLoading && !isError && technicians.length === 0 ? (
//             <SectionMessage
//               title="No technicians to feature yet"
//               description="Browse the technician directory to see currently available professionals."
//               action={
//                 <Button asChild variant="outline">
//                   <Link href="/technicians">Browse technicians</Link>
//                 </Button>
//               }
//             />
//           ) : null}
//           {!isLoading && !isError && technicians.length > 0 ? (
//             <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {technicians.map((technician, index) => {
//                 const name =
//                   technician.user?.name ||
//                   technician.name ||
//                   "Home service professional";
//                 const id = technician.id || technician.user?.id;
//                 const rating = Number(technician.avgRating ?? 0);
//                 return (
//                   <article
//                     key={id || `${name}-${index}`}
//                     className="rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-xl font-semibold text-white">
//                         {name.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <h3 className="truncate font-semibold text-slate-950">
//                           {name}
//                         </h3>
//                         <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
//                           <Star className="size-4 fill-amber-400 text-amber-400" />{" "}
//                           {Number.isFinite(rating) && rating > 0
//                             ? rating.toFixed(1)
//                             : "New"}{" "}
//                           <span className="text-slate-300">·</span>{" "}
//                           {technician.experienceYears ?? 0}+ years
//                         </p>
//                       </div>
//                     </div>
//                     <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600">
//                       {technician.bio ||
//                         "A local professional ready to help with your home service needs."}
//                     </p>
//                     <div className="mt-4 flex min-h-7 flex-wrap gap-2">
//                       {(technician.skills || []).slice(0, 3).map((skill) => (
//                         <span
//                           key={skill}
//                           className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
//                       <p className="text-sm text-slate-500">
//                         From{" "}
//                         <span className="font-semibold text-slate-950">
//                           {technician.hourlyRate
//                             ? `৳${Number(technician.hourlyRate).toLocaleString("en-BD")}`
//                             : "Contact for rate"}
//                         </span>
//                       </p>
//                       <Link
//                         href={id ? `/technicians/${id}` : "/technicians"}
//                         className="inline-flex items-center gap-1 text-sm font-semibold text-teal-800 hover:text-teal-950"
//                       >
//                         View profile <ArrowRight className="size-4" />
//                       </Link>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedServices />
      {/* <FeaturedTechnicians /> */}
      <HowItWorks />
    </main>
  );
}
