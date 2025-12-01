'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ImportPage() {
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [authorized, setAuthorized] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/admin/login')
    } else {
      setAuthorized(true)
    }
    setCheckingAuth(false)
  }

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg])
  }

  const handleImport = async () => {
    setLogs([])
    setLoading(true)
    addLog('🚀 Démarrage de l\'import...')

    try {
      const response = await fetch('/api/import-existing-data', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.results) {
        data.results.forEach((log: string) => addLog(log))
      }

      if (data.success) {
        addLog('✅ Import terminé! Retour au dashboard...')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 2000)
      } else {
        addLog(`❌ Erreur: ${data.error}`)
      }
    } catch (error) {
      addLog(`❌ Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`)
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Vérification...
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-purple">Import de Données</h1>
        <p className="text-gray-400 mb-8">Importe les contenus existants du site dans Supabase</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-purple mb-6">À importer:</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-purple">✓</span>
                <span>
                  <strong>4 Versets bibliques</strong>
                  <p className="text-sm text-gray-400">Du composant Hero</p>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple">✓</span>
                <span>
                  <strong>4 Événements</strong>
                  <p className="text-sm text-gray-400">Célébrations et conférences</p>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple">✓</span>
                <span>
                  <strong>7 Images</strong>
                  <p className="text-sm text-gray-400">Galerie et sections</p>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple">✓</span>
                <span>
                  <strong>3 Sections</strong>
                  <p className="text-sm text-gray-400">About, Services, Community</p>
                </span>
              </li>
            </ul>

            <button
              onClick={handleImport}
              disabled={loading}
              className="w-full bg-purple hover:bg-purple-dark disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? '⏳ Import en cours...' : '📥 Importer les données'}
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-purple mb-4">Logs</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <p className="text-gray-500">Les logs apparaîtront ici...</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="bg-gray-700 p-2 rounded text-gray-300">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-900/30 border border-blue-700 rounded-lg p-6">
          <p className="text-sm text-blue-300">
            💡 Après l'import, tu pourras modifier tous ces contenus directement dans le dashboard
          </p>
        </div>
      </div>
    </div>
  )
}
