export const siteUrl = "https://sixharmony.co.nz";
export const serviceAreas = ["Auckland", "Palmerston North", "Whanganui", "Rotorua", "Timaru", "Christchurch"];
export const serviceLinks = [
  { to: "/commercial-cleaning", label: "Commercial cleaning" },
  { to: "/facilities-management", label: "Facilities management" },
  { to: "/commercial-property-maintenance", label: "Commercial property maintenance" },
  { to: "/services", label: "All cleaning & maintenance services" },
] as const;
export const businessSchema = {
  "@context": "https://schema.org", "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${siteUrl}/#business`, name: "Six Harmony", url: siteUrl, email: "sales@sixharmony.co.nz",
  areaServed: serviceAreas.map(name => ({ "@type": "City", name })),
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Cleaning and property services", itemListElement: serviceLinks.map(service => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.label, url: `${siteUrl}${service.to}` } })) },
};
export type FAQ = { question: string; answer: string };
export function serviceStructuredData(name: string, path: string, description: string, faqs: FAQ[]) {
  return [
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name, description, url: `${siteUrl}${path}`, provider: { "@id": `${siteUrl}/#business` }, areaServed: serviceAreas.map(name => ({ "@type": "City", name })) }) },
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) },
  ];
}
