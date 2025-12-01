# Guide d'Utilisation - Admin Panel

## 🚀 Démarrage Rapide

### 1. Configuration Supabase (Une seule fois)

**Étape 1: Créer les tables**
- Copie/colle les commandes SQL de `SUPABASE_SETUP.md`
- Dans Supabase Dashboard → SQL Editor

**Étape 2: Créer l'utilisateur admin**
- Supabase Dashboard → Authentication → Users
- Email: `nonobrice441@gmail.com`
- Password: `Gildas1995@@`

**Étape 3: Configurer Storage**
- Supabase Dashboard → Storage → Buckets
- Crée 2 buckets: `podcasts` et `short-videos`
- Voir `STORAGE_SETUP.md` pour les détails

### 2. Initialiser l'App

```bash
npm run dev
```

Accès: `http://localhost:3000/admin/login`

### 3. Setup Admin Panel

1. Accède à `/admin/setup`
2. Colle ta **Service Role Key**
3. Clique "🚀 Créer Utilisateur Admin"
4. Crée les tables SQL (voir Étape 1)

### 4. Importer Contenus Existants

1. Se connecter au dashboard: `/admin/login`
2. Clique "📥 Import Données"
3. Clique "📥 Importer les données"
   - Importe 4 versets bibliques
   - Importe 4 événements
   - Importe 7 images
   - Importe 3 sections

## 📊 Managers Disponibles

### 1. 📖 Versets Bibliques
- **Ajouter**: Titre + Référence
- **Éditer**: Modifier le texte et la référence
- **Supprimer**: Supprime définitivement
- **Stockage**: Supabase `biblical_verses` table

### 2. 📋 Sections
- **Ajouter**: Nom slug + Titre + Description + Contenu
- **Éditer**: Modifier le contenu
- **Supprimer**: Supprime la section
- **Stockage**: Supabase `content_sections` table

### 3. 🖼️ Images
- **Ajouter**: URL (public/images/...) + Section + Ordre
- **Éditer**: Modifier les métadonnées
- **Supprimer**: Supprime la référence
- **Stockage**: Supabase `images` table (URLs locales)

### 4. 📅 Événements
- **Ajouter**: Titre + Description + Date/Heure + Lieu + Image
- **Éditer**: Modifier les détails
- **Supprimer**: Supprime l'événement
- **Stockage**: Supabase `events` table

### 5. 🎵 Podcasts (Upload Audio)
- **Ajouter**: 
  - Titre + Description
  - **Upload fichier audio** (MP3, WAV, M4A, etc)
  - Stocké automatiquement sur Supabase Storage
- **Éditer**: 
  - Modifier titre/description
  - Optionnel: Upload nouvel audio
- **Supprimer**: Supprime le podcast et le fichier
- **Stockage**: Supabase Storage `podcasts/` bucket

### 6. 🎬 Short Videos (Upload Vidéo Validé)
- **Ajouter**:
  - Titre + Description + Créateur
  - **Upload vidéo** (30-40 secondes MAX)
  - Validation de durée automatique ✓
  - Optionnel: Upload couverture/thumbnail
  - Stocké automatiquement sur Supabase Storage
- **Éditer**:
  - Modifier titre/description
  - Optionnel: Upload nouvelle vidéo
  - Optionnel: Nouvelle couverture
- **Supprimer**: Supprime la vidéo et les fichiers
- **Stockage**: Supabase Storage `short-videos/` bucket

## 🎥 Résumé des Uploads

| Type | Format | Taille Max | Lieu |
|------|--------|-----------|------|
| **Audio** | MP3, WAV, M4A | 100 MB | `storage/podcasts/` |
| **Vidéo** | MP4, WebM, OGG | 500 MB | `storage/short-videos/` |
| **Durée Vidéo** | - | 30-40s | Validé automatiquement |
| **Couverture** | JPG, PNG, WebP | 10 MB | `storage/short-videos/` |

## 🔍 Flux Complet

```
LOGIN (/admin/login)
    ↓
DASHBOARD (/admin/dashboard)
    ├── 📥 Import Données (première fois)
    ├── 📖 Versets → Ajouter/Éditer/Supprimer
    ├── 📋 Sections → Gérer contenu
    ├── 🖼️ Images → Organiser galerie
    ├── 📅 Événements → Planifier
    ├── 🎵 Podcasts → Upload audio
    └── 🎬 Short Videos → Upload vidéo (30-40s)
```

## ⚠️ Points Importants

### Podcasts
- Fichier audio requis pour ajouter
- Format supporté: MP3, WAV, M4A, etc
- Stocké dans Supabase Storage
- URL générée automatiquement

### Short Videos
- **IMPORTANT**: Vidéo doit durer 30-40 secondes
- Validation automatique de la durée
- Si durée < 30s ou > 40s → Erreur
- Couverture optionnelle mais recommandée
- Stocké dans Supabase Storage

### Sécurité
- Authentification requise
- Credentials admin: nonobrice441@gmail.com / Gildas1995@@
- RLS désactivé en development
- À activer en production

## 🛠️ Dépannage

### "Erreur: Table inexistante"
→ Crée les tables SQL (Étape 1 de Setup)

### "Erreur upload: Storage"
→ Crée les buckets `podcasts` et `short-videos`

### "Durée vidéo invalide"
→ Assure-toi que la vidéo fait 30-40 secondes exactement

### "Format audio non reconnu"
→ Utilise: MP3, WAV, M4A, FLAC

## 📁 Fichiers Importants

- `SUPABASE_SETUP.md` - Configuration base de données
- `STORAGE_SETUP.md` - Configuration Storage buckets
- `.env.local` - Credentials Supabase
- `app/admin/` - Pages admin
- `components/admin/` - Managers
- `lib/supabase.ts` - Client Supabase

## 🎯 Prochaines Étapes

1. ✅ Setup Supabase (tables + auth + storage)
2. ✅ Lancer `/admin/setup`
3. ✅ Importer contenus existants
4. ✅ Gérer tout depuis le dashboard
5. 🔄 Synchroniser avec le site frontend

---

**Questions?** Voir les fichiers de setup ou contacte l'équipe tech! 🚀
