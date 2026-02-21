import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const journeySteps = [
  {
    step: "01",
    title: "Start with Structure",
    subtitle: "Define your assessment format first",
    description:
      "Before writing a single question, Dr. Sarah sets up her midterm format: three sections, 100 points total, balanced difficulty. The format becomes her blueprint.",
    features: [
      "Section templates with point allocation",
      "Difficulty distribution controls",
      "Question type mix planning",
    ],
    icon: "📋",
    color: "blue",
  },
  {
    step: "02",
    title: "Build Your Question Bank",
    subtitle: "Create or browse curated questions",
    description:
      "Sarah browses the Biology question bank, filtering by topic and difficulty. She finds genetics questions from her colleagues and adds her own about cell division.",
    features: [
      "Subject-specific question libraries",
      "Multiple question types (MCQ, short answer, matching, etc.)",
      "Tag by topic, difficulty, and learning outcomes",
    ],
    icon: "💡",
    color: "purple",
  },
  {
    step: "03",
    title: "Collaborate with Your Team",
    subtitle: "Share resources and work together",
    description:
      "Sarah invites Prof. Chen to her Biology Department team. They share question banks and assessment formats, building a collaborative resource library.",
    features: [
      "Create teams by subject or course",
      "Invite members via email or join code",
      "Share question banks and formats instantly",
    ],
    icon: "👥",
    color: "green",
  },
  {
    step: "04",
    title: "Generate with AI",
    subtitle: "Let AI help fill the gaps",
    description:
      "For her ecology section, Sarah uses AI to generate 5 questions about ecosystem dynamics. She reviews, tweaks wording, and adds them to her exam.",
    features: [
      "AI-powered question generation",
      "Adjustable difficulty and tone",
      "Upload content for context-aware questions",
    ],
    icon: "✨",
    color: "yellow",
  },
  {
    step: "05",
    title: "Build Your Assessment",
    subtitle: "Drag, drop, and organize",
    description:
      "Using the builder, Sarah drags questions from her bank into each section. The tool tracks points, difficulty balance, and alerts her to any duplicates.",
    features: [
      "Visual drag-and-drop builder",
      "Real-time point and difficulty tracking",
      "Automatic duplication detection",
    ],
    icon: "🎯",
    color: "red",
  },
  {
    step: "06",
    title: "Review and Export",
    subtitle: "Polish and deliver",
    description:
      "Sarah reviews the complete exam, checks alignment with learning outcomes, and exports a clean PDF. The format is perfect, ready to print and distribute.",
    features: [
      "Syllabus and outcome alignment checks",
      "Professional formatting automatically applied",
      "Export to PDF, Word, or print-ready formats",
    ],
    icon: "📄",
    color: "slate",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Your Assessment Journey
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 font-display">
            From blank page to polished exam in 6 steps
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Follow Dr. Sarah's journey as she creates a midterm exam using Rivian. 
            See how the platform supports every step of the assessment design process.
          </p>
        </header>

        {/* Journey Steps */}
        <section className="mt-16 space-y-12">
          {journeySteps.map((step, index) => (
            <div
              key={step.step}
              className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 items-center"
            >
              {/* Step Number Indicator */}
              <div className="absolute -left-4 top-0 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-100 bg-white text-2xl font-bold text-slate-400">
                    {step.step}
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="absolute left-8 top-16 h-[calc(100%+3rem)] w-0.5 bg-slate-200" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="lg:pl-20">
                <div className="flex items-center gap-3 lg:hidden mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                    {step.step}
                  </span>
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h2 className="text-2xl font-semibold text-slate-900 font-display">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  {step.subtitle}
                </p>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Features Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Key Features
                </p>
                <ul className="space-y-3">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* The Result */}
        <section className="mt-20 rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-8 py-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 mb-6">
              ✓ Assessment Complete
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 font-display">
              The Result: A Polished, Professional Exam
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              In under an hour, Dr. Sarah created a comprehensive midterm exam. The format is balanced, 
              questions are aligned with learning outcomes, and everything is export-ready. What used 
              to take days of work now happens in a single focused session.
            </p>
            
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-3xl font-bold text-slate-900">60 min</div>
                <div className="mt-2 text-sm text-slate-600">Time saved vs. manual creation</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-3xl font-bold text-slate-900">100%</div>
                <div className="mt-2 text-sm text-slate-600">Syllabus alignment verified</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-3xl font-bold text-slate-900">0</div>
                <div className="mt-2 text-sm text-slate-600">Duplicate questions detected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Teams */}
        <section className="mt-16 rounded-[32px] border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 font-display">
                Built for Departments, Not Just Individuals
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                When Prof. Chen joins Sarah's team, he immediately has access to all shared resources. 
                They can collaborate on question banks, share assessment formats, and maintain consistency 
                across all their courses. Everyone works faster, and quality stays high.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Team collaboration",
                  "Shared question banks",
                  "Format templates",
                  "Version history",
                  "Access controls",
                  "Audit trails",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="space-y-3">
                {[
                  "Invite unlimited team members",
                  "Share resources instantly",
                  "Maintain quality standards",
                  "Build institutional knowledge",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 font-display">
            Ready to transform your assessment creation process?
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Join educators who are already saving time and building better assessments with Rivian.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/builder"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Try the builder
            </Link>
            <Link
              href="/question-bank"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Explore question banks
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
