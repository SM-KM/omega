import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase';

const PURPLE = '#8D04AC';
const PURPLE_DARK = '#5A0071';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (loading) return;
    if (!email.includes('@') || password.length < 6) {
      Alert.alert('Invalid data', 'Enter a valid email and a password with at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Sign-up error', error.message);
    } else {
      Alert.alert('Account created', 'You can now sign in.', [
        { text: 'Go to login', onPress: () => router.push('/login') },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable style={styles.backBtn} onPress={() => router.push('/')}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ ...styles.scroll, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          <Image source={require('../assets/images/omega_logo.png')} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Enter your email and password to register.</Text>

          <View style={styles.form}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <Pressable style={{ width: '100%' }} onPress={handleRegister}>
            <LinearGradient colors={[PURPLE, PURPLE_DARK]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cta}>
              <Text style={styles.ctaText}>{loading ? 'Creating…' : 'Continue'}</Text>
            </LinearGradient>
          </Pressable>

          {/* Bloque legal con navegación interna */}
          <Text style={styles.legal}>
            By clicking continue, you agree to our{' '}
            <Link href="/terms" style={styles.link}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" style={styles.link}>
              Privacy Policy
            </Link>
            .
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(141, 4, 172, 0.1)',
  },
  backText: { color: '#8D04AC', fontWeight: '700', fontSize: 16 },
  logo: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#111827', textAlign: 'center', marginBottom: 16 },
  form: { width: '100%', gap: 12, marginBottom: 16 },
  input: {
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
  },
  cta: {
    height: 50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  ctaText: { color: 'white', fontSize: 16, fontWeight: '800' },
  legal: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    marginTop: 30,
    paddingHorizontal: 8,
    lineHeight: 18,
    marginBottom: 10,
  },
  link: { textDecorationLine: 'underline', color: '#2563eb' },
});
