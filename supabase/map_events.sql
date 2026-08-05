-- Supabase SQL Schema for EventLocation Map Gallery
-- Table: map_events

CREATE TABLE IF NOT EXISTS public.map_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    city_name TEXT NOT NULL,
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    cover_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for spatial & city lookups
CREATE INDEX IF NOT EXISTS idx_map_events_city ON public.map_events(city_name);
CREATE INDEX IF NOT EXISTS idx_map_events_created ON public.map_events(created_at DESC);

-- Enable RLS
ALTER TABLE public.map_events ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public map events are viewable by everyone" 
ON public.map_events FOR SELECT 
USING (true);

-- Allow full management for service role / authenticated admins
CREATE POLICY "Admins can manage map events" 
ON public.map_events FOR ALL 
USING (true)
WITH CHECK (true);

-- Sample initial data
INSERT INTO public.map_events (event_name, city_name, latitude, longitude, cover_image, gallery_images, description, event_date)
VALUES
  (
    'Сватба на брега: Светлана & Димитър',
    'Созопол',
    42.4175,
    27.6958,
    '/media/gallery/Tezza_2025_07_07_170901960_1.webp',
    ARRAY[
      '/media/gallery/Tezza_2025_07_07_170901960_1.webp',
      '/media/gallery/Tezza_2025_07_13_155324686.webp',
      '/media/gallery/Tezza_2025_07_13_155326413.webp'
    ],
    'Незабравимо сватбено изживяване край морето в Созопол с Пощичка live memory lab.',
    '2026-08-14'
  ),
  (
    'DevTech Annual Tech Summit',
    'Бургас',
    42.5048,
    27.4626,
    '/media/gallery/Tezza_2025_07_07_152559638_1.webp',
    ARRAY[
      '/media/gallery/Tezza_2025_07_07_152559638_1.webp',
      '/media/gallery/Tezza_2025_07_13_155333570.webp'
    ],
    'Корпоративен брандинг и персонализирани подаръци за над 200 участници.',
    '2026-08-22'
  ),
  (
    'Юбилей 50г в Wave Resort',
    'Поморие',
    42.5583,
    27.6444,
    '/media/gallery/Tezza_2025_07_13_155331795.webp',
    ARRAY[
      '/media/gallery/Tezza_2025_07_13_155331795.webp',
      '/media/gallery/Tezza_2025_07_07_170901960_1.webp'
    ],
    'Елегантно стилно парти с картички от драсканици за гостите.',
    '2026-08-28'
  );
