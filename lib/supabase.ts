// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,        // guarda la sesión del usuario
    autoRefreshToken: true,      // renueva tokens automáticamente
    detectSessionInUrl: false,   // necesario para apps móviles
  },
});

// 🔹 Prueba temporal (puedes borrarla luego)
console.log('✅ Conectado a Supabase:', supabaseUrl);
console.log('✅ Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
