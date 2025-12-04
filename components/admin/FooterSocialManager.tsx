'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, X, Edit } from 'lucide-react'

interface SocialLinks {
  id: string
  facebook_url: string
  instagram_url: string
  twitter_url: string
  youtube_url: string
  tiktok_url: string
  copyright_text: string
  developed_by_text: string
}

export default function FooterSocialManager() {
  const [content, setContent] = useState<SocialLinks | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    youtube_url: '',
    tiktok_url: '',
    copyright_text: 'Merci Saint-Esprit Église. Tous droits réservés.',
    developed_by_text: 'Développé avec ❤️'
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setContent(data)
        setFormData(data)
      }
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // Préparer les données en s'assurant que developed_by_text existe
      const dataToSave = {
        ...formData,
        developed_by_text: formData.developed_by_text || 'Développé avec ❤️'
      }

      if (content) {
        const { error } = await supabase
          .from('social_links')
          .update(dataToSave)
          .eq('id', content.id)
        
        if (error) {
          console.error('Erreur détaillée:', error)
          throw error
        }
      } else {
        const { error } = await supabase
          .from('social_links')
          .insert([dataToSave])
        
        if (error) {
          console.error('Erreur détaillée:', error)
          throw error
        }
      }

      await fetchContent()
      setEditing(false)
      alert('Liens sociaux mis à jour!')
    } catch (err: any) {
      console.error('Erreur:', err)
      alert(`Erreur lors de la sauvegarde: ${err.message || 'Erreur inconnue'}`)
    }
  }

  if (loading) return <div className="text-gray-400">Chargement...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Footer & Réseaux Sociaux</h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Edit size={16} />
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl hover:bg-green-100 transition-colors"
            >
              <Save size={16} />
              Sauvegarder
            </button>
            <button
              onClick={() => {
                setEditing(false)
                if (content) setFormData(content)
              }}
              className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Facebook URL
          </label>
          <input
            type="url"
            value={formData.facebook_url}
            onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
            disabled={!editing}
            placeholder="https://facebook.com/votrepage"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Instagram URL
          </label>
          <input
            type="url"
            value={formData.instagram_url}
            onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
            disabled={!editing}
            placeholder="https://instagram.com/votrepage"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Twitter/X URL
          </label>
          <input
            type="url"
            value={formData.twitter_url}
            onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
            disabled={!editing}
            placeholder="https://twitter.com/votrepage"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={formData.youtube_url}
            onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
            disabled={!editing}
            placeholder="https://youtube.com/@votrepage"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            TikTok URL
          </label>
          <input
            type="url"
            value={formData.tiktok_url}
            onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
            disabled={!editing}
            placeholder="https://tiktok.com/@votrepage"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Texte Copyright
          </label>
          <input
            type="text"
            value={formData.copyright_text}
            onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Texte "Développé par"
          </label>
          <input
            type="text"
            value={formData.developed_by_text || ''}
            onChange={(e) => setFormData({ ...formData, developed_by_text: e.target.value })}
            disabled={!editing}
            placeholder="Développé avec ❤️"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Vous pouvez utiliser des emojis : ❤️ 💙 ✨ 🙏
          </p>
        </div>
      </div>
    </div>
  )
}
