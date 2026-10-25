import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const enquirySchema = z.object({
  enquiry_type: z.enum(["Free quote", "Free site visit"]),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  company: z.string().trim().max(150),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30),
  site: z.string().trim().min(3, "Please enter the property address or area.").max(250),
  service: z.string().trim().min(2, "Please select a service."),
  frequency: z.string().trim().min(2, "Please select a frequency."),
  preferred_date: z.string().trim().max(20),
  details: z.string().trim().max(1500),
});

type Errors = Partial<Record<keyof z.infer<typeof enquirySchema>, string>>;

const fieldClass = "mt-2 w-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

export function EnquiryForm({ heading = "Get a free quote or book a site visit" }: { heading?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState<"Free quote" | "Free site visit">("Free quote");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const values = { ...Object.fromEntries(new FormData(formEl).entries()), enquiry_type: type };
    const result = enquirySchema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    const v = result.data;
    const { error } = await supabase.from("enquiries").insert({ ...v, company: v.company || null, preferred_date: v.preferred_date || null, details: v.details || null });
    if (error) { setStatus("error"); return; }
    formEl.reset();
    setStatus("sent");
  }

  const error = (name: keyof Errors) => errors[name] ? <p className="mt-2 text-xs normal-case tracking-normal text-accent">{errors[name]}</p> : null;

  return (
    <section id="enquire" className="scroll-mt-24 border-t border-border bg-card/50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Free quotes · Free site visits</p>
          <h2 className="mt-5 text-4xl leading-none md:text-5xl">{heading}</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Competitive pricing, flexible schedules and packages tailored to your property. Tell us what you need and our sales team will be in touch.</p>
          <p className="mt-6 text-sm"><a className="text-accent hover:text-foreground" href="mailto:sales@sixharmony.co.nz">sales@sixharmony.co.nz</a></p>
        </div>
        {status === "sent" ? (
          <div className="flex flex-col items-start justify-center gap-4 border border-border bg-background p-10 md:col-span-8">
            <CheckCircle2 className="text-accent" size={32} />
            <h3 className="text-3xl">Thank you — we've received your request.</h3>
            <p className="text-muted-foreground">Our team will contact you to discuss your {type === "Free site visit" ? "site visit" : "quote"}.</p>
            <Button variant="outline" className="rounded-none" onClick={() => setStatus("idle")}>Send another enquiry</Button>
          </div>
        ) : (
        <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2 md:col-span-8">
          <div className="sm:col-span-2 grid grid-cols-2 gap-px border border-border bg-border" role="radiogroup" aria-label="Enquiry type">
            {(["Free quote", "Free site visit"] as const).map((t) => (
              <button type="button" role="radio" aria-checked={type === t} key={t} onClick={() => setType(t)} className={`px-4 py-4 text-xs uppercase tracking-[0.18em] transition-colors ${type === t ? "bg-accent text-accent-foreground" : "bg-background hover:text-accent"}`}>{t === "Free quote" ? "Get a free quote" : "Book a free site visit"}</button>
            ))}
          </div>
          <label className="text-xs uppercase tracking-wider">Your name<input className={fieldClass} name="name" maxLength={100} autoComplete="name" />{error("name")}</label>
          <label className="text-xs uppercase tracking-wider">Company (optional)<input className={fieldClass} name="company" maxLength={150} autoComplete="organization" /></label>
          <label className="text-xs uppercase tracking-wider">Email<input className={fieldClass} name="email" type="email" maxLength={255} autoComplete="email" />{error("email")}</label>
          <label className="text-xs uppercase tracking-wider">Phone<input className={fieldClass} name="phone" type="tel" maxLength={30} autoComplete="tel" />{error("phone")}</label>
          <label className="text-xs uppercase tracking-wider sm:col-span-2">Property address or area<input className={fieldClass} name="site" maxLength={250} autoComplete="street-address" />{error("site")}</label>
          <label className="text-xs uppercase tracking-wider">Service required<select className={fieldClass} name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Residential cleaning</option><option>Commercial cleaning</option><option>Regular cleaning (weekly / fortnightly / monthly)</option><option>Property maintenance</option><option>Other / custom package</option></select>{error("service")}</label>
          <label className="text-xs uppercase tracking-wider">How often?<select className={fieldClass} name="frequency" defaultValue=""><option value="" disabled>Select frequency</option><option>Daily</option><option>Weekly</option><option>Fortnightly</option><option>Monthly</option><option>One-off</option><option>Not sure yet</option></select>{error("frequency")}</label>
          <label className="text-xs uppercase tracking-wider sm:col-span-2">{type === "Free site visit" ? "Preferred visit date" : "Preferred start date"} (optional)<input className={fieldClass} name="preferred_date" type="date" /></label>
          <label className="text-xs uppercase tracking-wider sm:col-span-2">Details (optional)<textarea className={`${fieldClass} min-h-32 resize-y`} name="details" maxLength={1500} placeholder="Property size, access hours, specific requirements" /></label>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={status === "sending"} size="lg" className="h-auto rounded-none px-8 py-4 text-xs uppercase tracking-[0.2em]">{status === "sending" ? "Sending…" : type === "Free site visit" ? "Book my free site visit" : "Get my free quote"}</Button>
            {status === "error" && <p className="mt-3 text-sm text-accent">Something went wrong. Please try again or email sales@sixharmony.co.nz.</p>}
          </div>
        </form>
        )}
      </div>
    </section>
  );
}
