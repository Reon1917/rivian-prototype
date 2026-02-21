"use client";

import { useState } from "react";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const questions = [
  // Multiple Choice Questions
  {
    id: "ECO-101",
    question: "Which estimator is unbiased for the population mean given iid samples?",
    type: "Multiple Choice",
    topic: "Statistics foundations",
    difficulty: "Easy",
    status: "Reviewed",
    options: [
      { label: "Sample variance", correct: false },
      { label: "Sample median", correct: false },
      { label: "Sample mean", correct: true },
      { label: "Population variance", correct: false },
    ],
    answer: "Sample mean",
  },
  {
    id: "ECO-203",
    question: "What does a price elasticity of demand of -2.5 indicate?",
    type: "Multiple Choice",
    topic: "Microeconomics",
    difficulty: "Medium",
    status: "Reviewed",
    options: [
      { label: "Demand is inelastic", correct: false },
      { label: "Demand is elastic", correct: true },
      { label: "Demand is unit elastic", correct: false },
      { label: "Demand is perfectly inelastic", correct: false },
    ],
    answer: "Demand is elastic",
  },
  {
    id: "ECO-338",
    question: "In a perfectly competitive market, firms in the long run earn:",
    type: "Multiple Choice",
    topic: "Market structures",
    difficulty: "Easy",
    status: "Approved",
    options: [
      { label: "Positive economic profit", correct: false },
      { label: "Zero economic profit", correct: true },
      { label: "Negative economic profit", correct: false },
      { label: "Accounting losses", correct: false },
    ],
    answer: "Zero economic profit",
  },
  {
    id: "ECO-445",
    question: "Which monetary policy tool is most commonly used by central banks?",
    type: "Multiple Choice",
    topic: "Macroeconomics",
    difficulty: "Easy",
    status: "Reviewed",
    options: [
      { label: "Reserve requirements", correct: false },
      { label: "Open market operations", correct: true },
      { label: "Discount rate changes", correct: false },
      { label: "Quantitative easing", correct: false },
    ],
    answer: "Open market operations",
  },
  // Short Answer Questions
  {
    id: "ECO-214",
    question: "State two assumptions required for the OLS estimator to be BLUE.",
    type: "Short Answer",
    topic: "Linear regression",
    difficulty: "Medium",
    status: "Draft",
    keywords: ["Linearity", "No perfect multicollinearity", "Homoskedastic errors", "Zero conditional mean"],
  },
  {
    id: "ECO-309",
    question: "Interpret the Durbin-Watson statistic of 1.2 in the provided time-series model.",
    type: "Short Answer",
    topic: "Time series",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Indicates positive serial correlation in residuals (close to zero).",
  },
  {
    id: "ECO-525",
    question: "Given the dataset, identify evidence of heteroskedasticity.",
    type: "Short Answer",
    topic: "Diagnostics",
    difficulty: "Medium",
    status: "Approved",
    keywords: ["Residual fan shape", "Breusch-Pagan test", "Variance increases with fitted values"],
  },
  {
    id: "ECO-631",
    question: "Explain the difference between nominal GDP and real GDP.",
    type: "Short Answer",
    topic: "National accounts",
    difficulty: "Easy",
    status: "Reviewed",
    keywords: ["Price level adjustment", "Base year", "Inflation effects", "Economic growth measurement"],
  },
  {
    id: "ECO-742",
    question: "What is the multiplier effect in Keynesian economics?",
    type: "Short Answer",
    topic: "Macroeconomics",
    difficulty: "Medium",
    status: "Approved",
    keywords: ["Initial spending", "MPC", "Total income change", "Ripple effect"],
  },
  // Long Form Questions
  {
    id: "ECO-412",
    question: "Evaluate the policy implications of simultaneous equations bias in macroeconomic models.",
    type: "Long Form",
    topic: "Policy analysis",
    difficulty: "Hard",
    status: "Reviewed",
    keywords: [
      "Endogeneity of regressors",
      "Biased OLS estimates",
      "Need for instrumental variables",
      "Policy misinterpretation risk",
    ],
  },
  {
    id: "ECO-856",
    question: "Analyze the short-run and long-run effects of an expansionary fiscal policy on output, unemployment, and inflation using the AD-AS model.",
    type: "Long Form",
    topic: "Macroeconomic policy",
    difficulty: "Hard",
    status: "Reviewed",
    keywords: [
      "Aggregate demand shift",
      "Short-run output increase",
      "Phillips curve",
      "Long-run crowding out",
      "Price level adjustment",
    ],
  },
  {
    id: "ECO-967",
    question: "Discuss the causes and consequences of income inequality in developed economies, including policy interventions.",
    type: "Long Form",
    topic: "Labor economics",
    difficulty: "Hard",
    status: "Draft",
    keywords: [
      "Skill-biased technological change",
      "Globalization effects",
      "Progressive taxation",
      "Education policy",
      "Social mobility",
    ],
  },
  // True/False Questions
  {
    id: "ECO-1078",
    question: "GDP measures the total value of all final goods and services produced within a country in a given period.",
    type: "True/False",
    topic: "National accounts",
    difficulty: "Easy",
    status: "Approved",
    answer: "True",
  },
  {
    id: "ECO-1181",
    question: "An increase in the money supply always leads to inflation.",
    type: "True/False",
    topic: "Monetary policy",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "False",
  },
  {
    id: "ECO-1284",
    question: "Price ceilings set above the equilibrium price have no effect on the market.",
    type: "True/False",
    topic: "Market interventions",
    difficulty: "Medium",
    status: "Approved",
    answer: "True",
  },
  {
    id: "ECO-1387",
    question: "The law of diminishing marginal utility states that marginal utility increases as consumption increases.",
    type: "True/False",
    topic: "Consumer theory",
    difficulty: "Easy",
    status: "Reviewed",
    answer: "False",
  },
  {
    id: "ECO-1490",
    question: "A perfectly inelastic supply curve is represented by a horizontal line.",
    type: "True/False",
    topic: "Supply and demand",
    difficulty: "Medium",
    status: "Draft",
    answer: "False",
  },
  // Matching Questions
  {
    id: "ECO-1593",
    question: "Perfect competition",
    type: "Matching",
    topic: "Market structures",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Many firms, homogeneous products",
  },
  {
    id: "ECO-1594",
    question: "Monopoly",
    type: "Matching",
    topic: "Market structures",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Single firm, no close substitutes",
  },
  {
    id: "ECO-1595",
    question: "Oligopoly",
    type: "Matching",
    topic: "Market structures",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Few firms, interdependent decisions",
  },
  {
    id: "ECO-1596",
    question: "Monopolistic competition",
    type: "Matching",
    topic: "Market structures",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Many firms, differentiated products",
  },
  {
    id: "ECO-1597",
    question: "CPI",
    type: "Matching",
    topic: "Economic indicators",
    difficulty: "Easy",
    status: "Approved",
    answer: "Consumer price changes",
  },
  {
    id: "ECO-1598",
    question: "Unemployment rate",
    type: "Matching",
    topic: "Economic indicators",
    difficulty: "Easy",
    status: "Approved",
    answer: "Percentage of labor force without jobs",
  },
  {
    id: "ECO-1599",
    question: "GDP growth",
    type: "Matching",
    topic: "Economic indicators",
    difficulty: "Easy",
    status: "Approved",
    answer: "Rate of economic expansion",
  },
  {
    id: "ECO-1600",
    question: "Trade balance",
    type: "Matching",
    topic: "Economic indicators",
    difficulty: "Easy",
    status: "Approved",
    answer: "Exports minus imports",
  },
  {
    id: "ECO-1601",
    question: "Adam Smith",
    type: "Matching",
    topic: "Economic theory",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Invisible hand and free markets",
  },
  {
    id: "ECO-1602",
    question: "John Maynard Keynes",
    type: "Matching",
    topic: "Economic theory",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Government intervention in recessions",
  },
  {
    id: "ECO-1603",
    question: "Milton Friedman",
    type: "Matching",
    topic: "Economic theory",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Monetarism and free markets",
  },
  {
    id: "ECO-1604",
    question: "Karl Marx",
    type: "Matching",
    topic: "Economic theory",
    difficulty: "Medium",
    status: "Reviewed",
    answer: "Class struggle and capitalism critique",
  },
  // Fill in the Blanks Questions
  {
    id: "ECO-1902",
    question: "The _____ is the opportunity cost of holding money instead of interest-bearing assets.",
    type: "Fill in the Blanks",
    topic: "Money and banking",
    difficulty: "Medium",
    status: "Approved",
    blanks: ["interest rate", "nominal interest rate"],
  },
  {
    id: "ECO-2005",
    question: "In the long run, the Phillips curve is _____, indicating no trade-off between inflation and unemployment.",
    type: "Fill in the Blanks",
    topic: "Macroeconomics",
    difficulty: "Hard",
    status: "Reviewed",
    blanks: ["vertical"],
  },
  {
    id: "ECO-2108",
    question: "_____ cost is the cost that has already been incurred and cannot be recovered.",
    type: "Fill in the Blanks",
    topic: "Microeconomics",
    difficulty: "Easy",
    status: "Approved",
    blanks: ["Sunk", "sunk"],
  },
  {
    id: "ECO-2211",
    question: "The formula for calculating the GDP deflator is (_____ GDP / _____ GDP) × 100.",
    type: "Fill in the Blanks",
    topic: "National accounts",
    difficulty: "Medium",
    status: "Reviewed",
    blanks: ["Nominal", "Real"],
  },
];

