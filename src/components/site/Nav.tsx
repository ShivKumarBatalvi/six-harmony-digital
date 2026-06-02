export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 md:py-8 flex justify-between items-end text-foreground pointer-events-none">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md -z-10" />
      <a href="#top" className="pointer-events-auto text-base md:text-lg font-medium tracking-tight uppercase">
        Six Harmony
      </a>
      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.25em] font-medium pointer-events-auto">
        <a href="#projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
        <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
        <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
      </div>
    </nav>
  );
}
