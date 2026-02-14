"use client";

import { useState } from "react";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

type BankQuestion = {
  id: string;
  question: string;
  type: string;
  topic: string;
  difficulty: string;
  options?: Array<{ label: string; correct: boolean }>;
  answer?: string;
  keywords?: string[];
};

const questions: BankQuestion[] = [
  {
    id: "BIO-204",
    question: "Explain the role of the spindle apparatus in mitosis.",
    type: "Short Answer",
    topic: "Cell Division",
    difficulty: "Medium",
    keywords: ["microtubules", "chromosome separation", "anaphase"],
  },
  {
    id: "BIO-318",
    question: "Which of the following best describes genetic linkage?",
    type: "Multiple Choice",
    topic: "Inheritance",
    difficulty: "Easy",
    options: [
      { label: "Genes on separate chromosomes assort independently.", correct: false },
      { label: "Genes close together on the same chromosome tend to be inherited together.", correct: true },
      { label: "Only recessive genes can be linked.", correct: false },
      { label: "Linkage occurs only during meiosis II.", correct: false },
    ],
    answer: "Genes close together on the same chromosome tend to be inherited together.",
  },
  {
    id: "BIO-522",
    question: "Compare the outcomes of meiosis I and meiosis II.",
    type: "Long Form",
    topic: "Meiosis",
    difficulty: "Hard",
    keywords: [
      "Homologous chromosomes separate in meiosis I",
      "Sister chromatids separate in meiosis II",
      "Diploid to haploid transition",
      "Genetic variation via crossing over",
    ],
  },
  {
    id: "BIO-417",
    question: "Define phenotype and provide an example in humans.",
    type: "Short Answer",
    topic: "Genetics Basics",
    difficulty: "Easy",
    keywords: ["observable trait", "eye color", "expression of genotype"],
  },
  {
    id: "BIO-609",
    question: "A dihybrid cross produces which expected ratio in F2?",
    type: "Multiple Choice",
    topic: "Inheritance",
    difficulty: "Medium",
    options: [
      { label: "1:2:1", correct: false },
      { label: "9:3:3:1", correct: true },
      { label: "3:1", correct: false },
      { label: "1:1", correct: false },
    ],
    answer: "9:3:3:1",
  },
];

export default function BiologyQuestionBankPage() {
  const [showAddOptions, setShowAddOptions] = useState(false);

  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Question bank</p>
            <h1 className="text-3xl font-semibold text-slate-900 font-display">Biology</h1>
            <p className="mt-2 text-base text-slate-600">Genetics and cellular processes curated for assessments.</p>
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
            {questions.map((item) => (
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
                  ) : item.answer ? (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Answer</p>
                      <span className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 leading-snug">
                        {item.answer as string}
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
