"use client";

import { useMemo, useState } from "react";

type Section = {
  id: string;
  name: string;
  questionType: string;
  questionCount: number;
  category: string;
  difficulty: string;
};

type HeaderLine = {
  id: string;
  text: string;
};

type MetadataRow = {
  id: string;
  label: string;
  value: string;
};

type InstructionItem = {
  id: string;
  text: string;
  emphasis: "normal" | "bold" | "underline";
};

type FooterLine = {
  id: string;
  text: string;
};

type FirstPageLayout = {
  headerLines: HeaderLine[];
  metadata: MetadataRow[];
  instructionIntro: string;
  instructions: InstructionItem[];
  candidateFields: FooterLine[];
  footerNotes: FooterLine[];
};

type SavedFormat = {
  id: string;
  name: string;
  savedAt: string;
  status: "Draft" | "Saved";
  sections: Section[];
  layout: FirstPageLayout;
};

const steps = [
  { id: "sections", title: "Sections" },
  { id: "layout", title: "Header & instructions" },
  { id: "preview", title: "Preview" },
];

const difficultyOptions = ["Foundational", "Core", "Applied"];
const questionTypeOptions = [
  "Multiple Choice",
  "Short Answer",
  "Long Form",
  "Fill in the Blank",
];

const initialSections: Section[] = [
  {
    id: "section-1",
    name: "Section A: Multiple Choice",
    questionType: "Multiple Choice",
    questionCount: 30,
    category: "Foundations",
    difficulty: "Foundational",
  },
  {
    id: "section-2",
    name: "Section B: Short Answers",
    questionType: "Short Answer",
    questionCount: 15,
    category: "Processes",
    difficulty: "Core",
  },
  {
    id: "section-3",
    name: "Section C: Essay",
    questionType: "Long Form",
    questionCount: 3,
    category: "Synthesis",
    difficulty: "Applied",
  },
];

const initialLayout: FirstPageLayout = {
  headerLines: [
    { id: "header-1", text: "XYZ University" },
    { id: "header-2", text: "School of Magic" },
    { id: "header-3", text: "Department of Magical Food" },
    { id: "header-4", text: "Final Written Examination (1/2025)" },
    { id: "header-5", text: "Undergraduate Program" },
  ],
  metadata: [
    { id: "meta-1", label: "Course Title", value: "ABC1234" },
    { id: "meta-2", label: "Lecturer", value: "Harry Potter" },
    { id: "meta-3", label: "Date", value: "10 June 2025" },
    { id: "meta-4", label: "Time", value: "09:00 AM - 12:00 PM" },
  ],
  instructionIntro:
    "This 6-page examination paper (including this page) consists of 2 parts:",
  instructions: [
    {
      id: "instruction-1",
      text: "Answer the questions in the computerized answer sheet using '2B' pencil only.",
      emphasis: "normal",
    },
    {
      id: "instruction-2",
      text: "Write your ID, name, and section number on the computerized answer sheet.",
      emphasis: "underline",
    },
    {
      id: "instruction-3",
      text: "Do not forget to blacken your ID, subject code, and your section number on the answer sheet.",
      emphasis: "bold",
    },
    {
      id: "instruction-4",
      text: "Avoid academic cheating by not taking any part of the exam paper out of the examination room.",
      emphasis: "normal",
    },
  ],
  candidateFields: [
    { id: "candidate-1", text: "Name: _________________________________" },
    { id: "candidate-2", text: "ID: _____________________" },
    { id: "candidate-3", text: "Section: ______________" },
  ],
  footerNotes: [
    {
      id: "footer-1",
      text: "Total 18 marks equivalent to 100%",
    },
  ],
};

const instructionClassName = (emphasis: InstructionItem["emphasis"]) => {
  if (emphasis === "bold") return "flex items-start gap-2 font-semibold text-slate-900";
  if (emphasis === "underline") return "flex items-start gap-2 underline text-slate-700";
  return "flex items-start gap-2 text-slate-600";
};

