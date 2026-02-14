import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

import GenerationClient from "../../generation-client";
import { formatOptions, questionPresets } from "../../data";

export const dynamic = "force-dynamic";

type LineupPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

export default async function GenerationLineupPage({ searchParams }: LineupPageProps) {
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Question lineup</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">Format not found</h1>
          <p className="mt-3 text-base text-slate-600">
            Choose a blueprint from the library before opening the lineup view.
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
      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Question lineup</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">{activeFormat.name}</h1>
            <p className="mt-3 text-base text-slate-600">
              Review the full lineup, lock preferred questions, and adjust prompts before exporting.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/generation/run?formatId=${activeFormat.id}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Back to workspace
            </Link>
            <Link
              href={`/builder/editor?formatId=${activeFormat.id}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Adjust in builder
            </Link>
          </div>
        </header>
        <GenerationClient
          format={activeFormat}
          questions={questions}
          expectedTotal={expectedTotal}
          view="lineup"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
