import { useState } from "react";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <a
          href="#enquire"
          className="shrink-0 inline-flex items-center bg-foreground text-background px-4 md:px-6 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.25em] font-medium hover:bg-accent transition-colors"
        >
          Free Site Assessment
        </a>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="mailto:admin@sixharmony.co.nz"
            className="hidden sm:block text-sm font-medium hover:text-accent transition-colors whitespace-nowrap"
          >
            admin@sixharmony.co.nz
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors ml-1 md:ml-3"
            aria-label="Close call to action bar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
