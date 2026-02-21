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
  blanks?: string[];
};

const questions: BankQuestion[] = [
  // Multiple Choice Questions
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
  {
    id: "BIO-712",
    question: "What is the primary function of mitochondria?",
    type: "Multiple Choice",
    topic: "Cell Biology",
    difficulty: "Easy",
    options: [
      { label: "Protein synthesis", correct: false },
      { label: "ATP production through cellular respiration", correct: true },
      { label: "DNA replication", correct: false },
      { label: "Lipid storage", correct: false },
    ],
    answer: "ATP production through cellular respiration",
  },
  {
    id: "BIO-825",
    question: "Which enzyme is responsible for unwinding the DNA double helix during replication?",
    type: "Multiple Choice",
    topic: "Molecular Biology",
    difficulty: "Medium",
    options: [
      { label: "DNA polymerase", correct: false },
      { label: "Helicase", correct: true },
      { label: "Ligase", correct: false },
      { label: "Primase", correct: false },
    ],
    answer: "Helicase",
  },
  {
    id: "BIO-934",
    question: "In which stage of the cell cycle does DNA replication occur?",
    type: "Multiple Choice",
    topic: "Cell Division",
    difficulty: "Easy",
    options: [
      { label: "G1 phase", correct: false },
      { label: "S phase", correct: true },
      { label: "G2 phase", correct: false },
      { label: "M phase", correct: false },
    ],
    answer: "S phase",
  },
  // Short Answer Questions
  {
    id: "BIO-204",
    question: "Explain the role of the spindle apparatus in mitosis.",
    type: "Short Answer",
    topic: "Cell Division",
    difficulty: "Medium",
    keywords: ["microtubules", "chromosome separation", "anaphase"],
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
    id: "BIO-531",
    question: "What is the difference between autotrophs and heterotrophs?",
    type: "Short Answer",
    topic: "Ecology",
    difficulty: "Easy",
    keywords: ["producers", "consumers", "energy source", "photosynthesis"],
  },
  {
    id: "BIO-648",
    question: "Describe the structure and function of ribosomes.",
    type: "Short Answer",
    topic: "Cell Biology",
    difficulty: "Medium",
    keywords: ["rRNA", "protein synthesis", "translation", "subunits"],
  },
  {
    id: "BIO-759",
    question: "Explain what happens during the light-dependent reactions of photosynthesis.",
    type: "Short Answer",
    topic: "Photosynthesis",
    difficulty: "Hard",
    keywords: ["thylakoid", "ATP", "NADPH", "electron transport chain", "water splitting"],
  },
  // Long Form Questions  
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
    id: "BIO-863",
    question: "Discuss the evidence that supports the endosymbiotic theory of mitochondrial and chloroplast evolution.",
    type: "Long Form",
    topic: "Evolution",
    difficulty: "Hard",
    keywords: [
      "Double membrane",
      "Independent DNA",
      "Binary fission",
      "Prokaryotic ribosomes",
      "Symbiotic relationship",
    ],
  },
  {
    id: "BIO-971",
    question: "Analyze the impact of climate change on ecosystem biodiversity, providing specific examples.",
    type: "Long Form",
    topic: "Ecology",
    difficulty: "Hard",
    keywords: [
      "Habitat loss",
      "Species extinction",
      "Migration patterns",
      "Coral bleaching",
      "Food web disruption",
    ],
  },
  {
    id: "BIO-1052",
    question: "Explain the central dogma of molecular biology and describe how gene expression is regulated in eukaryotes.",
    type: "Long Form",
    topic: "Molecular Biology",
    difficulty: "Hard",
    keywords: [
      "DNA to RNA to protein",
      "Transcription factors",
      "Epigenetic modifications",
      "RNA processing",
      "Post-translational modifications",
    ],
  },
  // True/False Questions
  {
    id: "BIO-1143",
    question: "DNA replication occurs in the nucleus of eukaryotic cells.",
    type: "True/False",
    topic: "Molecular Biology",
    difficulty: "Easy",
    answer: "True",
  },
  {
    id: "BIO-1256",
    question: "Prokaryotic cells contain mitochondria.",
    type: "True/False",
    topic: "Cell Biology",
    difficulty: "Easy",
    answer: "False",
  },
  {
    id: "BIO-1369",
    question: "All enzymes are proteins, but not all proteins are enzymes.",
    type: "True/False",
    topic: "Biochemistry",
    difficulty: "Medium",
    answer: "True",
  },
  {
    id: "BIO-1472",
    question: "Photosynthesis and cellular respiration are reverse processes of each other.",
    type: "True/False",
    topic: "Metabolism",
    difficulty: "Medium",
    answer: "True",
  },
  {
    id: "BIO-1585",
    question: "The lac operon is an example of positive gene regulation.",
    type: "True/False",
    topic: "Gene Regulation",
    difficulty: "Hard",
    answer: "False",
  },
  // Matching Questions
  {
    id: "BIO-1698",
    question: "Ribosome",
    type: "Matching",
    topic: "Cell Biology",
    difficulty: "Medium",
    answer: "Protein synthesis",
  },
  {
    id: "BIO-1699",
    question: "Mitochondria",
    type: "Matching",
    topic: "Cell Biology",
    difficulty: "Medium",
    answer: "ATP production",
  },
  {
    id: "BIO-1700",
    question: "Golgi apparatus",
    type: "Matching",
    topic: "Cell Biology",
    difficulty: "Medium",
    answer: "Protein modification and packaging",
  },
  {
    id: "BIO-1701",
    question: "Lysosome",
    type: "Matching",
    topic: "Cell Biology",
    difficulty: "Medium",
    answer: "Digestion of cellular waste",
  },
  {
    id: "BIO-1702",
    question: "Charles Darwin",
    type: "Matching",
    topic: "History of Biology",
    difficulty: "Easy",
    answer: "Theory of evolution by natural selection",
  },
  {
    id: "BIO-1703",
    question: "Gregor Mendel",
    type: "Matching",
    topic: "History of Biology",
    difficulty: "Easy",
    answer: "Laws of inheritance",
  },
  {
    id: "BIO-1704",
    question: "James Watson & Francis Crick",
    type: "Matching",
    topic: "History of Biology",
    difficulty: "Easy",
    answer: "DNA double helix structure",
  },
  {
    id: "BIO-1705",
    question: "Louis Pasteur",
    type: "Matching",
    topic: "History of Biology",
    difficulty: "Easy",
    answer: "Germ theory of disease",
  },
  {
    id: "BIO-1706",
    question: "Prophase",
    type: "Matching",
    topic: "Cell Division",
    difficulty: "Medium",
    answer: "Chromosomes condense and spindle forms",
  },
  {
    id: "BIO-1707",
    question: "Metaphase",
    type: "Matching",
    topic: "Cell Division",
    difficulty: "Medium",
    answer: "Chromosomes align at cell equator",
  },
  {
    id: "BIO-1708",
    question: "Anaphase",
    type: "Matching",
    topic: "Cell Division",
    difficulty: "Medium",
    answer: "Sister chromatids separate",
  },
  {
    id: "BIO-1709",
    question: "Telophase",
    type: "Matching",
    topic: "Cell Division",
    difficulty: "Medium",
    answer: "Nuclear envelope reforms",
  },
  // Fill in the Blanks Questions  
  {
    id: "BIO-1927",
    question: "The process by which cells convert glucose into energy is called _____.",
    type: "Fill in the Blanks",
    topic: "Metabolism",
    difficulty: "Easy",
    blanks: ["cellular respiration", "respiration"],
  },
  {
    id: "BIO-2030",
    question: "In photosynthesis, _____ and _____ are converted into glucose and oxygen using light energy.",
    type: "Fill in the Blanks",
    topic: "Photosynthesis",
    difficulty: "Medium",
    blanks: ["carbon dioxide", "water"],
  },
  {
    id: "BIO-2143",
    question: "The _____-_____ model describes how the plasma membrane is structured with proteins embedded in a phospholipid bilayer.",
    type: "Fill in the Blanks",
    topic: "Cell Membrane",
    difficulty: "Medium",
    blanks: ["fluid-mosaic", "fluid mosaic"],
  },
  {
    id: "BIO-2256",
    question: "During translation, _____ carries amino acids to the ribosome, where they are assembled according to the _____ sequence.",
    type: "Fill in the Blanks",
    topic: "Protein Synthesis",
    difficulty: "Hard",
    blanks: ["tRNA", "mRNA"],
  },
];

export default function BiologyQuestionBankPage() {
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
