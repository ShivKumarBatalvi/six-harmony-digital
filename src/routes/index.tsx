import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import commercialCleaning from "@/assets/commercial-cleaning.jpg";
import facilitiesManagement from "@/assets/facilities-management.jpg";
import propertyMaintenance from "@/assets/property-maintenance.jpg";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { StickyCta } from "@/components/site/StickyCta";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { EnquiryForm } from "@/components/site/EnquiryForm";

const baseUrl = "https://sixharmony.co.nz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Commercial Cleaning & Facilities Management NZ | Six Harmony" },
      { name: "description", content: "Commercial cleaning, facilities management and property maintenance for workplaces and commercial properties across six New Zealand locations." },
      { property: "og:title", content: "Commercial Property Services | Six Harmony" },
      { property: "og:description", content: "One accountable team for commercial cleaning, facilities management and property maintenance across New Zealand." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: baseUrl },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: baseUrl }],
  }),
  component: Index,
});

const services = [
  { title: "Commercial Cleaning", body: "Scheduled cleaning for offices, retail, body corporates, warehouses and construction sites — including windows, carpets, hard floors and final cleans.", image: commercialCleaning, to: "/commercial-cleaning" as const },
  { title: "Facilities Management", body: "Planned and reactive services, inspections and contractor coordination, with one clear point of contact for the property team.", image: facilitiesManagement, to: "/facilities-management" as const },
  { title: "Commercial Property Maintenance", body: "Electrical, plumbing, HVAC, painting and carpentry work coordinated around your site, occupants and operating hours.", image: propertyMaintenance, to: "/commercial-property-maintenance" as const },
];

const sectors = ["Offices", "Retail", "Property management", "Body corporates", "Industrial & warehouses", "Education", "Healthcare", "Hospitality", "Construction"];
const locations = ["Auckland", "Palmerston North", "Whanganui", "Rotorua", "Timaru", "Christchurch"];

function Index() {
  return <div id="top" className="min-h-screen bg-background pb-20 text-foreground">
    <Nav /><StickyCta />
    <header className="relative isolate flex min-h-[720px] h-[92vh] flex-col justify-end overflow-hidden px-6 pb-16 md:px-10 md:pb-20">
      <div className="absolute inset-0 z-0"><HeroCarousel images={[{ src: commercialCleaning, alt: "Commercial cleaning team working in a modern office" }, { src: facilitiesManagement, alt: "Facilities technician inspecting commercial building systems" }, { src: propertyMaintenance, alt: "Commercial property maintenance inspection" }]} /></div>
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">Commercial property services · New Zealand</p>
        <h1 className="mt-5 max-w-6xl text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.86] animate-reveal">Your sites.<br/><span className="font-serif italic text-accent">Working better.</span></h1>
        <div className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><p className="max-w-2xl text-lg leading-relaxed md:text-xl">Commercial cleaning, facilities management and property maintenance delivered through one accountable team.</p><Button asChild size="lg" className="h-auto shrink-0 rounded-none px-7 py-4 text-xs uppercase tracking-[0.16em]"><a href="#enquire">Request a free site assessment <ArrowRight /></a></Button></div>
      </div>
    </header>

    <section className="border-y border-border overflow-hidden py-5"><div className="flex gap-12 whitespace-nowrap animate-marquee">{Array.from({ length: 2 }).map((_, duplicate) => <div key={duplicate} className="flex shrink-0 gap-12">{locations.map((location) => <span key={location} className="text-xl md:text-3xl">{location} <span className="ml-8 text-accent">✦</span></span>)}</div>)}</div></section>

    <section id="services" className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-6xl"><Reveal><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Core services</p><div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><h2 className="max-w-3xl text-4xl leading-none md:text-6xl">Reliable service, without the fragmented supply chain.</h2><p className="max-w-sm text-muted-foreground">Choose a focused service or combine cleaning and maintenance under a coordinated programme.</p></div></Reveal><div className="mt-16 grid gap-px bg-border lg:grid-cols-3">{services.map((service, index) => <Reveal key={service.title} delay={index * 100}><article className="group flex h-full flex-col bg-background"><div className="overflow-hidden"><img src={service.image} alt="" width={1600} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><div className="flex flex-1 flex-col p-8"><span className="font-mono text-[10px] text-accent">0{index + 1}</span><h3 className="mt-8 text-2xl">{service.title}</h3><p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{service.body}</p><Button asChild variant="link" className="mt-7 h-auto justify-start p-0 text-accent"><Link to={service.to}>Explore service <ArrowRight /></Link></Button></div></article></Reveal>)}</div></div></section>

    <section className="border-y border-border bg-card/60 px-6 py-24 md:px-10"><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12"><div className="md:col-span-4"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Sectors</p><h2 className="mt-5 text-4xl">Built for occupied, operational sites.</h2><p className="mt-6 leading-relaxed text-muted-foreground">Service plans are shaped around access, foot traffic, compliance needs and business hours.</p></div><ul className="grid gap-px bg-border sm:grid-cols-2 md:col-span-8">{sectors.map((sector) => <li key={sector} className="flex items-center gap-3 bg-background p-5"><Check size={16} className="text-accent" />{sector}</li>)}</ul></div></section>

    <section className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12"><div className="md:col-span-5"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Commercial confidence</p><h2 className="mt-5 text-4xl leading-none md:text-5xl">A procurement conversation grounded in your requirements.</h2></div><div className="grid gap-px bg-border sm:grid-cols-2 md:col-span-7">{["Site-specific scope and schedule", "Clear service coordination", "Tender and procurement support", "Documentation by request"].map((item) => <div key={item} className="bg-background p-7 text-lg">{item}</div>)}</div></div></section>

    <section className="border-y border-border bg-foreground px-6 py-24 text-background md:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-12 md:grid-cols-2"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">Case studies</p><h2 className="mt-5 text-4xl">Relevant project evidence, discussed directly.</h2><p className="mt-6 max-w-lg leading-relaxed opacity-70">Request examples suited to your sector, property type and service scope as part of the site-assessment process.</p></div><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">Client testimonials</p><h2 className="mt-5 text-4xl">References for procurement teams.</h2><p className="mt-6 max-w-lg leading-relaxed opacity-70">Include your reference requirements in the enquiry so they can be addressed alongside scope, timing and documentation.</p></div></div><Button asChild className="mt-10 h-auto rounded-none bg-background px-7 py-4 text-xs uppercase tracking-[0.18em] text-foreground hover:bg-accent"><a href="mailto:admin@sixharmony.co.nz?subject=Tender%20%2F%20Procurement%20Enquiry">Tender / procurement enquiry <ArrowRight /></a></Button></div></section>

    <EnquiryForm />
    <footer className="border-t border-border px-6 py-10 md:px-10"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 text-[10px] uppercase tracking-wider text-muted-foreground md:flex-row"><p>Six Harmony © {new Date().getFullYear()} · Based in Auckland</p><p>Serving Auckland · Palmerston North · Whanganui · Rotorua · Timaru · Christchurch</p></div></footer>
  </div>;
}