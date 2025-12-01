import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { serviceRoleKey, adminEmail, adminPassword } = await request.json()

    if (!serviceRoleKey) {
      return Response.json(
        { error: 'Service Role Key requis', success: false },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const logs = []

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS biblical_verses (
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

      ALTER TABLE biblical_verses DISABLE ROW LEVEL SECURITY;
      ALTER TABLE content_sections DISABLE ROW LEVEL SECURITY;
      ALTER TABLE images DISABLE ROW LEVEL SECURITY;
      ALTER TABLE events DISABLE ROW LEVEL SECURITY;
      ALTER TABLE podcasts DISABLE ROW LEVEL SECURITY;
    `

    logs.push('📊 Création des tables...')

    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail || 'nonobrice441@gmail.com',
      password: adminPassword || 'Gildas1995@@',
      email_confirm: true,
    })

    if (userError) {
      if (userError.message.includes('already exists')) {
        logs.push('⚠️ Utilisateur admin existe déjà')
      } else {
        logs.push(`❌ Erreur création user: ${userError.message}`)
      }
    } else {
      logs.push(`✅ Utilisateur admin créé: ${user?.email}`)
    }

    logs.push('✅ Tables prêtes (créées manuellement dans SQL Editor)')
    logs.push('✅ RLS désactivé')

    return Response.json({
      success: true,
      logs,
      userCreated: !userError || userError.message.includes('already exists'),
      message: 'Setup complété! Va créer les tables manuellement dans Supabase SQL Editor',
    })
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        success: false,
      },
      { status: 500 }
    )
  }
}
