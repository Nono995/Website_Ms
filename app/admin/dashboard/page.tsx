'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { 
  FileText, Star, Clock, Users, MessageSquare, BookOpen, FileEdit, Settings, 
  Image, Calendar, Mic, Video, LogOut, Download, ArrowLeft, Sparkles, Zap,
  Navigation as NavIcon, Home, Mail, MapPin, Phone, Globe, Palette
} from 'lucide-react'
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
import HeroManager from '@/components/admin/HeroManager'
import FooterSocialManager from '@/components/admin/FooterSocialManager'
import ContactInfoManager from '@/components/admin/ContactInfoManager'
import GalleryManager from '@/components/admin/GalleryManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  const categories = [
    {
      id: 'hero',
      title: 'Page d\'Accueil',
      description: 'Hero, versets bibliques et slider',
      icon: Home,
      gradient: 'from-blue-500 to-cyan-600',
      items: [
        { id: 'hero-content', label: 'Contenu Hero', icon: Home, description: 'Texte d\'accueil, nom église, description, CTA' },
        { id: 'biblical-verses', label: 'Versets Bibliques (Slider)', icon: BookOpen, description: 'Slider de versets sur la page d\'accueil' },
        { id: 'headings', label: 'Titres & Descriptions', icon: FileText, description: 'Titres des sections principales' },
      ]
    },
    {
      id: 'about',
      title: 'À Propos',
      description: 'Section présentation de l\'église',
      icon: FileEdit,
      gradient: 'from-indigo-500 to-purple-600',
      items: [
        { id: 'features', label: 'Features (À Propos)', icon: Star, description: 'Les 3 features de la section À Propos' },
        { id: 'content-sections', label: 'Sections de Contenu', icon: FileEdit, description: 'Contenu texte des sections' },
      ]
    },
    {
      id: 'team',
      title: 'Équipe & Communauté',
      description: 'Membres de l\'équipe',
      icon: Users,
      gradient: 'from-pink-500 to-rose-600',
      items: [
        { id: 'community-members', label: 'Membres de l\'Équipe', icon: Users, description: 'Photos et rôles des membres' },
      ]
    },
    {
      id: 'services',
      title: 'Services & Horaires',
      description: 'Planning des services religieux',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-600',
      items: [
        { id: 'services', label: 'Services Religieux', icon: Clock, description: 'Horaires et descriptions des services' },
      ]
    },
    {
      id: 'events',
      title: 'Événements',
      description: 'Événements à venir',
      icon: Calendar,
      gradient: 'from-orange-500 to-amber-600',
      items: [
        { id: 'events', label: 'Événements à Venir', icon: Calendar, description: 'Gestion des événements spéciaux' },
      ]
    },
    {
      id: 'media',
      title: 'Médias',
      description: 'Podcasts et vidéos',
      icon: Mic,
      gradient: 'from-emerald-500 to-teal-600',
      items: [
        { id: 'podcasts', label: 'Podcasts & Audio', icon: Mic, description: 'Fichiers audio et podcasts' },
        { id: 'short-videos', label: 'Vidéos Courtes', icon: Video, description: 'Courtes vidéos inspirantes' },
      ]
    },
    {
      id: 'gallery',
      title: 'Galerie Photos',
      description: 'Images de la communauté',
      icon: Image,
      gradient: 'from-violet-500 to-purple-600',
      items: [
        { id: 'gallery-items', label: 'Items de la Galerie', icon: Image, description: 'Gestion des photos de la galerie' },
        { id: 'images', label: 'Upload d\'Images', icon: Image, description: 'Uploader de nouvelles images' },
      ]
    },
    {
      id: 'testimonials',
      title: 'Témoignages',
      description: 'Retours de la communauté',
      icon: MessageSquare,
      gradient: 'from-rose-500 to-pink-600',
      items: [
        { id: 'testimonials', label: 'Témoignages', icon: MessageSquare, description: 'Avis et témoignages des membres' },
      ]
    },
    {
      id: 'contact',
      title: 'Contact & Footer',
      description: 'Informations de contact',
      icon: Mail,
      gradient: 'from-cyan-500 to-blue-600',
      items: [
        { id: 'contact-info', label: 'Informations de Contact', icon: Phone, description: 'Adresse, téléphone, email' },
        { id: 'footer-social', label: 'Footer & Réseaux Sociaux', icon: Globe, description: 'Liens sociaux et copyright' },
        { id: 'settings', label: 'Paramètres Généraux', icon: Settings, description: 'Autres paramètres du site' },
      ]
    },
    {
      id: 'navigation',
      title: 'Navigation & Branding',
      description: 'Menu et identité visuelle',
      icon: NavIcon,
      gradient: 'from-slate-500 to-gray-600',
      items: [
        { id: 'settings', label: 'Logo & Navigation', icon: Globe, description: 'Logo, nom de l\'église, menu' },
      ]
    },
  ]

  const activeItem = categories.flatMap(c => c.items).find(i => i.id === activeTab)
  const activeCategory = categories.find(c => c.items.some(i => i.id === activeTab))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {activeTab && (
                <button onClick={() => setActiveTab(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {activeTab ? activeItem?.label : 'Admin Dashboard'}
                  </h1>
                  <p className="text-xs text-gray-500">Merci Saint-Esprit Église</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/admin/import"
                className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              >
                <Download size={16} />
                <span>Import</span>
              </a>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline text-sm text-gray-700 font-medium">
                  {userEmail.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {!activeTab ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full mb-4 border border-indigo-100">
                <Zap size={16} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">Gestion Complète du Site</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Dashboard Administrateur
              </h2>
              <p className="text-gray-600 text-lg">
                Gérez tous les éléments de votre site web en un seul endroit
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const CategoryIcon = category.icon
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
                          <CategoryIcon size={28} className="text-white" />
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-gray-700">
                            {category.items.length}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-sm text-gray-600 mb-6">{category.description}</p>
                      <div className="space-y-2">
                        {category.items.map((item) => {
                          const ItemIcon = item.icon
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className="w-full group"
                            >
                              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 transition-all text-left">
                                <ItemIcon size={16} className="text-gray-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                      {item.label}
                                    </span>
                                    <ArrowLeft size={14} className="text-gray-400 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                  </div>
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Vue d'ensemble du site</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-white/80 text-sm mb-1">Catégories</p>
                  <p className="text-4xl font-bold">{categories.length}</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Managers</p>
                  <p className="text-4xl font-bold">{categories.reduce((acc, cat) => acc + cat.items.length, 0)}</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Sections Site</p>
                  <p className="text-4xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Couverture</p>
                  <p className="text-4xl font-bold">100%</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {activeCategory && (
              <div className="mb-6">
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${activeCategory.gradient} bg-opacity-10 px-4 py-2 rounded-xl border border-gray-200`}>
                  <activeCategory.icon size={16} className="text-gray-700" />
                  <span className="text-sm font-semibold text-gray-700">{activeCategory.title}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-sm font-medium text-gray-600">{activeItem?.label}</span>
                </div>
                {activeItem?.description && (
                  <p className="text-sm text-gray-600 mt-2 ml-1">{activeItem.description}</p>
                )}
              </div>
            )}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
              {activeTab === 'hero-content' && <HeroManager />}
              {activeTab === 'headings' && <HeadingsManager />}
              {activeTab === 'features' && <FeaturesManager />}
              {activeTab === 'services' && <ServicesManager />}
              {activeTab === 'community-members' && <CommunityMembersManager />}
              {activeTab === 'testimonials' && <TestimonialsManager />}
              {activeTab === 'biblical-verses' && <BiblicalVersesManager />}
              {activeTab === 'content-sections' && <ContentSectionsManager />}
              {activeTab === 'settings' && <SettingsManager />}
              {activeTab === 'images' && <ImagesManager />}
              {activeTab === 'gallery-items' && <GalleryManager />}
              {activeTab === 'events' && <EventsManager />}
              {activeTab === 'podcasts' && <PodcastsManagerV2 />}
              {activeTab === 'short-videos' && <ShortVideosManager />}
              {activeTab === 'contact-info' && <ContactInfoManager />}
              {activeTab === 'footer-social' && <FooterSocialManager />}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
