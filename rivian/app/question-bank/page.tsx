import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const bankCategories = [
  {
    id: "biology",
    name: "Biology",
    description: "Genetics, cell biology, ecology, and lab-ready items.",
    lastUpdated: "Updated 2 days ago",
    questionCount: 245,
  },
  {
    id: "economics",
    name: "Economics",
    description: "Micro, macro, econometrics, and policy case studies.",
    lastUpdated: "Updated 5 days ago",
    questionCount: 188,
  },
];

export default function QuestionBankLandingPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="flex flex-col gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Question banks</p>
          <h1 className="text-3xl font-semibold text-slate-900 font-display">Choose a subject library</h1>
          <p className="text-base text-slate-600">
            Browse curated question sets by discipline to reuse, edit, or export into new assessments.
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {bankCategories.map((bank) => (
            <Link
              key={bank.id}
              href={`/question-bank/${bank.id}`}
              className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{bank.name}</h2>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {bank.questionCount} questions
                </span>
              </div>
              <p className="flex-1 text-sm text-slate-600">{bank.description}</p>
              <span className="text-xs text-slate-400">{bank.lastUpdated}</span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                Explore bank
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
