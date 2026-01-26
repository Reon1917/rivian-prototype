"use client";

import { useMemo, useState } from "react";

type ExamDetails = {
  course: string;
  assessment: string;
  durationMinutes: number;
  totalMarks: number;
  notes: string;
};

type Section = {
  id: string;
  name: string;
  items: number;
  difficulty: string;
  marks: number;
};

type SavedFormat = {
  id: string;
  name: string;
  savedAt: string;
  status: "Draft" | "Saved";
  details: ExamDetails;
  sections: Section[];
};

const steps = [
  { title: "Exam details", status: "current" },
  { title: "Sections", status: "up-next" },
  { title: "Review & finalize", status: "up-next" },
];

const difficultyOptions = ["Foundational", "Core", "Applied"];

const initialExamDetails: ExamDetails = {
  course: "BIO 201 - Genetics",
  assessment: "Midterm 2",
  durationMinutes: 120,
  totalMarks: 100,
  notes: "Focus on Chapters 4-9, emphasize meiosis vs mitosis differences.",
};

const initialSections: Section[] = [
  {
    id: "section-1",
    name: "Section A: Multiple Choice",
    items: 20,
    difficulty: "Foundational",
    marks: 20,
  },
  {
    id: "section-2",
    name: "Section B: Short Answer",
    items: 10,
    difficulty: "Core",
    marks: 30,
  },
  {
    id: "section-3",
    name: "Section C: Long Form",
    items: 3,
    difficulty: "Applied",
    marks: 50,
  },
];

const examFields: Array<{
  label: string;
  key: keyof ExamDetails;
  type: "text" | "number";
}> = [
  { label: "Course", key: "course", type: "text" },
  { label: "Assessment", key: "assessment", type: "text" },
  { label: "Duration (minutes)", key: "durationMinutes", type: "number" },
  { label: "Total marks", key: "totalMarks", type: "number" },
];

const toNumber = (value: string) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatSectionName = (index: number) => {
  if (index <= 26) {
    return `Section ${String.fromCharCode(64 + index)}: New section`;
  }
  return `Section ${index}: New section`;
};

const buildFormatName = (details: ExamDetails) => {
  const course = details.course.trim();
  const assessment = details.assessment.trim();
  if (course && assessment) return `${course} - ${assessment}`;
  return course || assessment || "Untitled format";
};

const cloneSections = (value: Section[]) =>
  value.map((section) => ({ ...section }));

