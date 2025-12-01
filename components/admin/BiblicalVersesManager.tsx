'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface BiblicalVerse {
  id: string
  text: string
  reference: string
}

export default function BiblicalVersesManager() {
  const [verses, setVerses] = useState<BiblicalVerse[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ text: '', reference: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchVerses()
  }, [])

  const fetchVerses = async () => {
    try {
      const { data, error } = await supabase
        .from('biblical_verses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setVerses(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.text || !formData.reference) return

    try {
      const { error } = await supabase
        .from('biblical_verses')
        .insert([formData])

      if (error) throw error
      setFormData({ text: '', reference: '' })
      fetchVerses()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !formData.text || !formData.reference) return

    try {
      const { error } = await supabase
        .from('biblical_verses')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ text: '', reference: '' })
      fetchVerses()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('biblical_verses')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchVerses()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (verse: BiblicalVerse) => {
    setEditingId(verse.id)
    setFormData({ text: verse.text, reference: verse.reference })
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
          {editingId ? 'Modifier' : 'Ajouter'} un Verset
        </h2>

        <textarea
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Texte du verset"
          rows={4}
          required
        />

        <input
          type="text"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Référence (ex: Jean 3:16)"
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
                setFormData({ text: '', reference: '' })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Versets Existants ({verses.length})</h3>
        {verses.map((verse) => (
          <div
            key={verse.id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-300 mb-2">{verse.reference}</p>
              <p className="text-white">{verse.text}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(verse)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(verse.id)}
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
