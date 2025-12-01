# ✅ Checklist Setup Admin Panel Complet

## 🔧 ÉTAPE 1: Configuration Supabase (15 min)

### 1️⃣ Créer les 12 tables SQL

1. Va dans **Supabase Dashboard → SQL Editor**
2. Copie/colle le contenu de **`SQL_COMPLETE.sql`**
3. Clique **"Execute"** ✓

**Tables créées automatiquement:**
- biblical_verses
- content_sections
- images
- events
- podcasts
- short_videos
- page_headings
- features
- services
- testimonials
- community_members
- settings

### 2️⃣ Créer l'utilisateur admin

1. Va dans **Supabase Dashboard → Authentication → Users**
2. Clique **"Create New User"**
3. Email: `nonobrice441@gmail.com`
4. Password: `Gildas1995@@`
5. Clique **"Create User"** ✓

### 3️⃣ Créer les Storage Buckets

1. Va dans **Supabase Dashboard → Storage → Buckets**
2. Clique **"Create Bucket"**
3. **Bucket 1:**
   - Name: `podcasts`
   - Public: ✓ (cocher)
   - File size limit: 100 MB
   - Clique **"Create Bucket"** ✓

4. **Bucket 2:**
   - Name: `short-videos`
   - Public: ✓ (cocher)
   - File size limit: 500 MB
   - Clique **"Create Bucket"** ✓

## 🚀 ÉTAPE 2: Lancer l'Admin Panel (2 min)

```bash
cd /path/to/project
npm run dev
```

Accès: **http://localhost:3000/admin/login**

## 📋 ÉTAPE 3: Première Configuration (5 min)

### 1. Créer l'utilisateur admin (optionnel, si erreur)

1. Va à **http://localhost:3000/admin/setup**
2. Colle ta **Service Role Key** (de Supabase → Settings → API)
3. Clique **"🚀 Créer Utilisateur Admin"** ✓

### 2. Se connecter au dashboard

1. Va à **http://localhost:3000/admin/login**
2. Email: `nonobrice441@gmail.com`
3. Password: `Gildas1995@@`
4. Clique **"Se connecter"** ✓

### 3. Importer les contenus existants

1. Clique **"📥 Import Données"** ✓
2. Clique **"📥 Importer les données"**
3. Attends la confirmation ✓

## 🎯 ÉTAPE 4: Explorer le Dashboard (10 min)

### 📝 CONTENU TEXTE (8 managers)

- **📝 Titres & Descriptions** - Ajoute les titres de sections
- **⭐ Features** - Ajoute les 3 features About
- **🕒 Services** - Configure les services (horaires, etc)
- **👥 Équipe** - Ajoute les membres de la communauté
- **💬 Témoignages** - Ajoute les témoignages
- **📖 Versets Bibliques** - Gère les versets
- **📋 Sections** - Gère les contenus
- **⚙️ Paramètres** - Configure adresse, CTA, Footer

### 📁 MÉDIAS & RESSOURCES (4 managers)

- **🖼️ Images** - Gère les images par section
- **📅 Événements** - Crée des événements
- **🎵 Podcasts** - Upload des fichiers audio
- **🎬 Short Videos** - Upload des vidéos (30-40s max)

## ✨ TEST FINAL (15 min)

### Tester chaque manager:

```
✓ Headings: Ajouter "Hero Title"
✓ Features: Ajouter une feature
✓ Services: Ajouter un service
✓ Community: Ajouter un membre
✓ Testimonials: Ajouter un témoignage
✓ Biblical Verses: Vérifier l'import
✓ Settings: Configurer adresse
✓ Images: Vérifier les images importées
✓ Events: Vérifier les événements
✓ Podcasts: Upload un fichier audio
✓ Short Videos: Upload une vidéo (test 30-40s)
```

## 📊 RÉCAPITULATIF

| Étape | Tâche | Status | Temps |
|-------|-------|--------|-------|
| 1 | Créer 12 tables SQL | ⏳ | 2 min |
| 2 | Créer utilisateur admin | ⏳ | 1 min |
| 3 | Créer 2 buckets Storage | ⏳ | 2 min |
| 4 | Lancer npm run dev | ⏳ | 1 min |
| 5 | Login admin | ⏳ | 1 min |
| 6 | Import données existantes | ⏳ | 2 min |
| 7 | Tester tous les managers | ⏳ | 15 min |
| **TOTAL** | | | **24 min** |

## 🎉 BRAVO!

Ton admin panel est maintenant **100% fonctionnel** avec:
- ✅ 12 managers pour gérer tout le contenu
- ✅ Upload audio/vidéo automatique
- ✅ Validation durée vidéo (30-40s)
- ✅ Authentification sécurisée
- ✅ Interface dark theme
- ✅ Responsive design

## ⚠️ TROUBLESHOOTING

**"Erreur: Table inexistante"**
→ Exécute SQL_COMPLETE.sql dans Supabase SQL Editor

**"Erreur upload: Storage"**
→ Assure-toi que les 2 buckets sont créés et publics

**"Erreur login"**
→ Vérifie que l'utilisateur est créé dans Supabase Auth

**"Erreur durée vidéo"**
→ La vidéo doit faire entre 30-40 secondes exactement

## 📞 SUPPORT

Fichiers de référence:
- `SUPABASE_SETUP.md` - Configuration détaillée
- `STORAGE_SETUP.md` - Configuration Storage
- `ADMIN_PANEL_GUIDE.md` - Guide d'utilisation
- `SQL_COMPLETE.sql` - SQL complet à copier/coller

---

**Happy managing! 🚀**
