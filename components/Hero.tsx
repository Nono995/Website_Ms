'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const biblicalVerses = [
    { text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point.", reference: "Jean 3:16" },
    { text: "Que la grâce du Seigneur Jésus-Christ, l'amour de Dieu, et la communion du Saint-Esprit soient avec vous tous.", reference: "2 Corinthiens 13:13" },
    { text: "Jésus dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.", reference: "Jean 14:6" },
    { text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.", reference: "Proverbes 3:5" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % biblicalVerses.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [biblicalVerses.length])
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-light overflow-hidden"
    >
      <div className="absolute inset-0 lg:flex">
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-primary via-primary/90 to-accent" />
        
        <svg
          className="absolute hidden lg:block right-1/2 top-0 bottom-0 w-32 h-full text-light"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(4px 0 12px rgba(0,0,0,0.15))' }}
        >
          <polygon points="100,0 0,0 100,1000" fill="white" />
        </svg>

        <div className="absolute hidden lg:block inset-y-0 right-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-40 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen lg:h-screen flex flex-col lg:flex-row items-center py-8 lg:py-0">
        <motion.div
          className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 lg:pt-0 lg:py-0 flex flex-col justify-center items-center lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 lg:mb-3">
            <span className="inline-block text-rose-600 font-bold text-xs tracking-widest uppercase px-3 py-1 bg-rose-100 rounded-full border border-rose-300">
              ✨ Bienvenue
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-5 lg:mb-6 w-full">
            <div className="flex flex-col items-center lg:items-start gap-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
                Merci Saint-Esprit
              </h1>
              <div className="flex justify-center lg:justify-start w-full pl-[48%] sm:pl-[55%] lg:pl-[60%]">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-rose-500 mt-1">
                  Église
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-primary/70 mb-6 lg:mb-8 leading-relaxed max-w-lg text-center lg:text-left"
          >
            Une communauté accueillante où la foi, l'espérance et la charité se vivent au quotidien. Rejoignez-nous pour des services inspirants et une croissance spirituelle profonde.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hidden lg:flex flex-col sm:flex-row gap-6 justify-center lg:justify-start w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="bg-gradient-to-r from-secondary to-rose-500 text-primary font-bold text-lg px-10 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center shadow-lg"
            >
              Nous Rejoindre
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:block mt-3 lg:mt-12 text-sm text-primary/50 text-center lg:text-left">
            <p>Rejoignez notre communauté de plus de 500 membres</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-0 py-4 sm:py-6 lg:py-20 flex flex-col items-center justify-center relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full h-[380px] sm:h-[420px] sm:max-w-2xl lg:max-w-none lg:w-5/6 lg:h-[420px]">
            <Image
              src="/images/img5.jpg"
              alt="Merci Saint-Esprit Église"
              fill
              className="object-cover rounded-3xl relative z-10"
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/50 via-transparent to-transparent z-20" />
            
            <motion.div
              className="absolute -bottom-6 left-0 right-0 mx-auto w-11/12 bg-gradient-to-r from-primary/95 to-primary/90 rounded-xl p-3 shadow-lg backdrop-blur-sm border border-primary/20 z-30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative flex items-center">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <p className="text-light text-xs sm:text-sm font-light italic mb-1 leading-snug">
                    "{biblicalVerses[currentSlide].text}"
                  </p>
                  <p className="text-rose-200 text-xs font-semibold">
                    — {biblicalVerses[currentSlide].reference}
                  </p>
                </motion.div>
              </div>

              <div className="flex justify-center gap-1.5 mt-2">
                {biblicalVerses.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-rose-400 w-4'
                        : 'bg-light/40 w-1.5 hover:bg-light/60'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
            
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10 hidden lg:block" />
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:hidden flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto mt-8"
          >
            <a
              href="#contact"
              className="bg-gradient-to-r from-secondary to-rose-500 text-primary font-bold text-lg px-10 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center shadow-lg"
            >
              Nous Rejoindre
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:hidden mt-4 text-sm text-primary/50 text-center">
            <p>Rejoignez notre communauté de plus de 500 membres</p>
          </motion.div>
        </motion.div>
      </div>



      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-secondary" />
      </motion.div>
    </section>
  )
}
