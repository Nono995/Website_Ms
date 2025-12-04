'use client'

import { motion } from 'framer-motion'
import { Heart, Gift } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ContactInfo {
  address: string
  city: string
  phone: string
  phone_hours: string
  email: string
  email_response_time: string
}

export default function CTA() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single()

      if (error) throw error
      setContactInfo(data)
    } catch (err) {
      console.error('Erreur fetch contact:', err)
      // Valeurs par défaut si erreur
      setContactInfo({
        address: '123 Rue de la Foi',
        city: 'Ville, Pays',
        phone: '+33 (0)1 23 45 67 89',
        phone_hours: 'Lun-Ven: 09:00-17:00',
        email: 'contact@graceAndFaith.fr',
        email_response_time: 'Réponse en 24h'
      })
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary/20 to-purple/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-150" />
              </div>
              <span className="text-light font-bold text-sm tracking-[0.2em] uppercase">
                Rejoignez-Nous
              </span>
            </div>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-light mb-8 leading-[1.1]">
            Prêt à Rejoindre{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-secondary via-purple to-secondary bg-clip-text text-transparent animate-gradient">
                Notre Communauté
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 5 100 2 150 5C200 8 250 3 298 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-secondary" />
              </svg>
            </span>
            <span className="text-secondary">?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-light/95 leading-relaxed max-w-2xl mx-auto">
            Que vous soyez à la recherche d'une{' '}
            <span className="relative inline-block">
              <span className="relative z-10 font-semibold text-white">communauté spirituelle</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-secondary/20 blur-sm" />
            </span>
            , d'un soutien ou simplement curieux, nous vous accueillons à bras ouverts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md border border-purple/30 rounded-2xl p-8 hover:border-purple/60 transition-all duration-300 cursor-pointer hover:scale-105 transform">
            <Heart className="w-12 h-12 text-purple mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-light mb-3 leading-tight">
              Rejoignez-Nous
            </h3>
            <p className="text-light/70 mb-6">
              Venez découvrir notre communauté accueillante et chaleureuse.
            </p>
            <a href="#services" className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 inline-block text-center">
              Planifier Ma Visite
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-purple/30 rounded-2xl p-8 hover:border-purple/60 transition-all duration-300 cursor-pointer hover:scale-105 transform">
            <Gift className="w-12 h-12 text-purple mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-light mb-3 leading-tight">
              Contribuer
            </h3>
            <p className="text-light/70 mb-6">
              Supportez notre mission et faites une différence dans nos communautés.
            </p>
            <a href="#contact" className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 inline-block text-center">
              Faire un Don
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md border border-purple/30 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary font-semibold text-xs tracking-[0.2em] uppercase">
                Contact
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-light">
              Contactez-Nous
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-light/70 text-sm mb-2">Adresse</p>
              <p className="text-light font-semibold">{contactInfo?.address || '123 Rue de la Foi'}</p>
              <p className="text-light/70">{contactInfo?.city || 'Ville, Pays'}</p>
            </div>
            <div>
              <p className="text-light/70 text-sm mb-2">Téléphone</p>
              <p className="text-light font-semibold">{contactInfo?.phone || '+33 (0)1 23 45 67 89'}</p>
              <p className="text-light/70">{contactInfo?.phone_hours || 'Lun-Ven: 09:00-17:00'}</p>
            </div>
            <div>
              <p className="text-light/70 text-sm mb-2">Email</p>
              <p className="text-light font-semibold">{contactInfo?.email || 'contact@graceAndFaith.fr'}</p>
              <p className="text-light/70">{contactInfo?.email_response_time || 'Réponse en 24h'}</p>
            </div>
          </div>

          <form className="mt-8 max-w-2xl mx-auto space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full bg-white/10 border border-light/30 rounded-lg px-4 py-3 text-light placeholder-light/50 focus:outline-none focus:border-purple transition-colors"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full bg-white/10 border border-light/30 rounded-lg px-4 py-3 text-light placeholder-light/50 focus:outline-none focus:border-purple transition-colors"
              />
            </div>
            <textarea
              placeholder="Votre message"
              rows={4}
              className="w-full bg-white/10 border border-light/30 rounded-lg px-4 py-3 text-light placeholder-light/50 focus:outline-none focus:border-purple transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
            >
              Envoyer le Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
