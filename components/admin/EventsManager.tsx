'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_url: string
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image_url: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.date) return

    try {
      const { error } = await supabase
        .from('events')
        .insert([formData])

      if (error) throw error
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        image_url: '',
      })
      fetchEvents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('events')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        image_url: '',
      })
      fetchEvents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchEvents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (event: Event) => {
    setEditingId(event.id)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      image_url: event.image_url,
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
          {editingId ? 'Modifier' : 'Ajouter'} un Événement
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
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          required
        />

        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Lieu"
        />

        <input
          type="text"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="URL de l'image"
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
                setFormData({
                  title: '',
                  description: '',
                  date: '',
                  location: '',
                  image_url: '',
                })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Événements ({events.length})</h3>
        {events.map((event) => (
          <div key={event.id} className="bg-gray-700 p-4 rounded-lg flex gap-4">
            {event.image_url && (
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-600">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">{event.title}</h4>
              <p className="text-sm text-gray-300 mb-1">{event.description}</p>
              <p className="text-xs text-purple mb-1">
                📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => startEdit(event)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm"
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
