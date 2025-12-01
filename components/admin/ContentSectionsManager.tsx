'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ContentSection {
  id: string
  section_name: string
  title: string
  description: string
  content: string
}

export default function ContentSectionsManager() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    section_name: '',
    title: '',
    description: '',
    content: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .order('section_name', { ascending: true })

      if (error) throw error
      setSections(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.section_name || !formData.title) return

    try {
      const { error } = await supabase
        .from('content_sections')
        .insert([formData])

      if (error) throw error
      setFormData({ section_name: '', title: '', description: '', content: '' })
      fetchSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !formData.title) return

    try {
      const { error } = await supabase
        .from('content_sections')
        .update({
          title: formData.title,
          description: formData.description,
          content: formData.content,
        })
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ section_name: '', title: '', description: '', content: '' })
      fetchSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('content_sections')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (section: ContentSection) => {
    setEditingId(section.id)
    setFormData({
      section_name: section.section_name,
      title: section.title,
      description: section.description,
      content: section.content,
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
          {editingId ? 'Modifier' : 'Ajouter'} une Section
        </h2>

        {!editingId && (
          <input
            type="text"
            value={formData.section_name}
            onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
            className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
            placeholder="Nom de la section (slug)"
            required
          />
        )}

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
          rows={3}
        />

        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Contenu"
          rows={4}
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
                setFormData({ section_name: '', title: '', description: '', content: '' })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Sections Existantes ({sections.length})</h3>
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="text-xs text-purple mb-1">{section.section_name}</p>
              <h4 className="font-bold text-white mb-1">{section.title}</h4>
              <p className="text-sm text-gray-400">{section.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(section)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(section.id)}
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
