'use client'


import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Member {
  id: string
  name: string
  role: string
  image_url: string
}

export default function Community() {
  const [communityMembers, setCommunityMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('community_members')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setCommunityMembers(data || [])
    } catch (err) {
      console.error('Erreur fetch community:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-light mb-4">Notre Communauté</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Rencontrez les visages chaleureux derrière Grace & Faith
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-light">Chargement...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {communityMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-secondary/30 cursor-pointer group">
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/80 group-hover:to-primary/90 transition-all duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-light mb-1">{member.name}</h3>
                    <p className="text-secondary font-semibold">{member.role}</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h4 className="text-lg font-bold text-light">{member.name}</h4>
                  <p className="text-secondary">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="bg-secondary text-primary font-bold px-8 py-4 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105">
            Rejoignez Notre Équipe
          </button>
        </motion.div>
      </div>
    </section>
  )
}
