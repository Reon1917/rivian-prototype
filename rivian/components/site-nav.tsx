import Link from "next/link";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Builder", href: "/builder" },
  { label: "Question Bank", href: "/question-bank" },
  { label: "Teams", href: "/teams" },
  { label: "Generation", href: "/generation" },
  { label: "Pricing", href: "/pricing" },
];

export default function SiteNav() {
  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--rivian-yellow-soft)]">
            <span className="h-4 w-4 rounded-[6px] bg-slate-900" />
          </span>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              Rivian
            </div>
            <div className="text-xs text-slate-500">Assessment design suite</div>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 transition hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Live demo
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Start building
          </Link>
        </div>
      </div>
    </header>
  );
}
