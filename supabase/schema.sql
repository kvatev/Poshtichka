-- Schema definition for Poshtichka Supabase Database

-- 1. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_type TEXT NOT NULL,
    venue_location TEXT NOT NULL,
    guest_count INTEGER NOT NULL,
    preferred_contact TEXT DEFAULT 'phone',
    selected_products TEXT[],
    message TEXT,
    estimated_price NUMERIC,
    status TEXT DEFAULT 'pending' -- pending, confirmed, completed, cancelled
);

-- 2. Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- weddings, corporate, tattoos, postcards, private
    image_url TEXT NOT NULL,
    aspect_ratio TEXT DEFAULT 'portrait',
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name TEXT NOT NULL,
    role_or_event TEXT NOT NULL, -- e.g. "Сватба на Мария и Георги", "Корпоративно събитие"
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    quote TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 4. FAQ Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    display_order INTEGER DEFAULT 0
);

-- 5. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public read permissions for gallery, testimonials, faqs
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read FAQs" ON public.faqs FOR SELECT USING (true);

-- Public insert permissions for bookings
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);
