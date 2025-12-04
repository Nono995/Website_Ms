'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Edit, Save, X, Upload } from 'lucide-react'

interface HeroContent {
  id: string
  welcome_text: string
  church_name: string
  church_subtitle: string
  description: string
  cta_text: string
  hero_image_url: string
  members_count: string
}

export default function HeroManager() {
  const [content, setContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    welcome_text: 'Bienvenue',
    church_name: 'Merci Saint-Esprit',
    church_subtitle: 'Église',
    description: 'Une communauté accueillante où la foi, l\'espérance et la charité se vivent au quotidien.',
    cta_text: 'Nous Rejoindre',
    hero_image_url: '/images/img5.jpg',
    members_count: '500+'
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
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
      if (content) {
        const { error } = await supabase
          .from('hero_content')
          .update(formData)
          .eq('id', content.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('hero_content')
          .insert([formData])
        
        if (error) throw error
      }

      await fetchContent()
      setEditing(false)
      alert('Contenu Hero mis à jour!')
    } catch (err) {
      console.error('Erreur:', err)
      alert('Erreur lors de la sauvegarde')
    }
  }

  if (loading) return <div className="text-gray-400">Chargement...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Contenu Hero (Page d'Accueil)</h3>
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
            Texte de Bienvenue
          </label>
          <input
            type="text"
            value={formData.welcome_text}
            onChange={(e) => setFormData({ ...formData, welcome_text: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom de l'Église
            </label>
            <input
              type="text"
              value={formData.church_name}
              onChange={(e) => setFormData({ ...formData, church_name: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sous-titre
            </label>
            <input
              type="text"
              value={formData.church_subtitle}
              onChange={(e) => setFormData({ ...formData, church_subtitle: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={!editing}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Texte du Bouton CTA
            </label>
            <input
              type="text"
              value={formData.cta_text}
              onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de Membres
            </label>
            <input
              type="text"
              value={formData.members_count}
              onChange={(e) => setFormData({ ...formData, members_count: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL de l'Image Hero
          </label>
          <input
            type="text"
            value={formData.hero_image_url}
            onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
            disabled={!editing}
            placeholder="/images/img5.jpg"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Utilisez le gestionnaire d'images pour uploader une nouvelle image
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Les versets bibliques du slider se gèrent dans la section "Versets Bibliques"
        </p>
      </div>
    </div>
  )
}
