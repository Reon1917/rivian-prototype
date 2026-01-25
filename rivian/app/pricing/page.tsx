import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const tiers = [
  {
    name: "Starter",
    price: "$5",
    description: "For light use and quick quizzes.",
    limits: [
      "Up to 150 questions generated",
      "Up to 5 exam papers",
      "Up to 3 source uploads",
      "Question bank up to 200",
    ],
    includes: [
      "Exam format builder",
      "MCQ, True/False, Fill in the Blank, Short Answer",
      "Grammar-checked questions",
      "Duplicate checks in selected topics",
      "PDF and DOCX export",
    ],
  },
  {
    name: "Standard",
    price: "$10",
    description: "For regular teaching and full exams.",
    limits: [
      "Up to 400 questions generated",
      "Up to 15 exam papers",
      "Up to 10 source uploads",
      "Question bank up to 1,000",
    ],
    includes: [
      "Everything in Starter",
      "Full exam papers (midterm and final)",
      "Better topic and category control",
      "Stronger duplicate detection",
      "Answer key generation",
      "Reusable exam formats",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "$20",
    description: "For heavy use and exam management.",
    limits: [
      "Up to 1,000 questions generated",
      "Up to 50 exam papers",
      "Up to 30 source uploads",
      "Question bank up to 5,000",
    ],
    includes: [
      "Everything in Standard",
      "Complex multi-section exams",
      "Advanced similarity checking",
      "Multiple versions of the same exam",
      "Shuffled questions and answers",
      "Priority processing for large papers",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Pricing
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 font-display">
            Simple pricing for academic teams.
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Pick the tier that matches your workload. All plans include the full
            exam format builder.
          </p>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[32px] border p-6 shadow-sm ${
                tier.highlight
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{tier.name}</h2>
                {tier.highlight ? (
                  <span className="rounded-full bg-[var(--rivian-yellow)] px-3 py-1 text-xs font-semibold text-slate-900">
                    Most popular
                  </span>
                ) : null}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold">{tier.price}</span>
                <span className="text-sm text-slate-400">
                  / educator / month
                </span>
              </div>
              <p
                className={`mt-4 text-sm ${
                  tier.highlight ? "text-slate-200" : "text-slate-600"
                }`}
              >
                {tier.description}
              </p>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Monthly limits
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {tier.limits.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          tier.highlight ? "bg-[var(--rivian-yellow)]" : "bg-slate-900"
                        }`}
                      />
                      <span className={tier.highlight ? "text-slate-100" : "text-slate-600"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Includes
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          tier.highlight ? "bg-[var(--rivian-yellow)]" : "bg-slate-900"
                        }`}
                      />
                      <span className={tier.highlight ? "text-slate-100" : "text-slate-600"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-8 w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tier.highlight
                    ? "bg-white text-slate-900 hover:bg-slate-100"
                    : "border border-slate-300 text-slate-700 hover:border-slate-400"
                }`}
              >
                Choose {tier.name}
              </button>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Notes
              </p>
              <ul className="mt-3 space-y-2">
                <li>Limits reset every month.</li>
                <li>Unused limits do not roll over.</li>
                <li>Upgrade or downgrade anytime.</li>
                <li>All plans support export and local backups.</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Quick guidance
              </p>
              <ul className="mt-3 space-y-2">
                <li>Weekly quiz is usually 10 to 15 questions.</li>
                <li>Midterm is often 40 to 60 questions.</li>
                <li>Standard covers multiple classes comfortably.</li>
                <li>Pro supports larger programs and exam teams.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
