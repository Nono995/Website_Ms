-- ============================================
-- SUPABASE COMPLETE SQL SETUP
-- Pour le Admin Panel complet
-- ============================================

-- 1. VERSETS BIBLIQUES
CREATE TABLE IF NOT EXISTS biblical_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  reference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 2. SECTIONS DE CONTENU
CREATE TABLE IF NOT EXISTS content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  description TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 3. IMAGES
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  url TEXT NOT NULL,
  section VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- 4. ÉVÉNEMENTS
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 5. PODCASTS (AVEC STOCKAGE AUDIO)
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audio_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 6. SHORT VIDEOS (AVEC STOCKAGE VIDÉO)
CREATE TABLE IF NOT EXISTS short_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  creator VARCHAR(255),
  created_at TIMESTAMP DEFAULT now()
);

-- 7. PAGE HEADINGS (TITRES ET DESCRIPTIONS)
CREATE TABLE IF NOT EXISTS page_headings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 8. FEATURES (SECTION ABOUT)
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- 9. SERVICES (HORAIRES ET DESCRIPTION)
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- 10. TESTIMONIALS (TÉMOIGNAGES)
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- 11. COMMUNITY MEMBERS (ÉQUIPE)
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- 12. SETTINGS (CONFIGURATION GLOBALE)
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- DÉSACTIVER RLS POUR DEVELOPMENT
-- ============================================

ALTER TABLE biblical_verses DISABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE images DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts DISABLE ROW LEVEL SECURITY;
ALTER TABLE short_videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_headings DISABLE ROW LEVEL SECURITY;
ALTER TABLE features DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE community_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- VÉRIFICATION: Toutes les tables créées ✓
-- ============================================

-- Copie/colle ce fichier entièrement dans:
-- Supabase Dashboard → SQL Editor
-- Puis clique "Execute"
