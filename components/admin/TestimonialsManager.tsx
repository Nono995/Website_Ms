'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  rating: number
  image_url: string
  order_index: number
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    image_url: '',
    order_index: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.text) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData])

      if (error) throw error
      setFormData({
        name: '',
        role: '',
        text: '',
        rating: 5,
        image_url: '',
        order_index: 0,
      })
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({
        name: '',
        role: '',
        text: '',
        rating: 5,
        image_url: '',
        order_index: 0,
      })
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      rating: testimonial.rating,
      image_url: testimonial.image_url,
      order_index: testimonial.order_index,
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
          {editingId ? 'Modifier' : 'Ajouter'} un Témoignage
        </h2>

        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Nom"
          required
        />

        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Rôle (ex: Membre depuis 3 ans)"
        />

        <textarea
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Témoignage"
          rows={4}
          required
        />

        <input
          type="text"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="URL de la photo (ex: /images/img1.jpg)"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {'⭐'.repeat(r)}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
            className="bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
            placeholder="Ordre"
          />
        </div>

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
                  name: '',
                  role: '',
                  text: '',
                  rating: 5,
                  image_url: '',
                  order_index: 0,
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
        <h3 className="text-lg font-bold">Témoignages ({testimonials.length})</h3>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-700 p-4 rounded-lg flex gap-4"
          >
            {testimonial.image_url && (
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-600">
                <Image
                  src={testimonial.image_url}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold text-white">{testimonial.name}</h4>
              <p className="text-xs text-purple mb-2">{testimonial.role}</p>
              <p className="text-sm text-gray-300 mb-2">"{testimonial.text}"</p>
              <p className="text-xs text-yellow-400">{'⭐'.repeat(testimonial.rating)}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => startEdit(testimonial)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
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