export default function BuilderClient() {
  const [examDetails, setExamDetails] =
    useState<ExamDetails>(initialExamDetails);
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [nextSectionIndex, setNextSectionIndex] = useState(
    initialSections.length + 1
  );
  const [savedFormats, setSavedFormats] = useState<SavedFormat[]>([]);
  const [editingFormatId, setEditingFormatId] = useState<string | null>(null);

  const totals = useMemo(() => {
    const summary = sections.reduce(
      (acc, section) => {
        acc.questions += section.items;
        acc.marks += section.marks;
        acc.difficulty[section.difficulty] =
          (acc.difficulty[section.difficulty] ?? 0) + section.items;
        return acc;
      },
      {
        questions: 0,
        marks: 0,
        difficulty: {} as Record<string, number>,
      }
    );

    const difficultySummary = Object.entries(summary.difficulty)
      .map(([difficulty, count]) => `${difficulty}: ${count}`)
      .join(" • ");

    return {
      questions: summary.questions,
      marks: summary.marks,
      difficultySummary,
    };
  }, [sections]);

  const handleExamChange = (key: keyof ExamDetails, value: string) => {
    setExamDetails((prev) => ({
      ...prev,
      [key]:
        key === "durationMinutes" || key === "totalMarks"
          ? toNumber(value)
          : value,
    }));
  };

  const handleSectionChange = (
    id: string,
    key: keyof Section,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== id) return section;
        const nextValue =
          key === "items" || key === "marks" ? toNumber(value) : value;
        return { ...section, [key]: nextValue };
      })
    );
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: `section-${nextSectionIndex}`,
        name: formatSectionName(nextSectionIndex),
        items: 5,
        difficulty: "Core",
        marks: 10,
      },
    ]);
    setNextSectionIndex((value) => value + 1);
  };

  const handleRemoveSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const saveFormat = (status: SavedFormat["status"]) => {
    const savedAt = new Date().toLocaleString();
    const name = buildFormatName(examDetails);
    const detailsSnapshot = { ...examDetails };
    const sectionsSnapshot = cloneSections(sections);

    const existingFormat = editingFormatId
      ? savedFormats.find((format) => format.id === editingFormatId)
      : null;

    if (existingFormat) {
      setSavedFormats((prev) =>
        prev.map((format) =>
          format.id === editingFormatId
            ? {
                ...format,
                name,
                savedAt,
                status,
                details: detailsSnapshot,
                sections: sectionsSnapshot,
              }
            : format
        )
      );
      return;
    }

    const id = `format-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setSavedFormats((prev) => [
      {
        id,
        name,
        savedAt,
        status,
        details: detailsSnapshot,
        sections: sectionsSnapshot,
      },
      ...prev,
    ]);
    setEditingFormatId(id);
  };

  const handleOpenFormat = (format: SavedFormat) => {
    setExamDetails({ ...format.details });
    setSections(cloneSections(format.sections));
    setNextSectionIndex(format.sections.length + 1);
    setEditingFormatId(format.id);
  };

  const handleDeleteFormat = (id: string) => {
    setSavedFormats((prev) => prev.filter((format) => format.id !== id));
    if (editingFormatId === id) {
      setEditingFormatId(null);
    }
  };

  const marksMismatch = totals.marks !== examDetails.totalMarks;
  const hasEmptySectionName = sections.some(
    (section) => section.name.trim().length === 0
  );
  const hasZeroItems = sections.some((section) => section.items <= 0);
  const hasZeroMarks = sections.some((section) => section.marks <= 0);
  const hasNoSections = sections.length === 0;
  const invalidDuration = examDetails.durationMinutes <= 0;
  const invalidTotalMarks = examDetails.totalMarks <= 0;

  const checks = [
    {
      label: "Total section marks match target",
      ok: !marksMismatch && !invalidTotalMarks,
    },
    {
      label: "At least one section defined",
      ok: !hasNoSections,
    },
    {
      label: "All sections have names",
      ok: !hasEmptySectionName,
    },
    {
      label: "All sections have items",
      ok: !hasZeroItems,
    },
    {
      label: "All sections have marks",
      ok: !hasZeroMarks,
    },
    {
      label: "Duration is set",
      ok: !invalidDuration,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 font-display">
            Format Builder
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Define the exam blueprint before any questions are written.
          </p>
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
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr_320px]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Steps
            </p>
            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                    step.status === "current"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Status
            </p>
            <div className="mt-3 text-sm text-slate-600">
              Blueprint 70% complete
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-2/3 rounded-full bg-slate-900" />
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Exam details
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {examFields.map((field) => (
                <div key={field.key}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {field.label}
                  </p>
                  <input
                    type={field.type}
                    min={field.type === "number" ? 0 : undefined}
                    value={examDetails[field.key]}
                    onChange={(event) =>
                      handleExamChange(field.key, event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Notes
              </p>
              <textarea
                value={examDetails.notes}
                onChange={(event) =>
                  handleExamChange("notes", event.target.value)
                }
                rows={3}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Sections</h2>
            <div className="mt-5 space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div className="grid gap-3 md:grid-cols-[1.6fr_0.7fr_0.8fr_0.6fr_auto]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Section name
                      </p>
                      <input
                        value={section.name}
                        onChange={(event) =>
                          handleSectionChange(
                            section.id,
                            "name",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Items
                      </p>
                      <input
                        type="number"
                        min={0}
                        value={section.items}
                        onChange={(event) =>
                          handleSectionChange(
                            section.id,
                            "items",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Difficulty
                      </p>
                      <select
                        value={section.difficulty}
                        onChange={(event) =>
                          handleSectionChange(
                            section.id,
                            "difficulty",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600"
                      >
                        {difficultyOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Marks
                      </p>
                      <input
                        type="number"
                        min={0}
                        value={section.marks}
                        onChange={(event) =>
                          handleSectionChange(
                            section.id,
                            "marks",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <button
                        onClick={() => handleRemoveSection(section.id)}
                        className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-600"
                      >
                        Remove
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
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Format preview
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Mock data preview updates as you edit.
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Overview
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-700">
                  <div>{examDetails.course}</div>
                  <div>{examDetails.assessment}</div>
                  <div>{examDetails.durationMinutes} minutes</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Totals
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-700">
                  <div>{totals.questions} questions</div>
                  <div>{totals.marks} marks in sections</div>
                  <div>Target marks: {examDetails.totalMarks}</div>
                  {totals.difficultySummary ? (
                    <div>{totals.difficultySummary}</div>
                  ) : null}
                </div>
              </div>
              {marksMismatch ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Section marks do not match the target total yet.
                </div>
              ) : null}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Sections
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-medium text-slate-900">
                          {section.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {section.items} questions · {section.difficulty}
                        </div>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {section.marks} marks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Final checks
            </h2>
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
              Export means saving a reusable format spec (JSON/PDF) for sharing,
              not AI generation.
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Saved formats
            </h2>
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
                  const totalMarks = format.sections.reduce(
                    (sum, section) => sum + section.marks,
                    0
                  );
                  const totalItems = format.sections.reduce(
                    (sum, section) => sum + section.items,
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
                          <p className="text-sm font-semibold text-slate-900">
                            {format.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {format.sections.length} sections · {totalItems}{" "}
                            items · {totalMarks} marks
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Last saved {format.savedAt}
                          </p>
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
