'use client'


import { motion } from 'framer-motion'
import { Clock, MapPin, Users, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Service {
  id: string
  day: string
  time: string
  title: string
  description: string
}

interface PageHeading {
  id: string
  title: string
  description: string
}

interface Settings {
  setting_key: string
  setting_value: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [servicesHeading, setServicesHeading] = useState<PageHeading | null>(null)
  const [location, setLocation] = useState('123 Rue de la Foi, Ville, Pays')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'services')
        .single()

      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .eq('setting_key', 'location_address')
        .single()

      if (servicesError) throw servicesError
      if (headingError && headingError.code !== 'PGRST116') throw headingError
      if (settingsError && settingsError.code !== 'PGRST116') console.warn('Settings non trouvés')

      setServices(servicesData || [])
      setServicesHeading(headingData || null)
      if (settingsData) setLocation(settingsData.setting_value)
    } catch (err) {
      console.error('Erreur fetch services:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="services" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-4">{servicesHeading?.title || 'Nos Services'}</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            {servicesHeading?.description || 'Différents services pour différents besoins spirituels'}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-primary">Chargement...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-secondary"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="text-sm font-semibold text-primary/70">{service.day}</p>
                    <p className="text-lg font-bold text-secondary">{service.time}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-primary/60 leading-relaxed">{service.description}</p>
                <a href="#contact" className="mt-6 w-full bg-secondary/10 text-secondary font-semibold py-2 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300 inline-block text-center">
                  En savoir plus
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center text-light"
        >
          <h3 className="text-3xl font-bold mb-4">Localisation</h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-secondary" />
            <p className="text-lg">{location}</p>
          </div>
          <button className="bg-secondary text-primary font-bold px-8 py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 mt-4">
            Voir sur la carte
          </button>
        </motion.div>
      </div>
    </section>
  )
}
