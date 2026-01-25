import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const steps = [
  { title: "Exam details", status: "current" },
  { title: "Sections", status: "up-next" },
  { title: "Question mix", status: "up-next" },
  { title: "Review & export", status: "up-next" },
];

const sections = [
  {
    name: "Section A: Multiple Choice",
    items: "20 questions",
    difficulty: "Foundational",
    marks: "20 marks",
  },
  {
    name: "Section B: Short Answer",
    items: "10 questions",
    difficulty: "Core",
    marks: "30 marks",
  },
  {
    name: "Section C: Long Form",
    items: "3 questions",
    difficulty: "Applied",
    marks: "50 marks",
  },
];

const outline = [
  "Learning outcomes mapped: 6",
  "Chapters covered: 4 - 9",
  "Total marks: 100",
  "Target duration: 120 minutes",
];

export default function BuilderPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 font-display">
              Format Builder
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Define the exam blueprint before any questions are written.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
              Save draft
            </button>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Generate questions
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr_320px]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Steps
              </p>
              <div className="mt-4 space-y-3">
                {steps.map((step) => (
                  <div
                    key={step.title}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                      step.status === "current"
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Status
              </p>
              <div className="mt-3 text-sm text-slate-600">
                Blueprint 70% complete
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-2/3 rounded-full bg-slate-900" />
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Exam details
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  { label: "Course", value: "BIO 201 - Genetics" },
                  { label: "Assessment", value: "Midterm 2" },
                  { label: "Duration", value: "120 minutes" },
                  { label: "Total marks", value: "100" },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {field.label}
                    </p>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Notes
                </p>
                <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Focus on Chapters 4-9, emphasize meiosis vs mitosis differences.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Sections
              </h2>
              <div className="mt-5 space-y-4">
                {sections.map((section) => (
                  <div
                    key={section.name}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {section.name}
                        </p>
                        <p className="text-xs text-slate-500">{section.items}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {section.difficulty}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {section.marks}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-500">
                  + Add section
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Live outline
              </h2>
              <div className="mt-4 space-y-3">
                {outline.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                AI readiness
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                3 sources attached, 2 chapters missing coverage.
              </p>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-[var(--rivian-yellow-soft)] px-4 py-3 text-sm text-slate-700">
                Upload slides to finalize Chapter 8.
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
