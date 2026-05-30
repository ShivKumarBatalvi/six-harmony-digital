import { createFileRoute } from "@tanstack/react-router";
import heroHome from "@/assets/hero-home.jpg";
import projectTitirangi from "@/assets/project-titirangi.jpg";
import projectPonsonby from "@/assets/project-ponsonby.jpg";
import projectParnell from "@/assets/project-parnell.jpg";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { StickyCta } from "@/components/site/StickyCta";
import { HeroCarousel } from "@/components/site/HeroCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Six Harmony — Renovations, Facilities & Project Management, New Zealand" },
      {
        name: "description",
        content:
          "Six Harmony is an Auckland-based studio for renovations, facilities management, project management and comprehensive trade services across Aotearoa.",
      },
      { property: "og:title", content: "Six Harmony — Auckland Builders & Project Management" },
      {
        property: "og:description",
        content:
          "Premium renovations, facilities and project management for discerning clients across New Zealand.",
      },
      { property: "og:image", content: heroHome },
      { name: "twitter:image", content: heroHome },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    n: "01",
    title: "Renovations",
    body: "Commercial and residential renovations delivered with precision joinery, refined finishes and zero-disruption staging on busy sites.",
  },
  {
    n: "02",
    title: "Facilities Management",
    body: "Proactive maintenance programmes, scheduled inspections and rapid-response trades keeping Auckland properties operating at their best.",
  },
  {
    n: "03",
    title: "Project Management",
    body: "Sophisticated management of high-value developments — from consent and procurement to handover, with transparent reporting throughout.",
  },
  {
    n: "04",
    title: "Comprehensive Trade Services",
    body: "A vetted bench of master tradespeople — carpenters, electricians, plumbers, painters — coordinated under a single point of accountability.",
  },
];

