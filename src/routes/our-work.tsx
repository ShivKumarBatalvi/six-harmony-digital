import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { Star } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import commercialCleaning from "@/assets/commercial-cleaning.jpg";
import facilitiesManagement from "@/assets/facilities-management.jpg";
import propertyMaintenance from "@/assets/property-maintenance.jpg";

const url = "https://sixharmony.co.nz/our-work";
export const Route = createFileRoute("/our-work")({
  head: () => ({ meta: [{ title: "Our Work & Client Reviews | Six Harmony" }, { name: "description", content: "Sites we manage, completed cleaning and maintenance work, before-and-after photos and reviews from Six Harmony clients." }, { property: "og:title", content: "Our Work & Reviews | Six Harmony" }, { property: "og:description", content: "See the sites we clean and maintain, and what our clients say." }, { property: "og:type", content: "website" }, { property: "og:url", content: url }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: url }] }),
  component: OurWork,
});

// Sample gallery — replace with approved site photos and details.
const sites = [
  { img: commercialCleaning, title: "Commercial office", tag: "Ongoing cleaning contract" },
  { img: facilitiesManagement, title: "Commercial property", tag: "Facilities management" },
  { img: propertyMaintenance, title: "Residential property", tag: "Property maintenance" },
];

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

  return <PageShell eyebrow="Our work · Sites we manage" title={<>Quality you<br /><span className="font-serif italic text-accent">can see.</span></>} intro="Residential and commercial properties we clean and maintain, ongoing contracts, before-and-after results and reviews from our clients.">
    <section className="px-6 py-20 md:px-10"><div className="mx-auto max-w-6xl"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Sites we manage</p><div className="mt-10 grid gap-6 md:grid-cols-3">{sites.map((s) => <figure key={s.title} className="group overflow-hidden border border-border"><img src={s.img} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /><figcaption className="p-5"><p className="font-mono text-[10px] uppercase tracking-wider text-accent">{s.tag}</p><p className="mt-2 text-xl">{s.title}</p></figcaption></figure>)}</div><p className="mt-6 text-sm text-muted-foreground">Approved site photos and contract examples coming soon.</p></div></section>

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
