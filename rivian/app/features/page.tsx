import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const features = [
  {
    title: "Format-first exam builder",
    description:
      "Define sections, marks, and difficulty balance before you draft a single question.",
  },
  {
    title: "Syllabus alignment",
    description:
      "Map questions to chapters, learning outcomes, and Bloom levels for every paper.",
  },
  {
    title: "AI question generation",
    description:
      "Generate questions directly into each section with adjustable tone and difficulty.",
  },
  {
    title: "Question bank management",
    description:
      "Tag, reuse, and version questions without losing context or alignment history.",
  },
  {
    title: "Duplication checks",
    description:
      "Instant similarity scans flag repeats before they make it into a live exam.",
  },
  {
    title: "Formatting consistency",
    description:
      "Auto-formatting keeps every paper clean, legible, and export-ready.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Main features
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 font-display">
            Built for real academic workflows.
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Rivian focuses on structure, repeatability, and reliability so you can
            ship assessment materials faster.
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-10 w-10 rounded-2xl bg-[var(--rivian-yellow-soft)] text-center text-sm font-semibold leading-10 text-slate-700">
                +
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-[32px] border border-slate-200 bg-white px-8 py-10 shadow-[var(--rivian-shadow)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 font-display">
                Designed for departments, not demos.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Rivian keeps drafts, versions, and review notes organized across
                semesters. Everything is structured so departments can collaborate.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Version history",
                  "Review workflow",
                  "Export packs",
                  "Shared rubrics",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="space-y-3">
                {[
                  "Departmental templates",
                  "Course-level permissions",
                  "Audit-ready exports",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
