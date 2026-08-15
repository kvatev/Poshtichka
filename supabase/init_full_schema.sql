-- =========================================================================
-- POSHTICHKA FULL SUPABASE DATABASE SCHEMA INITIALIZATION
-- =========================================================================

-- 1. Map Events Table
CREATE TABLE IF NOT EXISTS public.map_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    city_name TEXT NOT NULL,
    venue_name TEXT,
    event_type TEXT,
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    cover_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    image TEXT NOT NULL,
    badge_asset TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    role_or_event TEXT,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    quote TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Bookings Table
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
    status TEXT DEFAULT 'pending'
);

-- 6. Settings / General Content Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Cities Presets Table
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Event Types Presets Table
CREATE TABLE IF NOT EXISTS public.event_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS & Policies
ALTER TABLE public.map_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to avoid errors on multiple runs
DROP POLICY IF EXISTS "Public Read map_events" ON public.map_events;
DROP POLICY IF EXISTS "Public Manage map_events" ON public.map_events;
DROP POLICY IF EXISTS "Public Read services" ON public.services;
DROP POLICY IF EXISTS "Public Manage services" ON public.services;
DROP POLICY IF EXISTS "Public Read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Read faqs" ON public.faqs;
DROP POLICY IF EXISTS "Public Manage faqs" ON public.faqs;
DROP POLICY IF EXISTS "Public Manage bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public Read settings" ON public.settings;
DROP POLICY IF EXISTS "Public Manage settings" ON public.settings;
DROP POLICY IF EXISTS "Public Manage cities" ON public.cities;
DROP POLICY IF EXISTS "Public Manage event_types" ON public.event_types;

CREATE POLICY "Public Read map_events" ON public.map_events FOR SELECT USING (true);
CREATE POLICY "Public Manage map_events" ON public.map_events FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Manage services" ON public.services FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Manage testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public Manage faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Manage bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Manage settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Manage cities" ON public.cities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Manage event_types" ON public.event_types FOR ALL USING (true) WITH CHECK (true);
