import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import BuilderClient from "../builder-client";

export default function BuilderEditorPage() {
  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <BuilderClient />
      <SiteFooter />
    </div>
  );
}
