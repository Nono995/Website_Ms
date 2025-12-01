'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BiblicalVersesManager from '@/components/admin/BiblicalVersesManager'
import ContentSectionsManager from '@/components/admin/ContentSectionsManager'
import ImagesManager from '@/components/admin/ImagesManager'
import EventsManager from '@/components/admin/EventsManager'
import PodcastsManagerV2 from '@/components/admin/PodcastsManagerV2'
import ShortVideosManager from '@/components/admin/ShortVideosManager'
import HeadingsManager from '@/components/admin/HeadingsManager'
import FeaturesManager from '@/components/admin/FeaturesManager'
import ServicesManager from '@/components/admin/ServicesManager'
import TestimonialsManager from '@/components/admin/TestimonialsManager'
import CommunityMembersManager from '@/components/admin/CommunityMembersManager'
import SettingsManager from '@/components/admin/SettingsManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('biblical-verses')
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      router.push('/admin/login')
      return
    }
    setUserEmail(user.email || '')
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'headings', label: '📝 Titres & Descriptions', category: 'Contenu' },
    { id: 'features', label: '⭐ Features', category: 'Contenu' },
    { id: 'services', label: '🕒 Services', category: 'Contenu' },
    { id: 'community-members', label: '👥 Équipe', category: 'Contenu' },
    { id: 'testimonials', label: '💬 Témoignages', category: 'Contenu' },
    { id: 'biblical-verses', label: '📖 Versets Bibliques', category: 'Contenu' },
    { id: 'content-sections', label: '📋 Sections', category: 'Contenu' },
    { id: 'settings', label: '⚙️ Paramètres', category: 'Contenu' },
    { id: 'images', label: '🖼️ Images', category: 'Médias' },
    { id: 'events', label: '📅 Événements', category: 'Médias' },
    { id: 'podcasts', label: '🎵 Podcasts', category: 'Médias' },
    { id: 'short-videos', label: '🎬 Short Videos', category: 'Médias' },
  ]

  const contentTabs = tabs.filter(t => t.category === 'Contenu')
  const mediaTabs = tabs.filter(t => t.category === 'Médias')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-purple/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <a
              href="/admin/import"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              📥 Import Données
            </a>
            <span className="text-gray-400 text-sm">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-sm font-bold text-purple mb-3">📝 CONTENU TEXTE</h2>
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 flex-wrap">
            {contentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm transition ${
                  activeTab === tab.id
                    ? 'bg-purple text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h2 className="text-sm font-bold text-purple mb-3">📁 MÉDIAS & RESSOURCES</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
            {mediaTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm transition ${
                  activeTab === tab.id
                    ? 'bg-purple text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          {activeTab === 'headings' && <HeadingsManager />}
          {activeTab === 'features' && <FeaturesManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'community-members' && <CommunityMembersManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'biblical-verses' && <BiblicalVersesManager />}
          {activeTab === 'content-sections' && <ContentSectionsManager />}
          {activeTab === 'settings' && <SettingsManager />}
          {activeTab === 'images' && <ImagesManager />}
          {activeTab === 'events' && <EventsManager />}
          {activeTab === 'podcasts' && <PodcastsManagerV2 />}
          {activeTab === 'short-videos' && <ShortVideosManager />}
        </div>
      </div>
    </div>
  )
}