const pillars = [
  "Consistent delivery on busy commercial sites",
  "Strong project leadership from brief to handover",
  "Health and safety engineered into every job",
  "Clear, weekly communication — no surprises",
  "Reliable, repeat trades with proven track record",
  "Transparent fixed-fee or open-book pricing",
];

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground font-display pb-20">
      <Nav />
      <StickyCta />

      {/* HERO */}
      <header className="relative isolate h-screen min-h-[640px] flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroCarousel
            images={[
              { src: heroHome, alt: "Auckland architectural home with board-formed concrete and black cedar at dusk" },
              { src: projectTitirangi, alt: "Black cedar pavilion in Titirangi native bush" },
              { src: projectPonsonby, alt: "Concrete kitchen island with brass tapware in Ponsonby villa" },
              { src: projectParnell, alt: "Detail of seamless white oak joinery and plaster" },
            ]}
          />
        </div>

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          <h1 className="text-[clamp(2.75rem,10vw,8rem)] font-medium leading-[0.85] tracking-tighter text-balance animate-reveal [animation-delay:300ms]">
            Refining the<br />
            <span className="font-serif italic text-accent pr-4">Auckland</span> Landscape
          </h1>
          <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:justify-between md:items-end gap-8 animate-reveal [animation-delay:600ms]">
            <p className="max-w-[40ch] text-base md:text-lg leading-snug text-pretty">
              Six Harmony is a New Zealand renovations, facilities and project
              management studio dedicated to the precision of form and the honesty of materials.
            </p>
            <div className="flex flex-col md:items-end gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Est. MMXXIV · Tāmaki Makaurau
              </span>
              <div className="w-12 h-px bg-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <section className="border-y border-border overflow-hidden py-6 bg-background">
        <div className="flex gap-16 whitespace-nowrap animate-marquee will-change-transform">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex gap-16 shrink-0">
              {[
                "Commercial Renovations",
                "Facilities Management",
                "Project Management",
                "Trade Services",
                "Heritage Restoration",
                "Fit-outs",
                "Auckland · Aotearoa",
              ].map((t) => (
                <span key={t} className="font-serif italic text-3xl md:text-5xl text-foreground/80">
                  {t} <span className="text-accent not-italic font-display">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="studio" className="py-24 md:py-32 px-6 md:px-10 border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { n: "01", v: 240, s: "+", l: "Renovations Completed" },
            { n: "02", v: 92, s: "%", l: "Repeat Clients" },
            { n: "03", v: 18, s: "+", l: "Years of Expertise" },
            { n: "04", v: 100, s: "%", l: "Aotearoa Owned" },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] uppercase text-accent tracking-widest">
                  Metric.{s.n}
                </span>
                <div className="text-4xl md:text-5xl font-medium tracking-tight">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:justify-between md:items-baseline gap-4">
              <h2 className="text-4xl md:text-5xl tracking-tighter">Our Core Disciplines</h2>
              <span className="font-serif italic text-xl md:text-2xl text-accent">
                Building with intent.
              </span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <article className="group bg-background p-10 md:p-12 md:aspect-square flex flex-col justify-between gap-12 transition-colors duration-500 hover:bg-card">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-muted-foreground">{s.n}/</span>
                    <span className="text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl mb-4 tracking-tight">{s.title}</h3>
                    <p className="text-muted-foreground max-w-[36ch] leading-relaxed">{s.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border bg-card/60">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="font-mono text-[10px] uppercase text-accent tracking-widest">
                Why Six Harmony
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl tracking-tighter leading-[0.95]">
                Six pillars.<br />
                <span className="font-serif italic text-accent">One harmony.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {pillars.map((p, i) => (
                <Reveal key={p} delay={i * 60}>
                  <li className="py-6 flex items-baseline gap-8 group">
                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest w-8 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-xl md:text-2xl tracking-tight group-hover:text-accent transition-colors duration-500">
                      {p}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="bg-foreground text-background py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <h2 className="text-4xl md:text-5xl tracking-tighter">Selected Works</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-background/60">
                2023 — 2025 · Auckland
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            <Reveal className="col-span-12 md:col-span-7" delay={0}>
              <figure>
                <div className="overflow-hidden">
                  <img
                    src={projectTitirangi}
                    alt="Black cedar pavilion in Titirangi native bush"
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover hover:scale-[1.03] transition-all duration-[1200ms] ease-[var(--ease-out-expo)]"
                  />
                </div>
                <figcaption className="mt-6">
                  <p className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Project 042 · Renovation
                  </p>
                  <h4 className="text-2xl mt-2">Black Cedar & Glass — Titirangi</h4>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="col-span-12 md:col-span-5 md:mt-32" delay={150}>
              <figure>
                <div className="overflow-hidden">
                  <img
                    src={projectPonsonby}
                    alt="Concrete kitchen island with brass tapware in Ponsonby villa"
                    width={1000}
                    height={1300}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover hover:scale-[1.03] transition-all duration-[1200ms] ease-[var(--ease-out-expo)]"
                  />
                </div>
                <figcaption className="mt-6">
                  <p className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Project 039 · Heritage Restoration
                  </p>
                  <h4 className="text-2xl mt-2">Industrial Refinement — Ponsonby</h4>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="col-span-12 md:col-span-6 md:col-start-4" delay={250}>
              <figure>
                <div className="overflow-hidden">
                  <img
                    src={projectParnell}
                    alt="Detail of seamless white oak joinery and plaster"
                    width={1000}
                    height={1300}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover hover:scale-[1.03] transition-all duration-[1200ms] ease-[var(--ease-out-expo)]"
                  />
                </div>
                <figcaption className="mt-6">
                  <p className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Project 047 · Interior Artistry
                  </p>
                  <h4 className="text-2xl mt-2">Oak & Plaster — Parnell</h4>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="font-mono text-[10px] uppercase text-accent tracking-widest">
              Testimonial · 01
            </span>
            <blockquote className="mt-8 font-serif italic text-3xl md:text-5xl leading-tight text-balance">
              “Six Harmony brought the precision of a master joiner to a complex
              commercial renovation. Clear, calm, and quietly excellent.”
            </blockquote>
            <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
              — Property Director, Hauraki Holdings
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 md:py-40 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4">
              Start the <span className="font-serif italic text-accent">dialogue.</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mt-6 mb-12">
              Tell us about your project. We respond to every brief within two working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@sixharmony.co.nz"
                className="inline-block bg-foreground text-background px-10 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-accent transition-colors"
              >
                Request a Quote
              </a>
              <a
                href="tel:+6493000600"
                className="inline-block border border-foreground px-10 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                +64 9 300 0600
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Six Harmony © {new Date().getFullYear()} — Tāmaki Makaurau / Auckland, Aotearoa
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
