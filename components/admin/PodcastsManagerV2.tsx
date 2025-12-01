'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Podcast {
  id: string
  title: string
  description: string
  audio_url: string
}

export default function PodcastsManagerV2() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audio_url: '',
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
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

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (!file.type.startsWith('audio/')) {
        setError('Veuillez sélectionner un fichier audio')
        return
      }
      setAudioFile(file)
    }
  }

  const uploadAudio = async (file: File): Promise<string | null> => {
    try {
      const fileName = `podcast-${Date.now()}-${file.name}`
      const { error, data } = await supabase.storage
        .from('podcasts')
        .upload(fileName, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('podcasts')
        .getPublicUrl(fileName)

      return publicUrlData.publicUrl
    } catch (err) {
      setError(`Erreur upload: ${err instanceof Error ? err.message : 'Inconnue'}`)
      return null
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !audioFile) {
      setError('Titre et fichier audio requis')
      return
    }

    setUploading(true)
    try {
      const audioUrl = await uploadAudio(audioFile)
      if (!audioUrl) return

      const { error } = await supabase
        .from('podcasts')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            audio_url: audioUrl,
          },
        ])

      if (error) throw error
      setFormData({ title: '', description: '', audio_url: '' })
      setAudioFile(null)
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setUploading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    setUploading(true)
    try {
      let audioUrl = formData.audio_url

      if (audioFile) {
        audioUrl = await uploadAudio(audioFile)
        if (!audioUrl) return
      }

      const { error } = await supabase
        .from('podcasts')
        .update({
          title: formData.title,
          description: formData.description,
          audio_url: audioUrl,
        })
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ title: '', description: '', audio_url: '' })
      setAudioFile(null)
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setUploading(false)
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

        <div className="border-2 border-dashed border-gray-500 rounded-lg p-6">
          <label className="cursor-pointer block text-center">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="hidden"
            />
            <div className="text-gray-400">
              {audioFile ? (
                <>
                  <div className="text-green-400 font-semibold mb-1">✅ Fichier sélectionné</div>
                  <div className="text-sm">{audioFile.name}</div>
                </>
              ) : (
                <>
                  <div className="text-purple font-semibold mb-1">🎵 Clique pour charger un audio</div>
                  <div className="text-sm">MP3, WAV, M4A, etc.</div>
                </>
              )}
            </div>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-purple hover:bg-purple-dark disabled:opacity-50 px-6 py-2 rounded-lg font-semibold transition"
          >
            {uploading ? '⏳ Upload...' : editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setFormData({ title: '', description: '', audio_url: '' })
                setAudioFile(null)
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
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
              <audio controls className="w-full h-8">
                <source src={podcast.audio_url} type="audio/mpeg" />
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
