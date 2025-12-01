# Configuration Supabase - Admin Panel

## Étape 1: Créer les tables

Va dans Supabase Dashboard → SQL Editor et exécute ces commandes:

```sql
-- Versets bibliques
CREATE TABLE IF NOT EXISTS biblical_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  reference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Sections
CREATE TABLE IF NOT EXISTS content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  description TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Images
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  url TEXT NOT NULL,
  section VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Événements
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Podcasts
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audio_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Short Videos
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

-- Page Headings (Titres/Descriptions sections)
CREATE TABLE IF NOT EXISTS page_headings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Features (About section)
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Services (Horaires services)
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Testimonials (Témoignages)
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

-- Community Members (Équipe)
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Settings (Localisation, CTA, Footer, etc)
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

## Étape 2: Configurer Row Level Security (RLS)

Va dans Supabase Dashboard → Authentication → Policies et active RLS sur toutes les tables, puis ajoute les politiques d'accès (optionnel pour development):

```sql
-- Optionnel: Désactiver RLS pour development
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
```

## Étape 3: Configurer l'authentification

- Va dans Authentication → Users
- Clique sur "Create user"
- Email: nonobrice441@gmail.com
- Password: Gildas1995@@

## Étape 4: Variables d'environnement

Les fichiers .env.local et lib/supabase.ts sont déjà configurés ✓

```
NEXT_PUBLIC_SUPABASE_URL=https://oxuxjsrdaafnycgsayqp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Étape 5: Configurer Storage Buckets

📍 Voir **STORAGE_SETUP.md** pour:
- Créer bucket `podcasts`
- Créer bucket `short-videos`
- Configurer les permissions publiques

## Étape 6: Utiliser le Admin Panel

1. Lancer l'app: `npm run dev`
2. Accéder à: `http://localhost:3000/admin/login`
3. Se connecter avec:
   - Email: nonobrice441@gmail.com
   - Password: Gildas1995@@
4. Gérer le contenu via le dashboard

## Étape 6: Packages (déjà installés)

✓ @supabase/supabase-js
✓ Tous les packages sont à jour

## Admin Panel Features (12 Managers)

### 📝 CONTENU TEXTE

**1️⃣ 📝 Titres & Descriptions**
- Gérer les titres et sous-titres de toutes les sections
- 10 pages: Hero, About, Services, Gallery, Events, Podcasts, Short Videos, Testimonials, Community, CTA

**2️⃣ ⭐ Features**
- Gérer les 3 features de la section About
- Titre, description, icône, ordre d'affichage

**3️⃣ 🕒 Services**
- Gérer les services (Dimanche, Mercredi, Jeudi, etc)
- Jour, heure, titre, description, ordre

**4️⃣ 👥 Équipe**
- Gérer les 6 membres de la communauté
- Nom, rôle, photo, ordre d'affichage

**5️⃣ 💬 Témoignages**
- Gérer les 4 témoignages
- Nom, rôle, texte, étoiles, photo, ordre

**6️⃣ 📖 Versets Bibliques**
- Gérer les versets bibliques du hero
- Texte, référence

**7️⃣ 📋 Sections de Contenu**
- Gérer les sections: About, Services, Community
- Titre, description, contenu

**8️⃣ ⚙️ Paramètres**
- Adresse église, URL carte
- CTA: titre, description, texte bouton
- Footer: texte, liens
- Téléphone, email

### 📁 MÉDIAS & RESSOURCES

**9️⃣ 🖼️ Images**
- Upload et gestion des images par section
- Organisation par ordre

**🔟 📅 Événements**
- Créer des événements avec date, lieu, image
- Gestion complète des événements

**1️⃣1️⃣ 🎵 Podcasts (avec Upload Audio)**
- Upload direct de fichiers audio (MP3, WAV, M4A, etc)
- Gestion des descriptions
- Stockage automatique dans Supabase Storage `podcasts/`

**1️⃣2️⃣ 🎬 Short Videos (avec Upload Vidéo)**
- Upload vidéos 30-40 secondes MAX
- Validation automatique de la durée
- Couverture/Thumbnail optionnelle
- Stockage automatique dans Supabase Storage `short-videos/`

## Structure des fichiers

```
app/
├── admin/
│   ├── layout.tsx
│   ├── page.tsx (redirect to login)
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── setup/
│   │   └── page.tsx
│   └── import/
│       └── page.tsx
├── api/
│   ├── setup-db/
│   │   └── route.ts
│   └── import-existing-data/
│       └── route.ts

components/
└── admin/
    ├── BiblicalVersesManager.tsx
    ├── ContentSectionsManager.tsx
    ├── ImagesManager.tsx
    ├── EventsManager.tsx
    ├── PodcastsManagerV2.tsx (avec upload audio)
    └── ShortVideosManager.tsx (avec upload vidéo)

lib/
└── supabase.ts

Storage Buckets:
├── podcasts/ (audio files)
└── short-videos/ (video files + thumbnails)
```
