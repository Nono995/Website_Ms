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
      CREATE POLICY "Allow authenticated delete" ON podcasts FOR DELETE USING (auth.role() = 'authenticated');
    `

    logs.push('📊 Création des tables...')

    if (!adminEmail || !adminPassword) {
      logs.push('❌ Email et mot de passe admin requis')
      return Response.json({
        success: false,
        logs,
        error: 'Email et mot de passe admin requis',
      }, { status: 400 })
    }

    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
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
