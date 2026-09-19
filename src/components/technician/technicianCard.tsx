
export default function TechnicianCard({ technician }:any) {
  const rating = Number(technician.avgRating);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Decorative background */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-6 pb-14 pt-5">
        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative flex items-center justify-between">
          <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            Technician
          </span>

          <span
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md ${
              technician.status === "ACTIVE"
                ? "border-emerald-300/30 bg-emerald-400/20 text-emerald-50"
                : "border-red-300/30 bg-red-400/20 text-red-50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                technician.status === "ACTIVE" ? "bg-emerald-300" : "bg-red-300"
              }`}
            />

            {technician.status}
          </span>
        </div>
      </div>

      {/* Profile */}
      <div className="relative px-6">
        <div className="-mt-12 flex items-end justify-between">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-extrabold text-white shadow-xl ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-105">
            {technician.user.name.charAt(0).toUpperCase()}
          </div>

        </div>

        <div className="mt-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            {technician.user.name}
          </h2>

          <p className="mt-1 truncate text-sm text-slate-500">
            {technician.user.email}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        {/* Bio */}
        <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-600">
          {technician.bio || "Professional technician ready to help you."}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Experience */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50/50">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ⏱
            </div>

            <p className="text-xs font-medium text-slate-500">Experience</p>

            <p className="mt-1 text-base font-bold text-slate-900">
              {technician.experienceYears} Years
            </p>
          </div>

          {/* Hourly Rate */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors group-hover:border-indigo-100 group-hover:bg-indigo-50/50">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              $
            </div>

            <p className="text-xs font-medium text-slate-500">Hourly Rate</p>

            <p className="mt-1 text-base font-bold text-slate-900">
              ${technician.hourlyRate}
              <span className="ml-1 text-xs font-medium text-slate-400">
                /hr
              </span>
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Customer Rating
            </p>

            <div className="mt-1 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-base ${
                    star <= rating ? "text-amber-400" : "text-slate-200"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <span className="text-sm font-bold text-slate-700">
            {technician.avgRating || "0.0"}/5
          </span>
        </div>

        {/* Skills */}
        <div className="mt-5 min-h-[62px]">
          {technician.skills?.length > 0 ? (
            <>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Expertise
              </p>

              <div className="flex flex-wrap gap-2">
                {technician.skills.slice(0, 4).map((skill: any) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    {skill}
                  </span>
                ))}

                {technician.skills.length > 4 && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
                    +{technician.skills.length - 4} more
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="invisible">
              <p className="mb-2 text-xs">Expertise</p>
              <div className="h-7" />
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0"
        >
          Book Service
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );

}
