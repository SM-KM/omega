// components/LogoutButton.tsx
import { supabase } from '@/lib/supabase'; // Ajusta si tu ruta es diferente
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface LogoutButtonProps {
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  top?: number;
  right?: number;
}

export default function LogoutButton({
  label = 'Logout',
  style,
  textStyle,
  top = 60,
  right = 20,
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/login');
    } else {
      console.warn('Logout error:', error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={[styles.btn, { top, right }, style]}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    backgroundColor: '#8D04AC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 20,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});