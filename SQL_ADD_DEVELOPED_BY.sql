-- ============================================
-- AJOUTER LA COLONNE developed_by_text
-- ============================================
-- Exécutez ce script si vous ne voulez pas recréer toute la table
-- ============================================

-- Ajouter la colonne developed_by_text à la table social_links
ALTER TABLE social_links 
ADD COLUMN IF NOT EXISTS developed_by_text TEXT DEFAULT 'Développé avec ❤️';

-- Mettre à jour les lignes existantes avec la valeur par défaut
UPDATE social_links 
SET developed_by_text = 'Développé avec ❤️' 
WHERE developed_by_text IS NULL;

-- Vérifier que la colonne a été ajoutée
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'social_links' 
AND column_name = 'developed_by_text';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
