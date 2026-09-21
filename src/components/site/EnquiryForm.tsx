import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  company: z.string().trim().min(2, "Please enter your company.").max(150),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30),
  site: z.string().trim().min(3, "Please enter the site address or area.").max(250),
  services: z.string().trim().min(2, "Please select a service."),
  frequency: z.string().trim().min(2, "Please select a frequency."),
  startDate: z.string().trim().min(1, "Please choose a preferred start date."),
  details: z.string().trim().max(1500),
});

type Errors = Partial<Record<keyof z.infer<typeof enquirySchema>, string>>;

const fieldClass = "mt-2 w-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

export function EnquiryForm({ heading = "Request a free site assessment" }: { heading?: string }) {
  const [errors, setErrors] = useState<Errors>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
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
    const v = result.data;
    const subject = encodeURIComponent(`Free site assessment — ${v.company}`);
    const body = encodeURIComponent(
      `Name: ${v.name}\nCompany: ${v.company}\nEmail: ${v.email}\nPhone: ${v.phone}\nSite: ${v.site}\nServices: ${v.services}\nFrequency: ${v.frequency}\nPreferred start: ${v.startDate}\n\nSite details:\n${v.details || "Not supplied"}`,
    );
    window.location.href = `mailto:admin@sixharmony.co.nz?subject=${subject}&body=${body}`;
  }

  const error = (name: keyof Errors) => errors[name] ? <p className="mt-2 text-xs text-accent">{errors[name]}</p> : null;

  return (
    <section id="enquire" className="border-t border-border bg-card/50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Commercial enquiries</p>
          <h2 className="mt-5 text-4xl leading-none md:text-5xl">{heading}</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Tell us what the site needs. We’ll use these details to prepare the next conversation.</p>
          <p className="mt-6 text-sm"><a className="text-accent hover:text-foreground" href="mailto:admin@sixharmony.co.nz">admin@sixharmony.co.nz</a></p>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2 md:col-span-8">
          <label className="text-xs uppercase tracking-wider">Your name<input className={fieldClass} name="name" maxLength={100} autoComplete="name" />{error("name")}</label>
          <label className="text-xs uppercase tracking-wider">Company<input className={fieldClass} name="company" maxLength={150} autoComplete="organization" />{error("company")}</label>
          <label className="text-xs uppercase tracking-wider">Work email<input className={fieldClass} name="email" type="email" maxLength={255} autoComplete="email" />{error("email")}</label>
          <label className="text-xs uppercase tracking-wider">Phone<input className={fieldClass} name="phone" type="tel" maxLength={30} autoComplete="tel" />{error("phone")}</label>
          <label className="text-xs uppercase tracking-wider sm:col-span-2">Site address or area<input className={fieldClass} name="site" maxLength={250} autoComplete="street-address" />{error("site")}</label>
          <label className="text-xs uppercase tracking-wider">Services required<select className={fieldClass} name="services" defaultValue=""><option value="" disabled>Select a service</option><option>Commercial cleaning</option><option>Facilities management</option><option>Commercial property maintenance</option><option>Multiple services</option><option>Tender / procurement enquiry</option></select>{error("services")}</label>
          <label className="text-xs uppercase tracking-wider">Cleaning frequency<select className={fieldClass} name="frequency" defaultValue=""><option value="" disabled>Select frequency</option><option>Daily</option><option>Several times per week</option><option>Weekly</option><option>One-off / project</option><option>To be assessed</option><option>Not applicable</option></select>{error("frequency")}</label>
          <label className="text-xs uppercase tracking-wider">Preferred start date<input className={fieldClass} name="startDate" type="date" />{error("startDate")}</label>
          <label className="text-xs uppercase tracking-wider sm:col-span-2">Site details<textarea className={`${fieldClass} min-h-32 resize-y`} name="details" maxLength={1500} placeholder="Site size, access hours, current issues, tender deadline or other requirements" />{error("details")}</label>
          <div className="sm:col-span-2"><Button type="submit" size="lg" className="h-auto rounded-none px-8 py-4 text-xs uppercase tracking-[0.2em]">Prepare enquiry email</Button><p className="mt-3 text-xs text-muted-foreground">This opens your email app with the details ready to send.</p></div>
        </form>
      </div>
    </section>
  );
}
