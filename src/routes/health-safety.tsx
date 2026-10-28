import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

const url = "https://sixharmony.co.nz/health-safety";
export const Route = createFileRoute("/health-safety")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: "Health & Safety | SiteWise | Six Harmony" }, { name: "description", content: "Six Harmony holds SiteWise and follows workplace Health & Safety procedures: inducted staff, JSAs, site documentation, PPE and safe chemical handling." }, { property: "og:title", content: "Health & Safety at Six Harmony" }, { property: "og:description", content: "SiteWise and site-specific Health & Safety for every cleaning and maintenance job." }, { property: "og:type", content: "website" }, { property: "og:url", content: url }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: url }] }),
  component: HealthSafety,
});

const items = ["Trained and inducted staff", "Staff background checks", "Job Safety Analysis (JSA)", "Site-specific Health & Safety documentation", "Site inductions and procedures", "Appropriate PPE", "Hazard identification and risk management", "Safe chemical handling and SDS documentation", "Additional client-specific Health & Safety requirements"];

function HealthSafety() {
  return <PageShell heading="Health & Safety and SiteWise Compliance" eyebrow="Health & Safety" title={<>Safe work,<br /><span className="font-serif italic text-accent">on every site.</span></>} intro="Six Harmony has SiteWise and follows appropriate workplace Health & Safety procedures, so our teams work safely and to your site's standards.">
    <section className="border-y border-border bg-card/60 px-6 py-16 md:px-10"><div className="mx-auto flex max-w-6xl items-center gap-6"><ShieldCheck className="shrink-0 text-accent" size={48} /><div><p className="text-3xl">SiteWise</p><p className="mt-2 max-w-2xl text-muted-foreground">Our Health & Safety systems are recognised through SiteWise, helping property managers and procurement teams engage us with confidence.</p></div></div></section>
    <section className="px-6 py-24 md:px-10"><div className="mx-auto max-w-6xl"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Our services can include</p><ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{items.map((t, i) => <Reveal key={t} delay={(i % 3) * 60}><li className="flex h-full items-start gap-4 bg-background p-7 text-lg"><span className="font-mono text-[10px] text-accent pt-1.5">{String(i + 1).padStart(2, "0")}</span>{t}</li></Reveal>)}</ul></div></section>
  </PageShell>;
}
