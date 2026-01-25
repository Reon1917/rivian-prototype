import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "/features" },
  { label: "Builder", href: "/builder" },
  { label: "Question Bank", href: "/question-bank" },
  { label: "Generation", href: "/generation" },
  { label: "Pricing", href: "/pricing" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">Rivian</div>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Format-first exam creation for educators who care about clarity,
            consistency, and academic integrity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-xs text-slate-400">
          Prototype for academic assessment workflows.
        </div>
      </div>
    </footer>
  );
}
