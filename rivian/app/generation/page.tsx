import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const generated = [
  {
    status: "Ready",
    question: "Explain how crossing over increases genetic variation during meiosis.",
    type: "Short Answer",
  },
  {
    status: "Review",
    question: "Which statement best describes independent assortment?",
    type: "Multiple Choice",
  },
  {
    status: "Ready",
    question: "Analyze the impact of nondisjunction on gamete formation.",
    type: "Long Form",
  },
];

export default function GenerationPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 font-display">
              Question Generation
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Generate new questions aligned to your format and syllabus.
            </p>
          </div>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Run generation
          </button>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Source materials
              </h2>
              <div className="mt-4 space-y-4">
                {[
                  "Lecture notes: Genetics Week 4-6",
                  "Textbook: Campbell Biology Ch. 8",
                  "Past Midterm 2023",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <span>{item}</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Attached
                    </span>
                  </div>
                ))}
                <button className="w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-500">
                  + Add new source
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Generation settings
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  { label: "Questions to generate", value: "15" },
                  { label: "Difficulty mix", value: "40% Easy - 40% Medium - 20% Hard" },
                  { label: "Bloom levels", value: "Remember, Apply, Analyze" },
                  { label: "Language", value: "English (US)" },
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
              <div className="mt-6 rounded-2xl border border-slate-200 bg-[var(--rivian-yellow-soft)] px-4 py-3 text-sm text-slate-700">
                Duplicate check enabled against your question bank.
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Generated questions
                </h2>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                  3 of 15
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {generated.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {item.type}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Ready"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{item.question}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
                        Edit
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
                        Approve
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
                        Replace
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Quality checks
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>2 similarity warnings to review</li>
                <li>1 grammar fix suggested</li>
                <li>Coverage gap: Chapter 8 remains</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
