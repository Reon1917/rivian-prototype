import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const questions = [
  {
    id: "QB-204",
    question: "Explain the role of the spindle apparatus in mitosis.",
    type: "Short Answer",
    topic: "Cell Division",
    difficulty: "Medium",
    status: "Reviewed",
  },
  {
    id: "QB-318",
    question: "Which of the following best describes genetic linkage?",
    type: "Multiple Choice",
    topic: "Inheritance",
    difficulty: "Easy",
    status: "Draft",
  },
  {
    id: "QB-522",
    question: "Compare the outcomes of meiosis I and meiosis II.",
    type: "Long Form",
    topic: "Meiosis",
    difficulty: "Hard",
    status: "Reviewed",
  },
  {
    id: "QB-417",
    question: "Define phenotype and provide an example in humans.",
    type: "Short Answer",
    topic: "Genetics Basics",
    difficulty: "Easy",
    status: "Approved",
  },
  {
    id: "QB-609",
    question: "A dihybrid cross produces which expected ratio in F2?",
    type: "Multiple Choice",
    topic: "Inheritance",
    difficulty: "Medium",
    status: "Reviewed",
  },
];

export default function QuestionBankPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 font-display">
              Question Bank
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Browse, tag, and reuse questions with full syllabus context.
            </p>
          </div>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Add question
          </button>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1.4fr_repeat(3,0.6fr)_0.4fr]">
            <input
              type="text"
              placeholder="Search by keyword or ID"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            />
            {[
              "Topic",
              "Type",
              "Difficulty",
            ].map((label) => (
              <select
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                defaultValue={label}
              >
                <option>{label}</option>
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            ))}
            <button className="rounded-2xl border border-slate-200 bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              Filter
            </button>
          </div>
        </section>

        <section className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[0.7fr_2fr_1fr_1fr_0.9fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <span>ID</span>
              <span>Question</span>
              <span>Type</span>
              <span>Topic</span>
              <span>Difficulty</span>
              <span>Status</span>
            </div>
            {questions.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[0.7fr_2fr_1fr_1fr_0.9fr_0.8fr] gap-4 border-b border-slate-100 px-6 py-4 text-sm text-slate-700"
              >
                <span className="font-semibold text-slate-900">{item.id}</span>
                <span>{item.question}</span>
                <span className="text-slate-600">{item.type}</span>
                <span className="text-slate-600">{item.topic}</span>
                <span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {item.difficulty}
                  </span>
                </span>
                <span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {item.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
