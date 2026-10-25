import { Link } from "@tanstack/react-router";

const links = [
  { to: "/services", label: "Services" },
  { to: "/commercial-cleaning", label: "Commercial" },
  { to: "/facilities-management", label: "Facilities" },
  { to: "/health-safety", label: "Health & Safety" },
  { to: "/our-work", label: "Our Work" },
] as const;

export function Nav() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 md:py-6 flex justify-between items-center text-foreground pointer-events-none">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md -z-10" />
      <Link to="/" className="pointer-events-auto text-base md:text-lg font-medium uppercase">Six Harmony</Link>
      <div className="hidden lg:flex items-center gap-6 text-[10px] uppercase tracking-[0.18em] font-medium pointer-events-auto">
        {links.map((l) => <Link key={l.to} to={l.to} activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">{l.label}</Link>)}
        <a href="#enquire" className="bg-foreground text-background px-4 py-2.5 hover:bg-accent transition-colors">Free quote</a>
      </div>
      <div className="flex items-center gap-2 lg:hidden pointer-events-auto">
        <Link to="/services" className="text-[9px] uppercase tracking-[0.14em] px-2">Services</Link>
        <a href="#enquire" className="border border-foreground/40 px-3 py-2 text-[9px] uppercase tracking-[0.14em]">Free quote</a>
      </div>
    </nav>
  );
}
