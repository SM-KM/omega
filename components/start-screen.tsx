import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// Si tienes una función real de logout, impórtala aquí
// import { signOut } from '@/lib/auth'; // ejemplo

const PURPLE = '#8D04AC';

export default function StartScreen(): JSX.Element {
  const router = useRouter();

  // 👇 Cada vez que el usuario entra a esta pestaña, se ejecuta esta lógica
  useFocusEffect(
    React.useCallback(() => {
      console.log('👋 Cerrando sesión al volver al inicio...');
      // await signOut(); // aquí iría tu lógica real de logout (limpiar tokens, etc.)
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/omega_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>OMEGA</Text>

      {/* Botones */}
      <View style={styles.buttons}>
        <Pressable
          style={[styles.btn, styles.primary]}
          onPress={() => router.navigate('/login')}
        >
          <Text style={styles.btnText}>Log in</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.secondary]}
          onPress={() => router.navigate('/register')}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 100,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    top: -30,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'black',
    letterSpacing: 2,
    marginBottom: 16,
    top: -30,
  },
  buttons: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    height: 48, // Tamaño del botón
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    top: -40,
  },
  primary: {
    backgroundColor: PURPLE,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  secondary: {
    backgroundColor: PURPLE,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
