import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 md:py-7 flex justify-between items-center text-foreground pointer-events-none">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md -z-10" />
      <Link to="/" className="pointer-events-auto text-base md:text-lg font-medium uppercase">
        Six Harmony
      </Link>
      <div className="hidden lg:flex gap-7 text-[10px] uppercase tracking-[0.18em] font-medium pointer-events-auto">
        <Link to="/commercial-cleaning" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Cleaning</Link>
        <Link to="/facilities-management" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Facilities</Link>
        <Link to="/commercial-property-maintenance" activeProps={{ className: "text-accent" }} className="hover:text-accent transition-colors">Maintenance</Link>
        <a href="#enquire" className="hover:text-accent transition-colors">Free site assessment</a>
      </div>
      <a href="#enquire" className="pointer-events-auto border border-foreground/40 px-3 py-2 text-[9px] uppercase tracking-[0.14em] lg:hidden">Enquire</a>
    </nav>
  );
}
