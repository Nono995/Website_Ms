'use client'

import { useState } from 'react'

export default function SetupPage() {
  const [serviceRoleKey, setServiceRoleKey] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogs([])
    setLoading(true)

    try {
      if (!serviceRoleKey.trim()) {
        setLogs(['❌ Service Role Key requis'])
        return
      }

      setLogs(['🔍 Initialisation du setup...'])

      const response = await fetch('/api/setup-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceRoleKey,
          adminEmail,
          adminPassword,
        }),
      })

      const data = await response.json()

      if (data.logs) {
        setLogs(data.logs)
      }

      if (data.success) {
        setLogs((prev) => [...prev, '✅ Setup API complété!', '📋 Prochaine étape: Créer les tables'])
      } else {
        setLogs((prev) => [...prev, `❌ ${data.error}`])
      }
    } catch (error) {
      setLogs(['❌ Erreur: ' + (error instanceof Error ? error.message : 'Inconnue')])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-purple">Setup Admin Panel</h1>
        <p className="text-gray-400 mb-8">Initialise Supabase avec les tables et l'utilisateur admin</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <form onSubmit={handleSetup} className="bg-gray-800 rounded-lg p-6 space-y-4 border border-gray-700">
            <h2 className="text-xl font-bold text-purple mb-4">Étape 1: Données</h2>

            <div>
              <label className="block text-sm font-semibold mb-2">Service Role Key *</label>
              <textarea
                value={serviceRoleKey}
                onChange={(e) => setServiceRoleKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-purple text-xs font-mono"
                rows={5}
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                📍 Supabase Dashboard → Settings → API → Service Role Secret
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Admin</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-purple"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mot de passe Admin</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-purple"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple hover:bg-purple-dark disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? '⏳ Traitement...' : '🚀 1. Créer Utilisateur Admin'}
            </button>
          </form>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-purple mb-4">Étape 2: Logs</h2>
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

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-blue-400 mb-4">📋 Étape 3: Créer les Tables Manuellement</h3>
          <p className="text-sm mb-4 text-gray-300">
            Après avoir cliqué sur le bouton ci-dessus, va dans Supabase Dashboard et crée les tables:
          </p>
          <details className="text-xs">
            <summary className="cursor-pointer text-blue-400 font-semibold mb-2">➕ Copier/Coller le SQL</summary>
            <pre className="bg-gray-900 p-3 rounded mt-2 overflow-x-auto text-gray-300">
{`CREATE TABLE IF NOT EXISTS biblical_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  reference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  description TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  url TEXT NOT NULL,
  section VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audio_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE biblical_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON biblical_verses FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON biblical_verses FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON biblical_verses FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON biblical_verses FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read" ON content_sections FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON content_sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON content_sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON content_sections FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read" ON images FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON events FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read" ON podcasts FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON podcasts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON podcasts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON podcasts FOR DELETE USING (auth.role() = 'authenticated');`}
            </pre>
          </details>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple/10 border border-purple/50 rounded-lg p-4">
            <h3 className="font-bold text-purple mb-2">1️⃣ Service Role Key</h3>
            <p className="text-sm text-gray-400">Colle ta clé service role Supabase</p>
          </div>
          <div className="bg-purple/10 border border-purple/50 rounded-lg p-4">
            <h3 className="font-bold text-purple mb-2">2️⃣ Clique Bouton</h3>
            <p className="text-sm text-gray-400">Crée l'utilisateur admin automatiquement</p>
          </div>
          <div className="bg-purple/10 border border-purple/50 rounded-lg p-4">
            <h3 className="font-bold text-purple mb-2">3️⃣ Crée Tables</h3>
            <p className="text-sm text-gray-400">Copie/colle le SQL manuellement</p>
          </div>
        </div>
      </div>
    </div>
  )
}
