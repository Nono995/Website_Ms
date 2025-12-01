'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Podcast {
  id: string
  title: string
  description: string
  audio_url: string
}

export default function PodcastsManager() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audio_url: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPodcasts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.audio_url) return

    try {
      const { error } = await supabase
        .from('podcasts')
        .insert([formData])

      if (error) throw error
      setFormData({ title: '', description: '', audio_url: '' })
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('podcasts')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ title: '', description: '', audio_url: '' })
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('podcasts')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (podcast: Podcast) => {
    setEditingId(podcast.id)
    setFormData({
      title: podcast.title,
      description: podcast.description,
      audio_url: podcast.audio_url,
    })
  }

  if (loading) return <div>Chargement...</div>

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg">{error}</div>
      )}

      <form
        onSubmit={editingId ? handleUpdate : handleAdd}
        className="bg-gray-700 p-6 rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-purple">
          {editingId ? 'Modifier' : 'Ajouter'} un Podcast
        </h2>

        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Titre"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Description"
          rows={4}
        />

        <input
          type="text"
          value={formData.audio_url}
          onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="URL du fichier audio"
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-purple hover:bg-purple-dark px-6 py-2 rounded-lg font-semibold transition"
          >
            {editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setFormData({ title: '', description: '', audio_url: '' })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Podcasts ({podcasts.length})</h3>
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <h4 className="font-bold text-white mb-2">{podcast.title}</h4>
              <p className="text-sm text-gray-300 mb-3">{podcast.description}</p>
              <audio controls className="w-full">
                <source src={podcast.audio_url} type="audio/mpeg" />
                Votre navigateur ne supporte pas la balise audio.
              </audio>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => startEdit(podcast)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(podcast.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
