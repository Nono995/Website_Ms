-- ============================================
-- SQL COMPLET POUR L'ADMIN - TOUS LES MANAGERS
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor
-- ============================================

-- 1. HERO CONTENT (Page d'accueil)
-- Drop existing table if it exists with wrong structure
DROP TABLE IF EXISTS hero_content CASCADE;

CREATE TABLE hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  welcome_text TEXT DEFAULT 'Bienvenue',
  church_name TEXT DEFAULT 'Merci Saint-Esprit',
  church_subtitle TEXT DEFAULT 'Église',
  description TEXT DEFAULT 'Une communauté accueillante où la foi, l''espérance et la charité se vivent au quotidien.',
  cta_text TEXT DEFAULT 'Nous Rejoindre',
  hero_image_url TEXT DEFAULT '/images/img5.jpg',
  members_count TEXT DEFAULT '500+',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default hero content
INSERT INTO hero_content (welcome_text, church_name, church_subtitle, description, cta_text, hero_image_url, members_count)
VALUES ('Bienvenue', 'Merci Saint-Esprit', 'Église', 'Une communauté accueillante où la foi, l''espérance et la charité se vivent au quotidien. Rejoignez-nous pour des services inspirants et une croissance spirituelle profonde.', 'Nous Rejoindre', '/images/img5.jpg', '500+');

-- 2. CONTACT INFO (Informations de contact)
DROP TABLE IF EXISTS contact_info CASCADE;

CREATE TABLE contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT DEFAULT '123 Rue de la Foi',
  city TEXT DEFAULT 'Ville, Pays',
  phone TEXT DEFAULT '+33 (0)1 23 45 67 89',
  phone_hours TEXT DEFAULT 'Lun-Ven: 09:00-17:00',
  email TEXT DEFAULT 'contact@graceAndFaith.fr',
  email_response_time TEXT DEFAULT 'Réponse en 24h',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default contact info
INSERT INTO contact_info (address, city, phone, phone_hours, email, email_response_time)
VALUES ('123 Rue de la Foi', 'Ville, Pays', '+33 (0)1 23 45 67 89', 'Lun-Ven: 09:00-17:00', 'contact@graceAndFaith.fr', 'Réponse en 24h');

-- 3. SOCIAL LINKS (Footer et réseaux sociaux)
DROP TABLE IF EXISTS social_links CASCADE;

CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facebook_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  youtube_url TEXT DEFAULT '',
  tiktok_url TEXT DEFAULT '',
  copyright_text TEXT DEFAULT 'Merci Saint-Esprit Église. Tous droits réservés.',
  developed_by_text TEXT DEFAULT 'Développé avec ❤️',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default social links
INSERT INTO social_links (facebook_url, instagram_url, twitter_url, youtube_url, tiktok_url, copyright_text, developed_by_text)
VALUES ('', '', '', '', '', 'Merci Saint-Esprit Église. Tous droits réservés.', 'Développé avec ❤️');

-- 4. GALLERY ITEMS (Items de la galerie)
DROP TABLE IF EXISTS gallery_items CASCADE;

CREATE TABLE gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  attendees INTEGER DEFAULT 0,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default gallery items
INSERT INTO gallery_items (title, category, date, attendees, image_url, order_index) VALUES
('Moment Spirituel', 'Culte', 'Décembre 2024', 250, '/images/img1.jpg', 0),
('Communion', 'Célébration', 'Novembre 2024', 180, '/images/img2.jpg', 1),
('Célébration', 'Événement', 'Octobre 2024', 320, '/images/img3.jpg', 2),
('Prière', 'Culte', 'Septembre 2024', 200, '/images/img1.jpg', 3),
('Enseignement', 'Formation', 'Août 2024', 150, '/images/img2.jpg', 4),
('Communauté', 'Rencontre', 'Juillet 2024', 280, '/images/img3.jpg', 5),
('Partage', 'Événement', 'Juin 2024', 190, '/images/img1.jpg', 6),
('Foi', 'Culte', 'Mai 2024', 220, '/images/img2.jpg', 7);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES - Allow authenticated users to manage
-- ============================================

-- Hero Content Policies
CREATE POLICY "Allow authenticated users to read hero_content"
  ON hero_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update hero_content"
  ON hero_content FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert hero_content"
  ON hero_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Contact Info Policies
CREATE POLICY "Allow authenticated users to read contact_info"
  ON contact_info FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update contact_info"
  ON contact_info FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert contact_info"
  ON contact_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Social Links Policies
CREATE POLICY "Allow authenticated users to read social_links"
  ON social_links FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update social_links"
  ON social_links FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert social_links"
  ON social_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Gallery Items Policies
CREATE POLICY "Allow authenticated users to read gallery_items"
  ON gallery_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert gallery_items"
  ON gallery_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update gallery_items"
  ON gallery_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete gallery_items"
  ON gallery_items FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- PUBLIC ACCESS POLICIES (for frontend)
-- ============================================

-- Allow public to read hero content
CREATE POLICY "Allow public to read hero_content"
  ON hero_content FOR SELECT
  TO anon
  USING (true);

-- Allow public to read contact info
CREATE POLICY "Allow public to read contact_info"
  ON contact_info FOR SELECT
  TO anon
  USING (true);

-- Allow public to read social links
CREATE POLICY "Allow public to read social_links"
  ON social_links FOR SELECT
  TO anon
  USING (true);

-- Allow public to read gallery items
CREATE POLICY "Allow public to read gallery_items"
  ON gallery_items FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- INDEXES for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_gallery_items_order ON gallery_items(order_index);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);

-- ============================================
-- TRIGGERS for updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICATION
-- ============================================

-- Vérifier que tout est créé
SELECT 'hero_content' as table_name, COUNT(*) as row_count FROM hero_content
UNION ALL
SELECT 'contact_info', COUNT(*) FROM contact_info
UNION ALL
SELECT 'social_links', COUNT(*) FROM social_links
UNION ALL
SELECT 'gallery_items', COUNT(*) FROM gallery_items;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Toutes les tables pour l'admin sont maintenant créées !
-- Vous pouvez maintenant utiliser tous les managers dans l'admin
-- ============================================
