'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Heading {
  id: string
  page_name: string
  title: string
  description: string
}

const pages = [
  'hero',
  'about',
  'services',
  'gallery',
  'events',
  'podcasts',
  'short-videos',
  'testimonials',
  'community',
  'cta',
]

export default function HeadingsManager() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    page_name: '',
    title: '',
    description: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchHeadings()
  }, [])

  const fetchHeadings = async () => {
    try {
      const { data, error } = await supabase
        .from('page_headings')
        .select('*')
        .order('page_name', { ascending: true })

      if (error) throw error
      setHeadings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.page_name || !formData.title) return

    try {
      const { error } = await supabase
        .from('page_headings')
        .insert([formData])

      if (error) throw error
      setFormData({ page_name: '', title: '', description: '' })
      fetchHeadings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('page_headings')
        .update({
          title: formData.title,
          description: formData.description,
        })
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ page_name: '', title: '', description: '' })
      fetchHeadings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('page_headings')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchHeadings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (heading: Heading) => {
    setEditingId(heading.id)
    setFormData({
      page_name: heading.page_name,
      title: heading.title,
      description: heading.description,
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
          {editingId ? 'Modifier' : 'Ajouter'} un Titre de Section
        </h2>

        {!editingId && (
          <select
            value={formData.page_name}
            onChange={(e) => setFormData({ ...formData, page_name: e.target.value })}
            className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
            required
          >
            <option value="">Sélectionne une page</option>
            {pages.map((page) => (
              <option key={page} value={page}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Titre principal"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Sous-titre / Description"
          rows={3}
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
                setFormData({ page_name: '', title: '', description: '' })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Titres Existants ({headings.length})</h3>
        {headings.map((heading) => (
          <div
            key={heading.id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="text-xs text-purple mb-1 uppercase font-semibold">
                {heading.page_name}
              </p>
              <h4 className="font-bold text-white mb-1">{heading.title}</h4>
              <p className="text-sm text-gray-300">{heading.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(heading)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(heading.id)}
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
