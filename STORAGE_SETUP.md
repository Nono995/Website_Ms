# Configuration Supabase Storage

## Créer les Buckets

Va dans **Supabase Dashboard → Storage → Buckets** et crée 2 buckets:

### 1. Bucket: `podcasts`
- **Name**: podcasts
- **Public**: ✓ (pour les URLs publiques)
- **File size limit**: 100 MB

### 2. Bucket: `short-videos`
- **Name**: short-videos
- **Public**: ✓ (pour les URLs publiques)
- **File size limit**: 500 MB

## Configuration RLS (Optionnel pour development)

Si tu veux permettre les uploads anonymes:

```sql
-- Pour podcasts
CREATE POLICY "Public podcast uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'podcasts');

-- Pour short-videos
CREATE POLICY "Public video uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'short-videos');
```

## Résumé

Une fois configurés:
- ✅ Upload audio automatique vers `storage/podcasts/`
- ✅ Upload vidéo automatique vers `storage/short-videos/`
- ✅ URLs générées automatiquement dans l'admin panel
- ✅ Fichiers accessibles publiquement
