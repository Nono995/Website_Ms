'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Setting {
  id: string
  setting_key: string
  setting_value: string
  setting_type: string
}

const defaultSettings = [
  { key: 'location_address', label: 'Adresse', type: 'text' },
  { key: 'location_map_url', label: 'URL Carte', type: 'text' },
  { key: 'cta_title', label: 'CTA - Titre', type: 'text' },
  { key: 'cta_description', label: 'CTA - Description', type: 'textarea' },
  { key: 'cta_button_text', label: 'CTA - Texte Bouton', type: 'text' },
  { key: 'footer_text', label: 'Footer - Texte', type: 'textarea' },
  { key: 'footer_links', label: 'Footer - Liens (JSON)', type: 'textarea' },
  { key: 'phone', label: 'Téléphone', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
]

export default function SettingsManager() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    setting_key: '',
    setting_value: '',
    setting_type: 'text',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('setting_key', { ascending: true })

      if (error) throw error
      setSettings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.setting_key || !formData.setting_value) return

    try {
      const { error } = await supabase
        .from('settings')
        .insert([formData])

      if (error) throw error
      setFormData({ setting_key: '', setting_value: '', setting_type: 'text' })
      fetchSettings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('settings')
        .update({
          setting_value: formData.setting_value,
          setting_type: formData.setting_type,
        })
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ setting_key: '', setting_value: '', setting_type: 'text' })
      fetchSettings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('settings')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchSettings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (setting: Setting) => {
    setEditingId(setting.id)
    setFormData({
      setting_key: setting.setting_key,
      setting_value: setting.setting_value,
      setting_type: setting.setting_type,
    })
  }

  const getSetting = (key: string) => settings.find((s) => s.setting_key === key)

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
          {editingId ? 'Modifier' : 'Ajouter'} une Configuration
        </h2>

        {!editingId && (
          <select
            value={formData.setting_key}
            onChange={(e) => {
              const selected = defaultSettings.find((s) => s.key === e.target.value)
              setFormData({
                setting_key: e.target.value,
                setting_value: formData.setting_value,
                setting_type: selected?.type || 'text',
              })
            }}
            className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
            required
          >
            <option value="">Sélectionne un paramètre</option>
            {defaultSettings.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        )}

        {formData.setting_type === 'textarea' ? (
          <textarea
            value={formData.setting_value}
            onChange={(e) => setFormData({ ...formData, setting_value: e.target.value })}
            className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
            placeholder="Valeur"
            rows={4}
            required
          />
        ) : (
          <input
            type="text"
            value={formData.setting_value}
            onChange={(e) => setFormData({ ...formData, setting_value: e.target.value })}
            className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
            placeholder="Valeur"
            required
          />
        )}

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
                setFormData({ setting_key: '', setting_value: '', setting_type: 'text' })
              }}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">Paramètres Existants ({settings.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultSettings.map((setting) => {
            const found = getSetting(setting.key)
            return (
              <div key={setting.key} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-purple">{setting.label}</h4>
                  {found && (
                    <span className="text-xs bg-green-600 px-2 py-1 rounded">✓ Défini</span>
                  )}
                </div>

                {found ? (
                  <>
                    <div className="bg-gray-800 p-2 rounded text-sm text-gray-300 mb-3 break-words max-h-24 overflow-auto">
                      {found.setting_value}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(found)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Éditer
                      </button>
                      <button
                        onClick={() => handleDelete(found.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm italic">Non configuré</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