const cloneSections = (value: Section[]) => value.map((section) => ({ ...section }));

const cloneLayout = (value: FirstPageLayout): FirstPageLayout => ({
  headerLines: value.headerLines.map((line) => ({ ...line })),
  metadata: value.metadata.map((item) => ({ ...item })),
  instructionIntro: value.instructionIntro,
  instructions: value.instructions.map((item) => ({ ...item })),
  candidateFields: value.candidateFields.map((line) => ({ ...line })),
  footerNotes: value.footerNotes.map((line) => ({ ...line })),
});

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

const toNumber = (value: string) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function BuilderClient() {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [nextSectionIndex, setNextSectionIndex] = useState(initialSections.length + 1);
  const [layout, setLayout] = useState<FirstPageLayout>(initialLayout);
  const [savedFormats, setSavedFormats] = useState<SavedFormat[]>([]);
  const [editingFormatId, setEditingFormatId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<typeof steps[number]["id"]>("sections");

  const totals = useMemo(() => {
    const summary = sections.reduce(
      (acc, section) => {
        acc.questions += section.questionCount;
        acc.difficulty[section.difficulty] =
          (acc.difficulty[section.difficulty] ?? 0) + section.questionCount;
        acc.types[section.questionType] =
          (acc.types[section.questionType] ?? 0) + section.questionCount;
        return acc;
      },
      {
        questions: 0,
        difficulty: {} as Record<string, number>,
        types: {} as Record<string, number>,
      }
    );

    const difficultySummary = Object.entries(summary.difficulty)
      .map(([label, count]) => `${label}: ${count}`)
      .join(" • ");

    const typeSummary = Object.entries(summary.types)
      .map(([label, count]) => `${label}: ${count}`)
      .join(" • ");

    return {
      questions: summary.questions,
      difficultySummary,
      typeSummary,
    };
  }, [sections]);

  const handleSectionChange = (id: string, key: keyof Section, value: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== id) return section;
        if (key === "questionCount") {
          return { ...section, questionCount: toNumber(value) };
        }
        return { ...section, [key]: value };
      })
    );
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: `section-${nextSectionIndex}`,
        name: `Section ${String.fromCharCode(64 + nextSectionIndex)}: New section`,
        questionType: "Multiple Choice",
        questionCount: 10,
        category: "New category",
        difficulty: "Core",
      },
    ]);
    setNextSectionIndex((value) => value + 1);
  };

  const handleRemoveSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const handleHeaderLineChange = (id: string, text: string) => {
    setLayout((prev) => ({
      ...prev,
      headerLines: prev.headerLines.map((line) =>
        line.id === id ? { ...line, text } : line
      ),
    }));
  };

  const handleAddHeaderLine = () => {
    setLayout((prev) => ({
      ...prev,
      headerLines: [...prev.headerLines, { id: createId("header"), text: "New heading line" }],
    }));
  };

  const handleRemoveHeaderLine = (id: string) => {
    setLayout((prev) => ({
      ...prev,
      headerLines: prev.headerLines.filter((line) => line.id !== id),
    }));
  };

  const handleMetadataChange = (id: string, key: "label" | "value", value: string) => {
    setLayout((prev) => ({
      ...prev,
      metadata: prev.metadata.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleAddMetadataRow = () => {
    setLayout((prev) => ({
      ...prev,
      metadata: [...prev.metadata, { id: createId("meta"), label: "Label", value: "Value" }],
    }));
  };

  const handleRemoveMetadataRow = (id: string) => {
    setLayout((prev) => ({
      ...prev,
      metadata: prev.metadata.filter((item) => item.id !== id),
    }));
  };

  const handleInstructionIntroChange = (value: string) => {
    setLayout((prev) => ({ ...prev, instructionIntro: value }));
  };

  const handleInstructionChange = (
    id: string,
    key: "text" | "emphasis",
    value: string
  ) => {
    setLayout((prev) => ({
      ...prev,
      instructions: prev.instructions.map((instruction) =>
        instruction.id === id
          ? key === "text"
            ? { ...instruction, text: value }
            : { ...instruction, emphasis: value as InstructionItem["emphasis"] }
          : instruction
      ),
    }));
  };

  const handleAddInstruction = () => {
    setLayout((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { id: createId("instruction"), text: "New instruction", emphasis: "normal" },
      ],
    }));
  };

  const handleRemoveInstruction = (id: string) => {
    setLayout((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((instruction) => instruction.id !== id),
    }));
  };

  const handleFooterLineChange = (
    key: "candidateFields" | "footerNotes",
    id: string,
    value: string
  ) => {
    setLayout((prev) => ({
      ...prev,
      [key]: prev[key].map((line) =>
        line.id === id ? { ...line, text: value } : line
      ),
    }));
  };

  const handleAddFooterLine = (key: "candidateFields" | "footerNotes") => {
    setLayout((prev) => ({
      ...prev,
      [key]: [
        ...prev[key],
        {
          id: createId(key === "candidateFields" ? "candidate" : "footer"),
          text:
            key === "candidateFields"
              ? "New candidate field"
              : "Additional note",
        },
      ],
    }));
  };

  const handleRemoveFooterLine = (key: "candidateFields" | "footerNotes", id: string) => {
    setLayout((prev) => ({
      ...prev,
      [key]: prev[key].filter((line) => line.id !== id),
    }));
  };

  const buildFormatName = () => {
    const headingLine = layout.headerLines.find((line) => line.text.trim());
    if (headingLine && headingLine.text.trim()) {
      return headingLine.text.trim();
    }
    const firstSection = sections.find((section) => section.name.trim());
    if (firstSection) return `${firstSection.name} format`;
    return "Untitled exam format";
  };

  const saveFormat = (status: SavedFormat["status"]) => {
    const savedAt = new Date().toLocaleString();
    const name = buildFormatName();
    const sectionsSnapshot = cloneSections(sections);
    const layoutSnapshot = cloneLayout(layout);

    const existing = editingFormatId
      ? savedFormats.find((format) => format.id === editingFormatId)
      : null;

    if (existing) {
      setSavedFormats((prev) =>
        prev.map((format) =>
          format.id === editingFormatId
            ? { ...format, name, savedAt, status, sections: sectionsSnapshot, layout: layoutSnapshot }
            : format
        )
      );
      return;
    }

    const id = `format-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setSavedFormats((prev) => [
      { id, name, savedAt, status, sections: sectionsSnapshot, layout: layoutSnapshot },
      ...prev,
    ]);
    setEditingFormatId(id);
  };

  const handleOpenFormat = (format: SavedFormat) => {
    setSections(cloneSections(format.sections));
    setLayout(cloneLayout(format.layout));
    setNextSectionIndex(format.sections.length + 1);
    setEditingFormatId(format.id);
  };

  const handleDeleteFormat = (id: string) => {
    setSavedFormats((prev) => prev.filter((format) => format.id !== id));
    if (editingFormatId === id) {
      setEditingFormatId(null);
    }
  };

  const hasNoSections = sections.length === 0;
  const hasEmptyName = sections.some((section) => !section.name.trim());
  const hasZeroQuestions = sections.some((section) => section.questionCount <= 0);
  const missingTypes = sections.some((section) => !section.questionType.trim());
  const missingCategories = sections.some((section) => !section.category.trim());

  const checks = [
    { label: "At least one section defined", ok: !hasNoSections },
    { label: "All sections have names", ok: !hasEmptyName },
    { label: "All sections have question counts", ok: !hasZeroQuestions },
    { label: "Question types selected", ok: !missingTypes },
    { label: "Categories documented", ok: !missingCategories },
  ];

  const renderSectionsPanel = () => (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Section sequencing</h2>
        <p className="mt-2 text-sm text-slate-600">
          Define the order of sections and the question mix you expect to pull during generation.
        </p>
        <div className="mt-6 space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Section name
                  </p>
                  <input
                    value={section.name}
                    onChange={(event) =>
                      handleSectionChange(section.id, "name", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Question type
                    </p>
                    <select
                      value={section.questionType}
                      onChange={(event) =>
                        handleSectionChange(section.id, "questionType", event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
                    >
                      {questionTypeOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Category / syllabus tag
                    </p>
                    <input
                      value={section.category}
                      onChange={(event) =>
                        handleSectionChange(section.id, "category", event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Questions
                    </p>
                    <input
                      type="number"
                      min={0}
                      value={section.questionCount}
                      onChange={(event) =>
                        handleSectionChange(section.id, "questionCount", event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Difficulty
                    </p>
                    <select
                      value={section.difficulty}
                      onChange={(event) =>
                        handleSectionChange(section.id, "difficulty", event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
                    >
                      {difficultyOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {section.questionCount} questions · {section.questionType} · {section.difficulty}
                  </span>
                  <button
                    onClick={() => handleRemoveSection(section.id)}
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-600"
                  >
                    Remove section
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSection}
            className="w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-500"
          >
            + Add section
          </button>
        </div>
      </div>
    </div>
  );

  const renderLayoutPanel = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Heading lines</h2>
            <p className="mt-1 text-sm text-slate-600">
              Add or edit the institutional header and exam title shown on page one.
            </p>
          </div>
          <button
            onClick={handleAddHeaderLine}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            + Add line
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {layout.headerLines.map((line) => (
            <div
              key={line.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex-row md:items-center"
            >
              <input
                value={line.text}
                onChange={(event) => handleHeaderLineChange(line.id, event.target.value)}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <button
                onClick={() => handleRemoveHeaderLine(line.id)}
                className="self-start rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Exam metadata</h2>
          <button
            onClick={handleAddMetadataRow}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            + Add row
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {layout.metadata.map((item) => (
            <div
              key={item.id}
              className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:grid-cols-[1fr_1fr_auto]"
            >
              <input
                value={item.label}
                onChange={(event) => handleMetadataChange(item.id, "label", event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <input
                value={item.value}
                onChange={(event) => handleMetadataChange(item.id, "value", event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <button
                onClick={() => handleRemoveMetadataRow(item.id)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Instructions</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Intro line
          </p>
          <textarea
            value={layout.instructionIntro}
            onChange={(event) => handleInstructionIntroChange(event.target.value)}
            rows={2}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Individual instructions
          </p>
          <button
            onClick={handleAddInstruction}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            + Add instruction
          </button>
        </div>
        <div className="space-y-3">
          {layout.instructions.map((instruction) => (
            <div
              key={instruction.id}
              className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:grid-cols-[1fr_160px_auto]"
            >
              <textarea
                value={instruction.text}
                onChange={(event) =>
                  handleInstructionChange(instruction.id, "text", event.target.value)
                }
                rows={2}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <select
                value={instruction.emphasis}
                onChange={(event) =>
                  handleInstructionChange(instruction.id, "emphasis", event.target.value)
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="underline">Underline</option>
              </select>
              <button
                onClick={() => handleRemoveInstruction(instruction.id)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Candidate sign-off fields</h3>
            <button
              onClick={() => handleAddFooterLine("candidateFields")}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add field
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {layout.candidateFields.map((field) => (
              <div
                key={field.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex-row md:items-center"
              >
                <input
                  value={field.text}
                  onChange={(event) =>
                    handleFooterLineChange("candidateFields", field.id, event.target.value)
                  }
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                />
                <button
                  onClick={() => handleRemoveFooterLine("candidateFields", field.id)}
                  className="self-start rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Footer notes</h3>
            <button
              onClick={() => handleAddFooterLine("footerNotes")}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add note
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {layout.footerNotes.map((note) => (
              <div
                key={note.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex-row md:items-center"
              >
                <input
                  value={note.text}
                  onChange={(event) =>
                    handleFooterLineChange("footerNotes", note.id, event.target.value)
                  }
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                />
                <button
                  onClick={() => handleRemoveFooterLine("footerNotes", note.id)}
                  className="self-start rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreviewPanel = () => (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Format overview</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <p>{totals.questions} total questions</p>
          {totals.typeSummary ? <p>{totals.typeSummary}</p> : null}
          {totals.difficultySummary ? <p>{totals.difficultySummary}</p> : null}
        </div>
      </div>
      <CoverPreview layout={layout} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Section breakdown</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{section.name}</p>
                <p className="text-xs text-slate-500">
                  {section.questionCount} questions · {section.questionType} · {section.category}
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                {section.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  type CoverPreviewProps = {
    layout: FirstPageLayout;
  };

  function CoverPreview({ layout }: CoverPreviewProps) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div className="space-y-1 text-center text-sm text-slate-700">
            {layout.headerLines.map((line) => (
              <p key={line.id} className="font-medium text-slate-900">
                {line.text}
              </p>
            ))}
          </div>
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
            {layout.metadata.map((item) => (
              <div key={item.id} className="text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Instructions</p>
            <p className="text-slate-600">{layout.instructionIntro}</p>
            <ul className="space-y-2">
              {layout.instructions.map((instruction, index) => (
                <li key={instruction.id} className={instructionClassName(instruction.emphasis)}>
                  <span className="text-xs font-semibold text-slate-400">{index + 1}.</span>
                  <span className="text-sm text-slate-700">{instruction.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {layout.candidateFields.map((field) => (
              <p key={field.id}>{field.text}</p>
            ))}
          </div>
          {layout.footerNotes.length ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              {layout.footerNotes.map((note) => (
                <p key={note.id}>{note.text}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 font-display">Format Builder</h1>
          <p className="mt-2 text-base text-slate-600">
            Define the blueprint so exam generation can pull the right questions automatically.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 text-sm font-semibold text-slate-600">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActivePanel(step.id)}
                className={`rounded-full px-3 py-1 transition ${
                  activePanel === step.id ? "bg-white text-slate-900 shadow" : "text-slate-500"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => saveFormat("Draft")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Save draft
            </button>
            <button
              onClick={() => saveFormat("Saved")}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Save format
            </button>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr_320px]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Steps</p>
            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActivePanel(step.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                    activePanel === step.id
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Status</p>
            <div className="mt-3 text-sm text-slate-600">Blueprint 70% complete</div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-2/3 rounded-full bg-slate-900" />
            </div>
          </div>
        </aside>

        <section>
          {activePanel === "sections"
            ? renderSectionsPanel()
            : activePanel === "layout"
            ? renderLayoutPanel()
            : renderPreviewPanel()}
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Final checks</h2>
            <p className="mt-3 text-sm text-slate-600">
              Make sure the blueprint is internally consistent before saving.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {checks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                    check.ok
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                >
                  <span>{check.label}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    {check.ok ? "Pass" : "Check"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Export means saving a reusable format spec (JSON/PDF) for sharing, not AI generation.
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Saved formats</h2>
            <p className="mt-3 text-sm text-slate-600">
              Save a format to reopen it, review it, or keep iterating.
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {savedFormats.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                  No saved formats yet. Click "Save format" to create one.
                </div>
              ) : (
                savedFormats.map((format) => {
                  const totalQuestions = format.sections.reduce(
                    (sum, section) => sum + section.questionCount,
                    0
                  );
                  const isEditing = editingFormatId === format.id;

                  return (
                    <div
                      key={format.id}
                      className={`rounded-2xl border px-4 py-4 ${
                        isEditing
                          ? "border-slate-900 bg-slate-900/5"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{format.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {format.sections.length} sections · {totalQuestions} questions
                          </p>
                          <p className="mt-1 text-xs text-slate-400">Last saved {format.savedAt}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            format.status === "Saved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {format.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => handleOpenFormat(format)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          {isEditing ? "Open" : "View & edit"}
                        </button>
                        <button
                          onClick={() => handleDeleteFormat(format.id)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
