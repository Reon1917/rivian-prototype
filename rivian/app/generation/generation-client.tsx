"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  BlueprintQuestion,
  FormatBlueprint,
  InstructionEmphasis,
  InstructionItem,
  MetadataRow,
} from "./types";

type QuestionState = BlueprintQuestion & {
  locked: boolean;
  order: number;
};

type GenerationClientProps = {
  format: FormatBlueprint;
  questions: BlueprintQuestion[];
  expectedTotal: number;
  view?: "workspace" | "lineup";
};

const emphasisOptions: InstructionEmphasis[] = ["normal", "bold", "underline"];

export default function GenerationClient({
  format,
  questions,
  expectedTotal,
  view = "workspace",
}: GenerationClientProps) {
  const [headerLines, setHeaderLines] = useState<string[]>(format.layout.headerLines);
  const [metadata, setMetadata] = useState<MetadataRow[]>(format.layout.metadata);
  const [instructionIntro, setInstructionIntro] = useState<string>(format.layout.instructionIntro);
  const [instructions, setInstructions] = useState<InstructionItem[]>(format.layout.instructions);
  const [candidateFields, setCandidateFields] = useState<string[]>(format.layout.candidateFields);
  const [footerNotes, setFooterNotes] = useState<string[]>(format.layout.footerNotes);
  const [questionList, setQuestionList] = useState<QuestionState[]>(() =>
    questions.map((question, index) => ({
      ...question,
      locked: question.locked ?? false,
      order: index,
    }))
  );
  const originalQuestionsRef = useRef<QuestionState[]>(questionList.map((question) => ({ ...question })));
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"editing" | "preview">("editing");
  const [selectedBank, setSelectedBank] = useState<string>("biology");

  useEffect(() => {
    setHeaderLines(format.layout.headerLines);
    setMetadata(format.layout.metadata);
    setInstructionIntro(format.layout.instructionIntro);
    setInstructions(format.layout.instructions);
    setCandidateFields(format.layout.candidateFields);
    setFooterNotes(format.layout.footerNotes);
    const nextQuestions = questions.map((question, index) => ({
      ...question,
      locked: question.locked ?? false,
      order: index,
    }));
    setQuestionList(nextQuestions);
    originalQuestionsRef.current = nextQuestions.map((question) => ({ ...question }));
  }, [format, questions]);

  const totalQuestions = questionList.length;
  const showAnswerDetails = view === "lineup";

  type QuestionDiagnostic = {
    grammar: string[];
    duplicates: Array<{ order: number; section: string }>;
    clusterId: string | null;
  };

  type DuplicateCluster = {
    id: string;
    questions: QuestionState[];
  };

  const { diagnostics: questionDiagnostics, clusters: duplicateClusters } = useMemo(() => {
    const diagnostics = new Map<string, QuestionDiagnostic>();
    const normalizedBuckets = new Map<string, QuestionState[]>();
    const adjacency = new Map<string, Set<string>>();
    const questionById = new Map<string, QuestionState>();

    const ensureEdge = (sourceId: string, targetId: string) => {
      if (sourceId === targetId) {
        return;
      }
      const neighbors = adjacency.get(sourceId) ?? new Set<string>();
      neighbors.add(targetId);
      adjacency.set(sourceId, neighbors);
    };

    const addDuplicateReference = (entry: QuestionDiagnostic | undefined, target: QuestionState) => {
      if (!entry) {
        return;
      }
      const existing = entry.duplicates.some(
        (reference) => reference.order === target.order + 1 && reference.section === target.section
      );
      if (!existing) {
        entry.duplicates.push({ order: target.order + 1, section: target.section });
      }
    };

    const tokenize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);

    questionList.forEach((question) => {
      const trimmed = question.prompt.trim();
      const grammarIssues: string[] = [];

      if (trimmed.length === 0) {
        grammarIssues.push("Prompt is empty.");
      } else {
        if (!/[.!?]$/.test(trimmed)) {
          grammarIssues.push("Add ending punctuation.");
        }
        if (/ {2,}/.test(question.prompt)) {
          grammarIssues.push("Contains repeated spaces.");
        }
        if (/^[a-z]/.test(trimmed)) {
          grammarIssues.push("Start with a capital letter.");
        }
      }

      diagnostics.set(question.id, {
        grammar: grammarIssues,
        duplicates: [],
        clusterId: null,
      });

      questionById.set(question.id, question);

      const normalizedKey = trimmed.toLowerCase().replace(/\s+/g, " ");
      const bucket = normalizedBuckets.get(normalizedKey) ?? [];
      bucket.push(question);
      normalizedBuckets.set(normalizedKey, bucket);
    });

    normalizedBuckets.forEach((items) => {
      if (items.length <= 1) {
        return;
      }
      items.forEach((item) => {
        const entry = diagnostics.get(item.id);
        if (!entry) {
          return;
        }
        items.forEach((other) => {
          if (other.id === item.id) {
            return;
          }
          addDuplicateReference(entry, other);
          ensureEdge(item.id, other.id);
        });
      });
    });

    for (let i = 0; i < questionList.length; i += 1) {
      const first = questionList[i];
      const firstTokens = tokenize(first.prompt);
      if (firstTokens.length < 3) {
        continue;
      }
      const firstNormalized = first.prompt.trim().toLowerCase().replace(/\s+/g, " ");
      for (let j = i + 1; j < questionList.length; j += 1) {
        const second = questionList[j];
        const secondTokens = tokenize(second.prompt);
        if (secondTokens.length < 3) {
          continue;
        }
        const secondNormalized = second.prompt.trim().toLowerCase().replace(/\s+/g, " ");
        if (firstNormalized === secondNormalized) {
          continue;
        }
        const firstSet = new Set(firstTokens);
        const secondSet = new Set(secondTokens);
        let overlap = 0;
        firstSet.forEach((token) => {
          if (secondSet.has(token)) {
            overlap += 1;
          }
        });
        const similarity = overlap / Math.min(firstSet.size, secondSet.size);
        if (similarity >= 0.8) {
          const firstEntry = diagnostics.get(first.id);
          const secondEntry = diagnostics.get(second.id);
          addDuplicateReference(firstEntry, second);
          addDuplicateReference(secondEntry, first);
          ensureEdge(first.id, second.id);
          ensureEdge(second.id, first.id);
        }
      }
    }

    const clusters = new Map<string, DuplicateCluster>();
    const visited = new Set<string>();
    let clusterIndex = 1;

    const traverseCluster = (startId: string) => {
      const stack = [startId];
      const members = new Set<string>();
      while (stack.length > 0) {
        const current = stack.pop()!;
        if (visited.has(current)) {
          continue;
        }
        visited.add(current);
        members.add(current);
        const neighbors = adjacency.get(current);
        if (!neighbors) {
          continue;
        }
        neighbors.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        });
      }
      return members;
    };

    questionList.forEach((question) => {
      if (visited.has(question.id)) {
        return;
      }
      const neighbors = adjacency.get(question.id);
      if (!neighbors || neighbors.size === 0) {
        visited.add(question.id);
        return;
      }
      const members = traverseCluster(question.id);
      if (members.size <= 1) {
        return;
      }
      const clusterId = `cluster-${clusterIndex}`;
      clusterIndex += 1;
      const clusterQuestions = Array.from(members)
        .map((memberId) => questionById.get(memberId)!)
        .sort((a, b) => a.order - b.order);
      clusterQuestions.forEach((member) => {
        const entry = diagnostics.get(member.id);
        if (entry) {
          entry.clusterId = clusterId;
        }
      });
      clusters.set(clusterId, {
        id: clusterId,
        questions: clusterQuestions,
      });
    });

    return {
      diagnostics,
      clusters,
    };
  }, [questionList]);

  const questionsBySection = useMemo(() => {
    const groups = new Map<string, QuestionState[]>();
    questionList.forEach((question) => {
      const items = groups.get(question.section) ?? [];
      items.push(question);
      groups.set(question.section, items);
    });
    return Array.from(groups.entries());
  }, [questionList]);

  const handleHeaderLineChange = (index: number, value: string) => {
    setHeaderLines((prev) => prev.map((line, idx) => (idx === index ? value : line)));
  };

  const addHeaderLine = () => {
    setHeaderLines((prev) => [...prev, "New heading line"]);
  };

  const removeHeaderLine = (index: number) => {
    setHeaderLines((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMetadataChange = (index: number, key: keyof MetadataRow, value: string) => {
    setMetadata((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
  };

  const addMetadataRow = () => {
    setMetadata((prev) => [...prev, { label: "Label", value: "Value" }]);
  };

  const removeMetadataRow = (index: number) => {
    setMetadata((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleInstructionChange = (index: number, key: keyof InstructionItem, value: string) => {
    setInstructions((prev) =>
      prev.map((instruction, idx) =>
        idx === index
          ? {
              ...instruction,
              [key]: key === "emphasis" ? (value as InstructionEmphasis) : value,
            }
          : instruction
      )
    );
  };

  const addInstruction = () => {
    setInstructions((prev) => [...prev, { text: "New instruction", emphasis: "normal" }]);
  };

  const removeInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCandidateFieldChange = (index: number, value: string) => {
    setCandidateFields((prev) => prev.map((field, idx) => (idx === index ? value : field)));
  };

  const addCandidateField = () => {
    setCandidateFields((prev) => [...prev, "New candidate field"]);
  };

  const removeCandidateField = (index: number) => {
    setCandidateFields((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFooterNoteChange = (index: number, value: string) => {
    setFooterNotes((prev) => prev.map((note, idx) => (idx === index ? value : note)));
  };

  const addFooterNote = () => {
    setFooterNotes((prev) => [...prev, "Additional note"]);
  };

  const removeFooterNote = (index: number) => {
    setFooterNotes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleQuestionPromptChange = (id: string, value: string) => {
    setQuestionList((prev) => prev.map((question) => (question.id === id ? { ...question, prompt: value } : question)));
  };

  const handleOptionLabelChange = (questionId: string, optionIndex: number, value: string) => {
    setQuestionList((prev) =>
      prev.map((question) => {
        if (question.id === questionId && question.options) {
          const updatedOptions = question.options.map((option, idx) =>
            idx === optionIndex ? { ...option, label: value } : option
          );
          return { ...question, options: updatedOptions };
        }
        return question;
      })
    );
  };

  const handleToggleCorrectOption = (questionId: string, optionIndex: number) => {
    setQuestionList((prev) =>
      prev.map((question) => {
        if (question.id === questionId && question.options) {
          const updatedOptions = question.options.map((option, idx) => ({
            ...option,
            correct: idx === optionIndex,
          }));
          const correctOption = updatedOptions[optionIndex];
          return {
            ...question,
            options: updatedOptions,
            answer: correctOption.label,
          };
        }
        return question;
      })
    );
  };

  const handleKeywordChange = (questionId: string, keywordIndex: number, value: string) => {
    setQuestionList((prev) =>
      prev.map((question) => {
        if (question.id === questionId && question.keywords) {
          const updatedKeywords = question.keywords.map((keyword, idx) =>
            idx === keywordIndex ? value : keyword
          );
          return { ...question, keywords: updatedKeywords };
        }
        return question;
      })
    );
  };

  const handleAddKeyword = (questionId: string) => {
    setQuestionList((prev) =>
      prev.map((question) => {
        if (question.id === questionId) {
          const updatedKeywords = [...(question.keywords || []), ""];
          return { ...question, keywords: updatedKeywords };
        }
        return question;
      })
    );
  };

  const handleRemoveKeyword = (questionId: string, keywordIndex: number) => {
    setQuestionList((prev) =>
      prev.map((question) => {
        if (question.id === questionId && question.keywords) {
          const updatedKeywords = question.keywords.filter((_, idx) => idx !== keywordIndex);
          return { ...question, keywords: updatedKeywords };
        }
        return question;
      })
    );
  };

  const handleToggleLock = (id: string) => {
    setQuestionList((prev) =>
      prev.map((question) => (question.id === id ? { ...question, locked: !question.locked } : question))
    );
  };

  const shuffleUnlocked = () => {
    setQuestionList((prev) => {
      const locked = prev.filter((question) => question.locked);
      const unlocked = prev.filter((question) => !question.locked);
      const shuffled = [...unlocked];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const result: QuestionState[] = [];
      let unlockedIndex = 0;
      let lockedIndex = 0;
      prev.forEach((question) => {
        if (question.locked) {
          result.push({ ...locked[lockedIndex], order: result.length });
          lockedIndex += 1;
        } else {
          result.push({ ...shuffled[unlockedIndex], order: result.length });
          unlockedIndex += 1;
        }
      });
      return result;
    });
  };

  const resetOrder = () => {
    const reset = originalQuestionsRef.current.map((question, index) => ({
      ...question,
      locked: false,
      order: index,
    }));
    setQuestionList(reset);
  };

  const handleSaveOrderingAsBaseline = () => {
    originalQuestionsRef.current = questionList.map((question, index) => ({
      ...question,
      order: index,
    }));
  };

  const handlePreviewToggle = () => {
    setPreviewMode((prev) => (prev === "editing" ? "preview" : "editing"));
  };

  const renderHeaderEditor = () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cover sheet</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">Exam header & metadata</h2>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          {expectedTotal} questions planned
        </span>
      </div>
      <div className="mt-5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Heading lines</p>
            <button
              onClick={addHeaderLine}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add line
            </button>
          </div>
          {headerLines.map((line, index) => (
            <div key={`${line}-${index}`} className="flex gap-3">
              <input
                value={line}
                onChange={(event) => handleHeaderLineChange(index, event.target.value)}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <button
                onClick={() => removeHeaderLine(index)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Metadata</p>
            <button
              onClick={addMetadataRow}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add row
            </button>
          </div>
          {metadata.map((item, index) => (
            <div key={`${item.label}-${index}`} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <input
                value={item.label}
                onChange={(event) => handleMetadataChange(index, "label", event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <input
                value={item.value}
                onChange={(event) => handleMetadataChange(index, "value", event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              />
              <button
                onClick={() => removeMetadataRow(index)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInstructionEditor = (options?: { allowPreviewToggle?: boolean }) => {
    const allowPreviewToggle = options?.allowPreviewToggle ?? false;
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Candidate instructions</h2>
          <div className="flex gap-2">
            {allowPreviewToggle ? (
              <button
                onClick={handlePreviewToggle}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {previewMode === "editing" ? "Preview sheet" : "Back to editing"}
              </button>
            ) : null}
            <button
              onClick={addInstruction}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add instruction
            </button>
          </div>
        </div>
        <div className="mt-5 space-y-4 text-sm text-slate-700">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Intro line</p>
            <textarea
              value={instructionIntro}
              onChange={(event) => setInstructionIntro(event.target.value)}
              rows={2}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            />
          </div>
          <div className="space-y-3">
            {instructions.map((instruction, index) => (
              <div
                key={`${instruction.text}-${index}`}
                className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:grid-cols-[1fr_140px_auto]"
              >
                <textarea
                  value={instruction.text}
                  onChange={(event) => handleInstructionChange(index, "text", event.target.value)}
                  rows={2}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                />
                <select
                  value={instruction.emphasis}
                  onChange={(event) => handleInstructionChange(index, "emphasis", event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600"
                >
                  {emphasisOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeInstruction(index)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Candidate fields</p>
            <button
              onClick={addCandidateField}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add field
            </button>
          </div>
          <div className="grid gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
            {candidateFields.map((field, index) => (
              <div key={`${field}-${index}`} className="flex gap-3">
                <input
                  value={field}
                  onChange={(event) => handleCandidateFieldChange(index, event.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                />
                <button
                  onClick={() => removeCandidateField(index)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Footer notes</p>
            <button
              onClick={addFooterNote}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Add note
            </button>
          </div>
          <div className="space-y-3">
            {footerNotes.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                No footer notes yet.
              </p>
            ) : (
              footerNotes.map((note, index) => (
                <div key={`${note}-${index}`} className="flex gap-3">
                  <input
                    value={note}
                    onChange={(event) => handleFooterNoteChange(index, event.target.value)}
                    className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                  />
                  <button
                    onClick={() => removeFooterNote(index)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSectionBlueprint = () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Section blueprint</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Mirrors saved format</span>
      </div>
      <div className="mt-5 space-y-3 text-sm text-slate-700">
        {format.sections.map((section) => (
          <div
            key={section.name}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-base font-semibold text-slate-900">
                {section.name}
              </p>
              <p className="text-xs text-slate-500">
                {section.questions} questions · {section.questionType} · {section.category}
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              {section.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuestionManager = () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Question line-up</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={shuffleUnlocked}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            Shuffle unlocked
          </button>
          <button
            onClick={resetOrder}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            Reset order
          </button>
          <button
            onClick={handleSaveOrderingAsBaseline}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            Save lineup
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">Lock preferred questions before shuffling to keep them in place.</p>
      {view === "lineup" && duplicateClusters.size > 0 ? (
        <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700">Similar question groups</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-sky-900">
            {Array.from(duplicateClusters.values()).map((cluster) => {
              const questionNumbers = cluster.questions
                .map((item) => `#${item.order + 1}`)
                .join(", ");
              const primaryQuestionId = cluster.questions[0]?.id;
              return (
                <a
                  key={cluster.id}
                  href={primaryQuestionId ? `#question-${primaryQuestionId}` : undefined}
                  className="rounded-full border border-sky-200 bg-white px-3 py-1 font-medium text-sky-700 transition hover:border-sky-300 hover:text-sky-900"
                >
                  Group {cluster.id.replace("cluster-", "")} · {questionNumbers}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="mt-5 space-y-6">
        {questionsBySection.map(([sectionName, items]) => {
          const sortedItems = [...items].sort((a, b) => a.order - b.order);
          return (
            <div key={sectionName} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{sectionName}</p>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {sortedItems.length} questions
                </span>
              </div>
              <div className="space-y-4">
                {sortedItems.map((question) => {
                  const diagnostic = questionDiagnostics.get(question.id);
                  const grammarIssues = diagnostic?.grammar.filter(Boolean) ?? [];
                  const duplicateRefs = diagnostic?.duplicates ?? [];
                  const hasGrammarIssues = grammarIssues.length > 0;
                  const hasDuplicateIssues = duplicateRefs.length > 0;
                  const clusterId = diagnostic?.clusterId ?? null;
                  const cluster = clusterId ? duplicateClusters.get(clusterId) : undefined;
                  const clusterMembers = cluster?.questions ?? [];
                  const primaryMember = clusterMembers[0];
                  const isClusterLead = Boolean(primaryMember && primaryMember.id === question.id);
                  const issueRingClass = hasGrammarIssues && hasDuplicateIssues
                    ? "ring-2 ring-purple-400 border-purple-400"
                    : hasGrammarIssues
                    ? "ring-2 ring-amber-400 border-amber-400"
                    : hasDuplicateIssues
                    ? "ring-2 ring-sky-400 border-sky-400"
                    : "";
                  const isEditing = editingQuestionId === question.id;
                  return (
                    <div
                      key={question.id}
                      id={`question-${question.id}`}
                      className={`rounded-2xl border px-4 py-4 ${
                        question.locked ? "border-slate-900 bg-slate-900/5" : "border-slate-200 bg-slate-50"
                      } ${issueRingClass}`}
                    >
                      {clusterId ? (
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-sky-200 bg-sky-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700">
                          <span>Similar group {clusterId.replace("cluster-", "")}</span>
                          <span className="text-[10px] lowercase tracking-normal text-sky-600">
                            {clusterMembers.map((member) => `#${member.order + 1}`).join(", ")}
                          </span>
                          {!isClusterLead && primaryMember ? (
                            <a
                              href={`#question-${primaryMember.id}`}
                              className="rounded-full border border-sky-200 bg-white px-2 py-1 text-[10px] font-semibold lowercase text-sky-700 transition hover:border-sky-300 hover:text-sky-900"
                            >
                              Jump to lead
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-500">#{question.order + 1}</span>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500">
                              {question.type} · {question.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                          <button
                            onClick={() => handleToggleLock(question.id)}
                            className={`rounded-full px-3 py-1 ${
                              question.locked
                                ? "border border-slate-900 bg-slate-900 text-white"
                                : "border border-slate-200 bg-white text-slate-600"
                            }`}
                          >
                            {question.locked ? "Locked" : "Lock"}
                          </button>
                          <button
                            onClick={() => setEditingQuestionId(isEditing ? null : question.id)}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600"
                          >
                            {isEditing ? "Close editor" : "Edit"}
                          </button>
                        </div>
                      </div>
                      {isEditing ? (
                        <textarea
                          value={question.prompt}
                          onChange={(event) => handleQuestionPromptChange(question.id, event.target.value)}
                          rows={3}
                          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                        />
                      ) : (
                        <p className="mt-3 text-sm text-slate-700">{question.prompt}</p>
                      )}
                      {hasGrammarIssues || hasDuplicateIssues ? (
                        <div className="mt-3 space-y-2 text-xs">
                          {hasGrammarIssues ? (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">Grammar</p>
                              <ul className="mt-2 space-y-1">
                                {grammarIssues.map((issue, index) => (
                                  <li key={`${question.id}-grammar-${index}`}>• {issue}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          {hasDuplicateIssues ? (
                            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">Similar</p>
                              <p className="mt-2">
                                Closely matches {duplicateRefs
                                  .map((ref) => `#${ref.order} · ${ref.section}`)
                                  .join(", ")}.
                              </p>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                      {showAnswerDetails ? (
                        <div className="mt-3 space-y-3 text-xs text-slate-600">
                          {Array.isArray(question.options) && question.options.length > 0 ? (
                            <div className="space-y-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Options</p>
                              <ul className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <li key={`${question.id}-option-${optionIndex}`}>
                                    {isEditing ? (
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => handleToggleCorrectOption(question.id, optionIndex)}
                                          className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${
                                            option.correct
                                              ? "border-slate-900 bg-slate-900"
                                              : "border-slate-300 bg-white hover:border-slate-400"
                                          }`}
                                        >
                                          {option.correct && (
                                            <svg
                                              className="h-3 w-3 text-white"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                              />
                                            </svg>
                                          )}
                                        </button>
                                        <input
                                          type="text"
                                          value={option.label}
                                          onChange={(e) => handleOptionLabelChange(question.id, optionIndex, e.target.value)}
                                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className={`rounded-2xl border px-4 py-2 text-xs font-semibold leading-snug ${
                                          option.correct
                                            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                            : "border-slate-200 bg-white text-slate-600"
                                        }`}
                                      >
                                        {option.label}
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          {question.answer && !question.options ? (
                            <div className="space-y-1">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Correct answer</p>
                              <p className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700">
                                {question.answer}
                              </p>
                            </div>
                          ) : null}
                          {question.keywords && question.keywords.length > 0 ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Keywords</p>
                                {isEditing && (
                                  <button
                                    onClick={() => handleAddKeyword(question.id)}
                                    className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 hover:border-slate-300"
                                  >
                                    + Add
                                  </button>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {question.keywords.map((keyword, keywordIndex) => (
                                  <div key={`${question.id}-keyword-${keywordIndex}`}>
                                    {isEditing ? (
                                      <div className="flex items-center gap-1">
                                        <input
                                          type="text"
                                          value={keyword}
                                          onChange={(e) => handleKeywordChange(question.id, keywordIndex, e.target.value)}
                                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 w-32"
                                        />
                                        <button
                                          onClick={() => handleRemoveKeyword(question.id, keywordIndex)}
                                          className="flex-shrink-0 h-5 w-5 rounded-full border border-slate-200 bg-white text-slate-400 hover:border-red-300 hover:text-red-600 flex items-center justify-center"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ) : (
                                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        {keyword}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderQuestionBankSelector = () => {
    const questionBanks = [
      {
        id: "biology",
        name: "Biology Question Bank",
        questions: 27,
        categories: ["Cell Biology", "Genetics", "Evolution"],
        lastUpdated: "2 days ago",
      },
      {
        id: "economics",
        name: "Economics Question Bank",
        questions: 25,
        categories: ["Microeconomics", "Macroeconomics", "Trade"],
        lastUpdated: "1 week ago",
      },
      {
        id: "chemistry",
        name: "Chemistry Question Bank",
        questions: 0,
        categories: ["Organic", "Inorganic", "Physical"],
        lastUpdated: "Not yet created",
      },
    ];

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Question bank</h2>
        <p className="mt-2 text-sm text-slate-600">
          Select which question bank to use for generating this exam.
        </p>
        <div className="mt-4 space-y-3">
          {questionBanks.map((bank) => {
            const isSelected = selectedBank === bank.id;
            const isDisabled = bank.questions === 0;
            return (
              <button
                key={bank.id}
                onClick={() => !isDisabled && setSelectedBank(bank.id)}
                disabled={isDisabled}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-slate-900 bg-slate-50 shadow-sm"
                    : isDisabled
                    ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{bank.name}</h3>
                      {isSelected && (
                        <svg
                          className="h-4 w-4 text-slate-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {bank.questions} questions
                      {bank.questions > 0 && ` · ${bank.categories.join(", ")}`}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Updated {bank.lastUpdated}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50">
            + Create new bank
          </button>
        </div>
      </div>
    );
  };

  const renderStatusPanel = () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Format summary</h2>
      <p className="mt-2 text-sm text-slate-600">{format.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{format.sections.length} sections</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{totalQuestions} questions</span>
        <span
          className={`rounded-full px-3 py-1 ${
            format.status === "Active"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : format.status === "Draft"
              ? "border border-amber-200 bg-amber-50 text-amber-700"
              : "border border-slate-200 bg-slate-100 text-slate-700"
          }`}
        >
          {format.status}
        </span>
      </div>
      {expectedTotal !== totalQuestions ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          Blueprint expects {expectedTotal} questions; current lineup has {totalQuestions}.
        </div>
      ) : null}
    </div>
  );

  if (view === "lineup") {
    return (
      <div className="mt-8 space-y-6">
        {renderQuestionManager()}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-6">
        {renderHeaderEditor()}
        {renderInstructionEditor({ allowPreviewToggle: false })}
        {renderSectionBlueprint()}
      </section>
      <section className="space-y-6">
        {renderStatusPanel()}
        {renderQuestionBankSelector()}
      </section>
    </div>
  );
}
