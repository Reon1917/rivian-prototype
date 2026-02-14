import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

import GenerationClient from "./generation-client";
import { formatOptions, questionPresets } from "./data";

export const dynamic = "force-dynamic";

type GenerationPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

export default async function GenerationPage({ searchParams }: GenerationPageProps) {
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
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Generation flow
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">
              Pick a saved blueprint to continue
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Formats are saved in the builder library. Choose one to review the cover sheet and run generation.
            </p>
          </div>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            {formatOptions.map((format) => (
              <div
                key={format.id}
                className={`flex flex-col gap-4 rounded-3xl border px-6 py-6 shadow-sm transition ${
                  format.status === "Active"
                    ? "border-slate-200 bg-white hover:border-slate-300 hover:shadow"
                    : "border-dashed border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">{format.name}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      format.status === "Active"
                        ? "bg-slate-900 text-white"
                        : format.status === "Draft"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {format.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{format.description}</p>
                <p className="text-xs text-slate-400">Last updated {format.savedAt}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600">
                    {format.sections.length} sections
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600">
                    {format.sections.reduce((sum, section) => sum + section.questions, 0)} questions
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {format.id === "format-prototype" ? (
                    <Link
                      href={`/generation/run?formatId=${format.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Use this format
                    </Link>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400">
                      Use this format
                    </span>
                  )}
                  <Link
                    href={`/builder/editor?formatId=${format.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                  >
                    Open in builder
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <div className="mt-12 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-600">
            Tip: Manage your saved formats in the builder library before running generation.
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const totalQuestions = activeFormat.sections.reduce((sum, section) => sum + section.questions, 0);
  const questions = questionPresets[activeFormat.id] ?? [];

  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Active format
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">
              {activeFormat.name}
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Review the cover sheet and instructions before running automated question assembly.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/generation"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                Switch format
              </Link>
              <Link
                href={`/builder/editor?formatId=${activeFormat.id}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                Adjust in builder
              </Link>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Run generation
              </button>
            </div>
            <p className="text-xs text-slate-400">Last saved {activeFormat.savedAt}</p>
          </div>
        </header>
        <GenerationClient
          format={activeFormat}
          questions={questions}
          expectedTotal={totalQuestions}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