export default function EconomicsQuestionBankPage() {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Multiple Choice", "Short Answer", "Long Form", "True/False", "Matching", "Fill in the Blanks"];

  const filteredQuestions =
    activeTab === "All" ? questions : questions.filter((q) => q.type === activeTab);

  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Question bank</p>
            <h1 className="text-3xl font-semibold text-slate-900 font-display">Economics</h1>
            <p className="mt-2 text-base text-slate-600">Micro, macro, and econometrics items for upper-level courses.</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowAddOptions((prev) => !prev)}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Add question
            </button>
            {showAddOptions ? (
              <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Add via</p>
                <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
                  <button className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left hover:border-slate-300">
                    Manual input
                  </button>
                  <button className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left hover:border-slate-300">
                    AI from uploaded content
                  </button>
                  <button className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left hover:border-slate-300">
                    Import Excel bank
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </header>

        {/* Question Type Tabs */}
        <div className="mt-6 flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {tab}
              {tab === "All" && (
                <span className="ml-2 text-xs opacity-70">({questions.length})</span>
              )}
              {tab !== "All" && (
                <span className="ml-2 text-xs opacity-70">
                  ({questions.filter((q) => q.type === tab).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <section className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[0.6fr_1.7fr_1fr_1fr_0.9fr_2fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span>ID</span>
              <span>Question</span>
              <span>Type</span>
              <span>Topic</span>
              <span>Difficulty</span>
              <span>Guidance</span>
            </div>
            {filteredQuestions.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[0.6fr_1.7fr_1fr_1fr_0.9fr_2fr] gap-4 border-b border-slate-100 px-6 py-4 text-sm text-slate-700"
              >
                <span className="font-semibold text-slate-900">{item.id}</span>
                <span>{item.question}</span>
                <span className="text-slate-600">{item.type}</span>
                <span className="text-slate-600">{item.topic}</span>
                <span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {item.difficulty}
                  </span>
                </span>
                <span className="self-start">
                  {item.options ? (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Options</p>
                      <ul className="grid gap-2">
                        {item.options.map((option) => (
                          <li
                            key={option.label}
                            className={`rounded-2xl border px-4 py-2 text-xs font-semibold leading-snug ${
                              option.correct
                                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-500">
                        Answer: <span className="font-semibold text-slate-900">{item.answer}</span>
                      </p>
                    </div>
                  ) : item.blanks ? (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Correct Answers</p>
                      <div className="flex flex-wrap gap-2">
                        {item.blanks.map((blank, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold leading-snug text-slate-600"
                          >
                            {blank}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : item.answer ? (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                        {item.type === "Matching" ? "Match" : "Answer"}
                      </p>
                      <span className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 leading-snug">
                        {item.answer}
                      </span>
                    </div>
                  ) : item.keywords ? (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {item.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold leading-snug text-slate-600"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
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
