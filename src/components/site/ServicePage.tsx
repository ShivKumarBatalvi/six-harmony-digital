import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import { StickyCta } from "@/components/site/StickyCta";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: { title: string; body: string }[];
  process: string[];
};

const sectors = ["Offices", "Retail", "Property management", "Body corporates", "Industrial & warehouses", "Education", "Healthcare", "Hospitality", "Construction"];

export function ServicePage({ eyebrow, title, intro, image, imageAlt, services, process }: ServicePageProps) {
  return <div className="min-h-screen bg-background pb-20 text-foreground">
    <Nav />
    <StickyCta />
    <header className="relative isolate min-h-[700px] overflow-hidden px-6 pb-20 pt-36 md:px-10 md:pb-24">
      <img src={image} alt={imageAlt} width={1600} height={1008} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-background/70" />
      <div className="mx-auto flex min-h-[540px] max-w-6xl flex-col justify-end">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.88]">{title}</h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><p className="max-w-2xl text-lg leading-relaxed md:text-xl">{intro}</p><Button asChild size="lg" className="h-auto shrink-0 rounded-none px-7 py-4 text-xs uppercase tracking-[0.18em]"><a href="#enquire">Free site assessment <ArrowRight /></a></Button></div>
      </div>
    </header>

    <main>
      <section className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-6xl"><Reveal><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Scope of service</p><h2 className="mt-5 max-w-3xl text-4xl md:text-5xl">Built around the way your property operates.</h2></Reveal><div className="mt-14 grid border-l border-t border-border md:grid-cols-2">{services.map((service, index) => <Reveal key={service.title} delay={index * 50}><article className="h-full border-b border-r border-border p-8 md:p-10"><span className="font-mono text-[10px] text-accent">0{index + 1}</span><h3 className="mt-10 text-2xl">{service.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{service.body}</p></article></Reveal>)}</div></div></section>

      <section className="border-y border-border bg-card/60 px-6 py-24 md:px-10"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12"><div className="md:col-span-4"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Sectors</p><h2 className="mt-5 text-4xl">Commercial environments, understood.</h2></div><ul className="grid gap-px bg-border md:col-span-8 sm:grid-cols-2">{sectors.map((sector) => <li key={sector} className="flex items-center gap-3 bg-background p-5 text-lg"><Check className="text-accent" size={16} />{sector}</li>)}</ul></div></section>

      <section className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12"><div className="md:col-span-5"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">How we engage</p><h2 className="mt-5 text-4xl md:text-5xl">A clear path from site walk-through to delivery.</h2></div><ol className="divide-y divide-border border-y border-border md:col-span-7">{process.map((step, index) => <li key={step} className="flex gap-8 py-6"><span className="font-mono text-[10px] text-accent">0{index + 1}</span><span className="text-xl">{step}</span></li>)}</ol></div></section>

      <section className="border-y border-border px-6 py-24 md:px-10"><div className="mx-auto max-w-6xl"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Procurement support</p><div className="mt-6 grid gap-10 md:grid-cols-3"><div><h2 className="text-2xl">Credibility documents</h2><p className="mt-4 leading-relaxed text-muted-foreground">Tell us which NZBN, insurance, health and safety, workforce, or environmental records your process requires.</p></div><div><h2 className="text-2xl">Case studies</h2><p className="mt-4 leading-relaxed text-muted-foreground">Discuss the project evidence and service examples relevant to your property portfolio or tender.</p></div><div><h2 className="text-2xl">References</h2><p className="mt-4 leading-relaxed text-muted-foreground">Include your reference and testimonial requirements in the procurement enquiry.</p></div></div><Button asChild variant="outline" size="lg" className="mt-10 h-auto rounded-none px-7 py-4 text-xs uppercase tracking-[0.18em]"><a href="mailto:admin@sixharmony.co.nz?subject=Tender%20%2F%20Procurement%20Enquiry">Tender / procurement enquiry <ArrowRight /></a></Button></div></section>

      <EnquiryForm />
      <section className="px-6 py-14 md:px-10"><div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-muted-foreground"><Link to="/commercial-cleaning" className="hover:text-accent">Commercial cleaning</Link><Link to="/facilities-management" className="hover:text-accent">Facilities management</Link><Link to="/commercial-property-maintenance" className="hover:text-accent">Property maintenance</Link></div></section>
    </main>
  </div>;
}
