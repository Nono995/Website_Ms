'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Feature {
  id: string
  title: string
  description: string
  icon_name: string
  order_index: number
}

const icons = ['Heart', 'Users', 'BookOpen', 'Star', 'Zap', 'Award', 'Target', 'Smile']

export default function FeaturesManager() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'Heart',
    order_index: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setFeatures(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    try {
      const { error } = await supabase
        .from('features')
        .insert([formData])

      if (error) throw error
      setFormData({ title: '', description: '', icon_name: 'Heart', order_index: 0 })
      fetchFeatures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('features')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ title: '', description: '', icon_name: 'Heart', order_index: 0 })
      fetchFeatures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('features')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchFeatures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (feature: Feature) => {
    setEditingId(feature.id)
    setFormData({
      title: feature.title,
      description: feature.description,
      icon_name: feature.icon_name,
      order_index: feature.order_index,
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
          {editingId ? 'Modifier' : 'Ajouter'} une Feature
        </h2>

        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Titre (ex: Foi Authentique)"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Description"
          rows={3}
        />

        <select
          value={formData.icon_name}
          onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
        >
          {icons.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={formData.order_index}
          onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Ordre d'affichage"
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
                setFormData({ title: '', description: '', icon_name: 'Heart', order_index: 0 })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Features ({features.length})</h3>
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="text-xs text-purple mb-1">Ordre: {feature.order_index}</p>
              <h4 className="font-bold text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-300 mb-1">{feature.description}</p>
              <p className="text-xs text-gray-400">Icône: {feature.icon_name}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(feature)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(feature.id)}
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
