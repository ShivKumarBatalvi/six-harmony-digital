import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Nav } from "@/components/site/Nav";
import { StickyCta } from "@/components/site/StickyCta";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export function PageShell({ eyebrow, heading, title, intro, children }: { eyebrow: string; heading: string; title: ReactNode; intro: string; children: ReactNode }) {
  return <div className="min-h-screen bg-background pb-20 text-foreground">
    <Nav /><StickyCta />
    <header className="px-6 pb-16 pt-40 md:px-10 md:pb-24 md:pt-48"><div className="mx-auto max-w-6xl">
      <h1 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent" aria-label={heading} title={eyebrow}>{heading}</h1>
      <h2 className="mt-6 max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.9] animate-reveal">{title}</h2>
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
        <div className="flex shrink-0 gap-3"><a href="#enquire" className="bg-foreground px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-background hover:bg-accent transition-colors">Get a free quote</a><a href="#enquire" className="border border-foreground/40 px-6 py-4 text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors">Book a site visit</a></div></div>
    </div></header>
    <main>{children}</main>
    <EnquiryForm />
    <SiteFooter />
  </div>;
}
