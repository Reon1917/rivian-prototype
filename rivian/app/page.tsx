import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const workflow = [
  {
    title: "Define the exam format",
    description:
      "Start with structure: sections, question types, difficulty balance, and marks. Rivian keeps the blueprint consistent across every paper.",
  },
  {
    title: "Pull from your materials",
    description:
      "Attach lecture notes, textbooks, or past exams. Rivian aligns new questions to the syllabus you already teach.",
  },
  {
    title: "Generate + review",
    description:
      "AI drafts questions inside the format. You review clarity, difficulty, and duplication in a single workspace.",
  },
];

const highlightCards = [
  {
    title: "Format-first builder",
    description:
      "Design the entire paper before any question is written. Every section stays aligned with your blueprint.",
  },
  {
    title: "Question bank continuity",
    description:
      "Store and tag questions by chapter, outcome, and difficulty. Reuse with confidence and track overlap.",
  },
  {
    title: "Consistency checks",
    description:
      "Automatic spacing, marks totals, and duplication alerts reduce manual proofreading across versions.",
  },
];

const stats = [
  { label: "Avg. paper build time", value: "18 min" },
  { label: "Quality review steps", value: "7 checkpoints" },
  { label: "Aligned with syllabus", value: "100%" },
];

export default function Home() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(244,211,94,0.3)_0%,_rgba(244,211,94,0)_70%)]" />
            <div className="absolute left-10 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(148,163,184,0.35)_0%,_rgba(248,250,252,0)_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
          </div>
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--rivian-yellow-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                Structured exam creation
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl font-display">
                Create exam papers in minutes, not days.
              </h1>
              <p className="mt-6 text-lg text-slate-600">
                Rivian is the assessment design platform that keeps educators focused on
                learning outcomes. Build formats, generate questions, and ship consistent
                papers fast.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/builder"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
                >
                  Start a new paper
                </Link>
                <Link
                  href="/features"
                  className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  See the workflow
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
                  >
                    <div className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-6 top-10 h-32 w-32 rounded-3xl border border-slate-200 bg-white/70" />
              <div className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-[var(--rivian-shadow)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Exam outline
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900">
                      Biology Midterm 2
                    </h2>
                  </div>
                  <span className="rounded-full bg-[var(--rivian-yellow-soft)] px-3 py-1 text-xs font-semibold text-slate-700">
                    Draft
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    "Section A - Multiple Choice - 20 marks",
                    "Section B - Short Answer - 30 marks",
                    "Section C - Long Form - 50 marks",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm text-slate-700">{item}</span>
                      <span className="h-2 w-2 rounded-full bg-slate-900" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    AI generation queue
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Generate 15 questions</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Ready
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 w-2/3 rounded-full bg-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 font-display">
                Build once. Reuse forever.
              </h2>
              <p className="mt-4 max-w-xl text-base text-slate-600">
                Rivian treats assessment design like a system. Start from the
                structure, then let AI handle the repetition.
              </p>
            </div>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Open the builder
              <span aria-hidden>{"->"}</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {workflow.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-10 w-10 rounded-2xl bg-[var(--rivian-yellow-soft)] text-center text-sm font-semibold leading-10 text-slate-700">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-100/60 py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  What makes Rivian different
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 font-display">
                  Academic quality, built in.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Designed for institutions that need repeatable outcomes, not
                  one-off AI prompts.
                </p>
                <div className="mt-8 space-y-4">
                  {highlightCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <h3 className="text-sm font-semibold text-slate-900">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[var(--rivian-shadow)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Paper overview
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      Intro to Macroeconomics
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    Version 3
                  </span>
                </div>
                <div className="mt-6 grid gap-4">
                  {[
                    "Knowledge balance: 40% recall - 60% application",
                    "Coverage: 8 chapters - 3 learning outcomes",
                    "Duplication risk: 2 alerts",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "Bloom level mix",
                    "Syllabus alignment",
                    "Proofreading",
                    "Export ready",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-12 shadow-[var(--rivian-shadow)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 font-display">
                  Ready to build your next exam?
                </h2>
                <p className="mt-3 max-w-xl text-base text-slate-600">
                  See the builder, question bank, and AI generator in action. No
                  setup required.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/builder"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                >
                  Launch the prototype
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
