import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { serviceAreas } from "@/lib/seo";
import { Reveal } from "@/components/site/Reveal";

const url = "https://sixharmony.co.nz/services";
export const Route = createFileRoute("/services")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: "Cleaning & Maintenance Services NZ | Six Harmony" }, { name: "description", content: "Office, commercial, residential, end-of-tenancy, deep cleaning and property maintenance across NZ. Competitive pricing, flexible schedules, custom packages." }, { property: "og:title", content: "Cleaning & Maintenance Services | Six Harmony" }, { property: "og:description", content: "Commercial and residential cleaning plus property maintenance, tailored to every client." }, { property: "og:type", content: "website" }, { property: "og:url", content: url }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: url }] }),
  component: Services,
});

const services = [
  ["Regular office & commercial cleaning", "Scheduled cleaning for offices, retail and commercial premises, delivered before, during or after business hours."],
  ["Residential & serviced apartment cleaning", "Reliable cleaning for homes, apartments and serviced accommodation, with consistent standards between stays."],
  ["Weekly, fortnightly & monthly packages", "Recurring cleaning plans set at the frequency that suits your property and budget."],
  ["One-off & deep cleaning", "Thorough top-to-bottom cleans for seasonal refreshes, events, inspections or neglected areas."],
  ["End-of-tenancy cleaning", "Detailed move-out cleans to help tenants, landlords and property managers prepare for handover."],
  ["House maintenance & property upkeep", "Practical repairs and regular upkeep that keep homes safe, tidy and well presented."],
  ["General property & facilities maintenance", "Planned and reactive maintenance for commercial sites, coordinated through one point of contact."],
  ["Bin collection & waste management", "Bin rotation, cleaning of bin areas and waste handling to keep sites hygienic and compliant."],
  ["Internal high dusting", "Safe removal of dust from beams, vents, light fittings and high surfaces that daily cleans miss."],
  ["Window & glass cleaning", "Streak-free internal and external glass, partitions, doors and shopfronts."],
  ["Kitchen, pantry & common-area cleaning", "Sanitised kitchens, staff rooms, lobbies, corridors and shared spaces."],
  ["Toilets, amenities & hygiene services", "Thorough cleaning, sanitising and restocking of bathrooms and washroom facilities."],
  ["Carpet & floor care", "Vacuuming, carpet cleaning, mopping, scrubbing and hard-floor maintenance."],
  ["Site & construction cleaning", "Builders' cleans, progressive cleans and final cleans ready for handover."],
  ["Educational facility cleaning", "Cleaning for schools, early-learning centres and training facilities, scheduled around class times."],
  ["Customised cleaning & maintenance packages", "Combine any of our services into a single package built around your requirements."],
];

function Services() {
  return <PageShell heading="Commercial Cleaning & Property Maintenance Services in NZ" eyebrow="Our cleaning services" title={<>Every space,<br /><span className="font-serif italic text-accent">properly cared for.</span></>} intro="From daily office cleaning to end-of-tenancy and property maintenance — residential and commercial services across New Zealand.">
    <section className="border-y border-border bg-card/60 px-6 py-10 md:px-10"><div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">{[["Competitive pricing", "Clear, fair quotes with no hidden extras."], ["Flexible schedules", "Daily, weekly, fortnightly, monthly or one-off."], ["Customised packages", "Built around each client's requirements."]].map(([t, b]) => <div key={t}><p className="text-2xl text-accent">{t}</p><p className="mt-2 text-muted-foreground">{b}</p></div>)}</div></section>
    <section id="locations" className="border-y border-border px-6 py-10 md:px-10"><div className="mx-auto max-w-6xl"><h2 className="text-2xl">Locations served</h2><p className="mt-4 leading-relaxed text-muted-foreground">{serviceAreas.join(" · ")}</p></div></section>
    <section className="px-6 py-24 md:px-10"><div className="mx-auto grid max-w-6xl border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">{services.map(([t, b], i) => <Reveal key={t} delay={(i % 3) * 60}><article className="h-full border-b border-r border-border p-8 transition-colors hover:bg-card"><span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span><h2 className="mt-8 text-xl">{t}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{b}</p></article></Reveal>)}</div></section>
  </PageShell>;
}
