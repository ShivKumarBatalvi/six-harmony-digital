import { Link } from "@tanstack/react-router";
import { serviceAreas, serviceLinks } from "@/lib/seo";

export function SiteFooter() {
  return <footer className="border-t border-border px-6 py-10 md:px-10"><div className="mx-auto max-w-6xl space-y-6 text-[10px] uppercase tracking-wider text-muted-foreground">
    <div className="flex flex-col justify-between gap-5 md:flex-row"><p>Six Harmony © {new Date().getFullYear()} · Based in Auckland · <a href="mailto:sales@sixharmony.co.nz" className="hover:text-accent">sales@sixharmony.co.nz</a></p><nav aria-label="Footer pages" className="flex flex-wrap gap-5"><Link to="/" className="hover:text-accent">Home</Link><Link to="/health-safety" className="hover:text-accent">Health & Safety</Link><Link to="/our-work" className="hover:text-accent">Our Work</Link></nav></div>
    <nav aria-label="Footer services" className="flex flex-wrap gap-5">{serviceLinks.map(service => <Link key={service.to} to={service.to} className="hover:text-accent">{service.label}</Link>)}</nav>
    <nav aria-label="Locations served" className="flex flex-wrap gap-5">{serviceAreas.map(city => <Link key={city} to="/services" hash="locations" className="hover:text-accent">{city}</Link>)}</nav>
  </div></footer>;
}
