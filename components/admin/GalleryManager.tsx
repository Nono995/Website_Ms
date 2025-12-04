'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Edit, Plus, Save, X } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  category: string
  date: string
  attendees: number
  image_url: string
  order_index: number
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Culte',
    date: '',
    attendees: 0,
    image_url: '',
    order_index: 0
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setItems(data || [])
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('gallery_items')
        .insert([formData])

      if (error) throw error
      setFormData({ title: '', category: 'Culte', date: '', attendees: 0, image_url: '', order_index: items.length })
      fetchItems()
      alert('Item ajouté!')
    } catch (err) {
      console.error('Erreur:', err)
      alert('Erreur lors de l\'ajout')
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update(formData)
        .eq('id', id)

      if (error) throw error
      setEditingId(null)
      fetchItems()
      alert('Item mis à jour!')
    } catch (err) {
      console.error('Erreur:', err)
      alert('Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet item?')) return
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchItems()
      alert('Item supprimé!')
    } catch (err) {
      console.error('Erreur:', err)
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) return <div className="text-gray-400">Chargement...</div>

  const categories = ['Culte', 'Célébration', 'Événement', 'Formation', 'Rencontre']

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Galerie Photos</h3>

      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h4 className="font-semibold text-gray-900">Ajouter un Item</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Date (ex: Décembre 2024)"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            placeholder="Participants"
            value={formData.attendees}
            onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
            required
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            placeholder="Ordre"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <input
          type="text"
          placeholder="URL de l'image"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6">
            {editingId === item.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-xl"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-xl"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl hover:bg-green-100"
                  >
                    <Save size={16} />
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-200"
                  >
                    <X size={16} />
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {item.category} • {item.date} • {item.attendees}+ participants
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.image_url}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(item.id)
                      setFormData(item)
                    }}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
