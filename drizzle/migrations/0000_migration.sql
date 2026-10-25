CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  enquiry_type text NOT NULL,
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text NOT NULL,
  site text NOT NULL,
  service text NOT NULL,
  frequency text NOT NULL,
  preferred_date text,
  details text
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) BETWEEN 2 AND 100 AND char_length(email) BETWEEN 5 AND 255 AND char_length(phone) BETWEEN 7 AND 30 AND char_length(coalesce(details,'')) <= 1500);

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  location text,
  rating int NOT NULL,
  body text NOT NULL,
  approved boolean NOT NULL DEFAULT false
);
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews are public" ON public.reviews FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Anyone can submit a review for approval" ON public.reviews FOR INSERT TO anon, authenticated
  WITH CHECK (approved = false AND rating BETWEEN 1 AND 5 AND char_length(name) BETWEEN 2 AND 100 AND char_length(body) BETWEEN 10 AND 1000);