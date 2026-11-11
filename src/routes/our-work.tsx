import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { Star } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import img01 from "@/assets/wellesley-road-napier-01-corridor-window.webp.asset.json";
import img02 from "@/assets/wellesley-road-napier-02-corridor-doors.webp.asset.json";
import img03 from "@/assets/wellesley-road-napier-03-courtyard-garden.webp.asset.json";
import img04 from "@/assets/wellesley-road-napier-04-entry-lobby-stairs.webp.asset.json";
import img06 from "@/assets/wellesley-road-napier-06-entrance-matting.webp.asset.json";
import img07 from "@/assets/wellesley-road-napier-07-corridor-end.webp.asset.json";
import img08 from "@/assets/wellesley-road-napier-08-exterior-pathway.webp.asset.json";
import img10 from "@/assets/wellesley-road-napier-10-stairwell.webp.asset.json";
import img11 from "@/assets/wellesley-road-napier-11-street-frontage.webp.asset.json";
import img12 from "@/assets/wellesley-road-napier-12-stair-treads.webp.asset.json";

const url = "https://sixharmony.co.nz/our-work";
export const Route = createFileRoute("/our-work")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: "Our Work & Client Reviews | Six Harmony" }, { name: "description", content: "Real Six Harmony site work, including cleaning and site care at 124 Wellesley Road, Napier South. Share your experience or request a free quote." }, { property: "og:title", content: "Our Work & Reviews | Six Harmony" }, { property: "og:description", content: "Real Six Harmony site work at 124 Wellesley Road, Napier South, plus client reviews." }, { property: "og:type", content: "website" }, { property: "og:url", content: url }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: url }] }),
  component: OurWork,
});

type SitePhoto = { src: string; caption: string; width: number; height: number };
const photo = (asset: { url: string }, caption: string, width = 1200, height = 1600): SitePhoto => ({ src: asset.url, caption, width, height });

// 124 Wellesley Road, Napier South — real site photos. 05 and 09 to be added when supplied.
const sitePhotos: SitePhoto[] = [
  photo(img01, "Upper-level corridor"),
  photo(img02, "Corridor and service cupboards"),
  photo(img03, "Communal courtyard and planter beds"),
  photo(img04, "Entry lobby and stairs"),
  photo(img06, "Entrance matting", 900, 1200),
  photo(img07, "Corridor, upper floor"),
  photo(img08, "Exterior pathway and planting"),
  photo(img10, "Main stairwell"),
  photo(img11, "Street frontage"),
  photo(img12, "Stair treads and nosings"),
];
const altOf = (caption: string) => `${caption} at 124 Wellesley Road, Napier South`;

type Review = { id: string; name: string; location: string | null; rating: number; body: string };
const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  location: z.string().trim().max(100),
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(10, "Please write at least 10 characters.").max(1000),
});
const field = "mt-2 w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent";

function OurWork() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<SitePhoto | null>(null);
  useEffect(() => { supabase.from("reviews").select("id,name,location,rating,body").order("created_at", { ascending: false }).then(({ data }) => setReviews(data ?? [])); }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const r = reviewSchema.safeParse({ ...Object.fromEntries(new FormData(f).entries()), rating });
    if (!r.success) { setMsg(r.error.issues[0].message); return; }
    const { error } = await supabase.from("reviews").insert({ ...r.data, location: r.data.location || null });
    if (error) { setMsg("Something went wrong. Please try again."); return; }
    f.reset(); setRating(5); setMsg("Thank you! Your review will appear once it has been approved.");
  }

  return <PageShell heading="Our Commercial Cleaning & Maintenance Work" eyebrow="Our work · Sites we manage" title={<>Quality you<br /><span className="font-serif italic text-accent">can see.</span></>} intro="Residential and commercial properties we clean and maintain, ongoing contracts, before-and-after results and reviews from our clients.">
    <section className="px-6 py-20 md:px-10"><div className="mx-auto max-w-6xl"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Featured site</p><h2 className="mt-5 text-4xl">124 Wellesley Road, Napier South</h2><p className="mt-4 max-w-2xl text-muted-foreground">Cleaning and site care for a multi-level apartment building, covering corridors, stairwells, entrances, the courtyard and exterior areas.</p><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{sitePhotos.map((p) => <figure key={p.src} className="group overflow-hidden border border-border"><button type="button" onClick={() => setLightbox(p)} className="block w-full cursor-zoom-in overflow-hidden" aria-label={`View larger: ${altOf(p.caption)}`}><img src={p.src} alt={altOf(p.caption)} width={p.width} height={p.height} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></button><figcaption className="p-5"><p className="text-sm">{p.caption}</p></figcaption></figure>)}</div></div></section>

    <Dialog open={lightbox !== null} onOpenChange={(open) => { if (!open) setLightbox(null); }}>
      <DialogContent className="max-w-3xl border-border bg-background p-3 sm:rounded-none">
        <DialogTitle className="sr-only">{lightbox ? altOf(lightbox.caption) : "Site photo"}</DialogTitle>
        <DialogDescription className="sr-only">Enlarged site photo</DialogDescription>
        {lightbox && <img src={lightbox.src} alt={altOf(lightbox.caption)} width={lightbox.width} height={lightbox.height} className="max-h-[80vh] w-full object-contain" />}
        {lightbox && <p className="px-1 pb-1 text-sm text-muted-foreground">{lightbox.caption} — 124 Wellesley Road, Napier South</p>}
      </DialogContent>
    </Dialog>

    <section className="border-y border-border bg-card/60 px-6 py-20 md:px-10"><div className="mx-auto max-w-6xl"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Before & after</p><div className="mt-10 grid gap-6 md:grid-cols-2">{["Before", "After"].map((l) => <div key={l} className="flex aspect-[4/3] items-center justify-center border border-dashed border-border bg-background text-muted-foreground">{l} photo — coming soon</div>)}</div></div></section>

    <section className="px-6 py-24 md:px-10"><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12">
      <div className="md:col-span-7"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Client reviews</p><h2 className="mt-5 text-4xl">What our clients say.</h2>
        <div className="mt-10 space-y-6">{reviews.length === 0 ? <p className="text-muted-foreground">No reviews published yet — be the first to share your experience.</p> : reviews.map((r) => <blockquote key={r.id} className="border-l-2 border-accent pl-6"><div className="flex gap-1 text-accent">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><p className="mt-3 text-lg leading-relaxed">“{r.body}”</p><footer className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{r.name}{r.location ? ` · ${r.location}` : ""}</footer></blockquote>)}</div></div>
      <form onSubmit={submit} className="md:col-span-5 border border-border p-8"><h3 className="text-2xl">Leave a review</h3>
        <div className="mt-5 flex gap-1" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} aria-label={`${n} stars`} onClick={() => setRating(n)} className="text-accent"><Star size={22} fill={n <= rating ? "currentColor" : "none"} /></button>)}</div>
        <label className="mt-5 block text-xs uppercase tracking-wider">Name<input name="name" maxLength={100} className={field} /></label>
        <label className="mt-4 block text-xs uppercase tracking-wider">Suburb or company (optional)<input name="location" maxLength={100} className={field} /></label>
        <label className="mt-4 block text-xs uppercase tracking-wider">Your review<textarea name="body" maxLength={1000} className={`${field} min-h-28`} /></label>
        <Button type="submit" className="mt-6 rounded-none px-6 text-xs uppercase tracking-[0.18em]">Submit review</Button>
        {msg && <p className="mt-4 text-sm text-accent">{msg}</p>}
      </form>
    </div></section>
  </PageShell>;
}
