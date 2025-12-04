'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, X, Edit } from 'lucide-react'

interface ContactInfo {
  id: string
  address: string
  city: string
  phone: string
  phone_hours: string
  email: string
  email_response_time: string
}

export default function ContactInfoManager() {
  const [content, setContent] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    address: '123 Rue de la Foi',
    city: 'Ville, Pays',
    phone: '+33 (0)1 23 45 67 89',
    phone_hours: 'Lun-Ven: 09:00-17:00',
    email: 'contact@graceAndFaith.fr',
    email_response_time: 'Réponse en 24h'
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
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
          .from('contact_info')
          .update(formData)
          .eq('id', content.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert([formData])
        
        if (error) throw error
      }

      await fetchContent()
      setEditing(false)
      alert('Informations de contact mises à jour!')
    } catch (err) {
      console.error('Erreur:', err)
      alert('Erreur lors de la sauvegarde')
    }
  }

  if (loading) return <div className="text-gray-400">Chargement...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Informations de Contact</h3>
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Adresse
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ville, Pays
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Horaires Téléphone
            </label>
            <input
              type="text"
              value={formData.phone_hours}
              onChange={(e) => setFormData({ ...formData, phone_hours: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Temps de Réponse Email
            </label>
            <input
              type="text"
              value={formData.email_response_time}
              onChange={(e) => setFormData({ ...formData, email_response_time: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
