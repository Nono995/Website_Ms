import { createClient } from '@supabase/supabase-js'

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const results: string[] = []

  try {
    const biblicalVerses = [
      {
        text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point.",
        reference: 'Jean 3:16',
      },
      {
        text: 'Que la grâce du Seigneur Jésus-Christ, l\'amour de Dieu, et la communion du Saint-Esprit soient avec vous tous.',
        reference: '2 Corinthiens 13:13',
      },
      {
        text: 'Jésus dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.',
        reference: 'Jean 14:6',
      },
      {
        text: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse.',
        reference: 'Proverbes 3:5',
      },
    ]

    results.push('📖 Import des versets bibliques...')
    const { error: versesError } = await supabase
      .from('biblical_verses')
      .insert(biblicalVerses)
      .select()

    if (versesError) {
      if (versesError.message.includes('duplicate')) {
        results.push('⚠️ Versets déjà importés')
      } else {
        results.push(`❌ Erreur versets: ${versesError.message}`)
      }
    } else {
      results.push(`✅ ${biblicalVerses.length} versets importés`)
    }

    const events = [
      {
        title: 'Célébration de Noël',
        description: 'Une célébration spéciale de la naissance du Christ avec musique et festif',
        date: new Date('2024-12-15').toISOString(),
        location: 'Église Merci Saint-Esprit',
        image_url: '/images/img1.jpg',
      },
      {
        title: 'Concert de Chants Sacrés',
        description: 'Soirée musicale inspirante avec l\'orchestre de notre église',
        date: new Date('2024-12-22').toISOString(),
        location: 'Église Merci Saint-Esprit',
        image_url: '/images/img2.jpg',
      },
      {
        title: 'Retraite Spirituelle',
        description: 'Weekend de méditation et de croissance spirituelle en montagne',
        date: new Date('2025-01-05').toISOString(),
        location: 'Montagne',
        image_url: '/images/img3.jpg',
      },
      {
        title: 'Conférence Jeunesse',
        description: 'Rencontre des jeunes avec des orateurs inspirants',
        date: new Date('2025-01-20').toISOString(),
        location: 'Église Merci Saint-Esprit',
        image_url: '/images/img1.jpg',
      },
    ]

    results.push('📅 Import des événements...')
    const { error: eventsError } = await supabase
      .from('events')
      .insert(events)
      .select()

    if (eventsError) {
      if (eventsError.message.includes('duplicate')) {
        results.push('⚠️ Événements déjà importés')
      } else {
        results.push(`❌ Erreur événements: ${eventsError.message}`)
      }
    } else {
      results.push(`✅ ${events.length} événements importés`)
    }

    const images = [
      {
        title: 'Église - Vue principale',
        url: '/images/img1.jpg',
        section: 'hero',
        order_index: 1,
      },
      {
        title: 'Intérieur église',
        url: '/images/img2.jpg',
        section: 'gallery',
        order_index: 1,
      },
      {
        title: 'Communauté',
        url: '/images/img3.jpg',
        section: 'community',
        order_index: 1,
      },
      {
        title: 'Galerie 1',
        url: '/images/gallery-1.jpg',
        section: 'gallery',
        order_index: 2,
      },
      {
        title: 'Galerie 2',
        url: '/images/gallery-2.jpg',
        section: 'gallery',
        order_index: 3,
      },
      {
        title: 'Galerie 3',
        url: '/images/gallery-3.jpg',
        section: 'gallery',
        order_index: 4,
      },
      {
        title: 'Galerie 4',
        url: '/images/gallery-4.jpg',
        section: 'gallery',
        order_index: 5,
      },
    ]

    results.push('🖼️ Import des images...')
    const { error: imagesError } = await supabase
      .from('images')
      .insert(images)
      .select()

    if (imagesError) {
      if (imagesError.message.includes('duplicate')) {
        results.push('⚠️ Images déjà importées')
      } else {
        results.push(`❌ Erreur images: ${imagesError.message}`)
      }
    } else {
      results.push(`✅ ${images.length} images importées`)
    }

    const sections = [
      {
        section_name: 'about',
        title: 'À Propos',
        description: 'Découvrez notre église et nos valeurs',
        content:
          'Bienvenue à Merci Saint-Esprit Église. Notre mission est de servir Dieu avec foi et authenticité.',
      },
      {
        section_name: 'services',
        title: 'Services',
        description: 'Nos services religieux',
        content: 'Nous offrons plusieurs services chaque semaine pour accueillir notre communauté.',
      },
      {
        section_name: 'community',
        title: 'Communauté',
        description: 'Rejoignez notre famille spirituelle',
        content: 'Notre communauté est ouverte à tous ceux qui cherchent une connexion spirituelle.',
      },
    ]

    results.push('📋 Import des sections...')
    const { error: sectionsError } = await supabase
      .from('content_sections')
      .insert(sections)
      .select()

    if (sectionsError) {
      if (sectionsError.message.includes('duplicate')) {
        results.push('⚠️ Sections déjà importées')
      } else {
        results.push(`❌ Erreur sections: ${sectionsError.message}`)
      }
    } else {
      results.push(`✅ ${sections.length} sections importées`)
    }

    results.push('✅ Import complété!')

    return Response.json({
      success: true,
      results,
    })
  } catch (error) {
    results.push(`❌ Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`)
    return Response.json(
      {
        success: false,
        results,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    )
  }
}
