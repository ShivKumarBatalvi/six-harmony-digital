import { useState } from "react";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-3 md:py-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <a href="#enquire" className="inline-flex items-center bg-foreground text-background px-3 md:px-6 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-[0.22em] font-medium hover:bg-accent transition-colors">Get a free quote</a>
          <a href="#enquire" className="inline-flex items-center border border-foreground/40 px-3 md:px-6 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-[0.22em] font-medium hover:border-accent hover:text-accent transition-colors">Book a site visit</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="mailto:sales@sixharmony.co.nz" className="hidden md:block text-sm font-medium hover:text-accent transition-colors">sales@sixharmony.co.nz</a>
          <button onClick={() => setIsVisible(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close call to action bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
