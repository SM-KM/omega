import { Stack } from 'expo-router';
import 'react-native-url-polyfill/auto'; // ← polyfill para URL
import '../lib/supabase'; // side-effect: inicializa el cliente y hace el console.log


export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,        // sin headers en general
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {/* Las rutas se crean por archivo en /app, no hace falta declararlas aquí */}
    </Stack>
  );
}

import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';

React.useEffect(() => {
  console.log('URL env:', process.env.EXPO_PUBLIC_SUPABASE_URL);
  supabase.auth.getSession().then(({ data }) => {
    console.log('Has session?', !!data.session);
  });
  // Prueba visual:
  Alert.alert('ENV', String(process.env.EXPO_PUBLIC_SUPABASE_URL));
}, []);