'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, Music } from 'lucide-react'
import Logo from './Logo'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface SocialLinks {
  facebook_url: string
  instagram_url: string
  twitter_url: string
  youtube_url: string
  tiktok_url: string
  copyright_text: string
  developed_by_text: string
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null)

  useEffect(() => {
    fetchSocialLinks()
  }, [])

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .single()

      if (error) throw error
      setSocialLinks(data)
    } catch (err) {
      console.error('Erreur fetch social links:', err)
      // Valeurs par défaut
      setSocialLinks({
        facebook_url: '#',
        instagram_url: '#',
        twitter_url: '#',
        youtube_url: '#',
        tiktok_url: '#',
        copyright_text: 'Merci Saint-Esprit Église. Tous droits réservés.',
        developed_by_text: 'Développé avec ❤️'
      })
    }
  }

  return (
    <footer className="bg-primary text-light pt-12 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-light/20"
        >
          <Logo />
          
          <div className="flex gap-4">
            <a
              href={socialLinks?.facebook_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500/20 hover:bg-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={socialLinks?.instagram_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500/20 hover:bg-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socialLinks?.twitter_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500/20 hover:bg-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              title="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.868 6.75h-3.308l7.73-8.835L2.6 2.25h6.764l4.876 6.256 5.368-6.256zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={socialLinks?.youtube_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500/20 hover:bg-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              title="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href={socialLinks?.tiktok_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500/20 hover:bg-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              title="TikTok"
            >
              <Music size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="pt-8 text-center text-light/70 text-sm"
        >
          <p className="mb-2">© {currentYear} {socialLinks?.copyright_text || 'Merci Saint-Esprit Église. Tous droits réservés.'}</p>
          <p className="text-light/50">{socialLinks?.developed_by_text || 'Développé avec ❤️'}</p>
        </motion.div>
      </div>
    </footer>
  )
}
