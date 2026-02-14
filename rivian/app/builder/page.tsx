import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

type SavedFormatCard = {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
  sections: number;
  marks: number;
  href?: string;
  badge?: string;
};

const savedFormats: SavedFormatCard[] = [
  {
    id: "format-prototype",
    name: "Genetics Midterm Template",
    description: "Full cover sheet + structured sections ready for AI generation.",
    lastEdited: "2 days ago",
    sections: 3,
    marks: 100,
    href: "/builder/editor",
    badge: "Active",
  },
  {
    id: "format-drafting",
    name: "Econometrics Final v1",
    description: "Draft pulled from last semester. Needs instruction rewrite.",
    lastEdited: "5 days ago",
    sections: 4,
    marks: 80,
  },
  {
    id: "format-template",
    name: "Blank University Cover Sheet",
    description: "Starter format with empty sections and placeholder headings.",
    lastEdited: "1 week ago",
    sections: 2,
    marks: 50,
    badge: "Template",
  },
];

export default function BuilderPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Format library
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">
              Choose an exam blueprint to open
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Start from a saved structure or re-open an in-progress format. You can still create new layouts once inside the builder.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  type="search"
                  placeholder="Search formats by title or subject"
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
                <svg
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-3.5-3.5m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0014 0z"
                  />
                </svg>
              </div>
              <Link
                href="/builder/editor"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800"
              >
                Create new format
              </Link>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-3 lg:mt-0 lg:items-end">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">3 saved formats</p>
              <p className="text-xs text-slate-500">Last updated Feb 2026</p>
            </div>
            <p className="text-xs text-slate-500">
              Filter by faculty, semester, or difficulty coming soon.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-8">
          {savedFormats.map((format) => {
            const cardContent = (
              <div
                className={`flex flex-col gap-6 rounded-3xl border px-8 py-8 shadow-sm transition ${
                  format.href
                    ? "border-slate-200 bg-white hover:border-slate-300 hover:shadow"
                    : "border-dashed border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {format.name}
                      </h2>
                      {format.badge ? (
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                          {format.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {format.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Last edited {format.lastEdited}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600">
                    {format.sections} sections
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600">
                    {format.marks} marks
                  </span>
                  {format.id === "format-prototype" ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      Ready to pitch
                    </span>
                  ) : null}
                </div>
                {format.href ? (
                  <div className="flex items-center justify-between pt-2 text-sm font-semibold text-slate-900">
                    <span>Open blueprint</span>
                    <span aria-hidden>→</span>
                  </div>
                ) : null}
              </div>
            );

            if (format.href) {
              return (
                <Link key={format.id} href={format.href} className="no-underline">
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={format.id} className="opacity-80">
                {cardContent}
              </div>
            );
          })}
        </section>

        <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-8 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Need a fresh layout?
            </h2>
            <p className="mt-1">
              Generate a new blueprint inside the editor and save it here for future runs.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Tip: keep your institution branding consistent by cloning an existing format before making changes.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
