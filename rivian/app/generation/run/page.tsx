import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

import GenerationClient from "../generation-client";
import { formatOptions, questionPresets } from "../data";

export const dynamic = "force-dynamic";

type RunPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

export default async function GenerationRunPage({ searchParams }: RunPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const rawFormatId = resolvedSearchParams.formatId;
  const formatId = Array.isArray(rawFormatId)
    ? rawFormatId[0] ?? null
    : rawFormatId ?? null;
  const activeFormat = formatOptions.find((format) => format.id === formatId) ?? null;

  if (!activeFormat) {
    return (
      <div className="min-h-screen page-shell text-slate-900">
        <SiteNav />
        <main className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Generation flow</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">Format not found</h1>
          <p className="mt-3 text-base text-slate-600">
            Choose a blueprint from the library before opening the generation workspace.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/generation"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Back to format library
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const expectedTotal = activeFormat.sections.reduce(
    (sum, section) => sum + section.questions,
    0
  );
  const questions = questionPresets[activeFormat.id] ?? [];

  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Generation workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">
              {activeFormat.name}
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Adjust the cover sheet, lock in the question lineup, and preview the exam before generating.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href={`/generation/run/lineup?formatId=${activeFormat.id}`}
                className="rounded-full border border-slate-900 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-300"
              >
                View lineup
              </Link>
              <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                Generate exam
              </button>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/generation"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                Choose another format
              </Link>
              <Link
                href={`/builder/editor?formatId=${activeFormat.id}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                Adjust in builder
              </Link>
            </div>
            <p className="text-xs text-slate-400">Last updated {activeFormat.savedAt}</p>
          </div>
        </header>
        <GenerationClient
          format={activeFormat}
          questions={questions}
          expectedTotal={expectedTotal}
          view="workspace"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
