import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botón de regreso */}
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.h1}>Terms of Service</Text>
        <Text style={styles.muted}>Last updated: Oct 25, 2025</Text>

        <Section title="1. Acceptance of Terms">
          <Text style={styles.p}>
            By accessing or using the App, you agree to be bound by these Terms.
            If you do not agree, do not use the App.
          </Text>
        </Section>

        <Section title="2. Eligibility">
          <Text style={styles.p}>
            You must be at least 13 years old (or the age of majority in your jurisdiction) to use the App.
          </Text>
        </Section>

        <Section title="3. Accounts & Security">
          <Text style={styles.p}>
            You are responsible for safeguarding your account credentials and for all activities under your account.
          </Text>
        </Section>

        <Section title="4. Use of the Service">
          <Text style={styles.p}>
            You agree to use the App only for lawful purposes and in accordance with these Terms.
          </Text>
        </Section>

        <Section title="5. Intellectual Property">
          <Text style={styles.p}>
            The App and its content are owned by us or our licensors and protected by applicable laws.
          </Text>
        </Section>

        <Section title="6. Limitation of Liability">
          <Text style={styles.p}>
            We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.
          </Text>
        </Section>

        <Section title="7. Changes to Terms">
          <Text style={styles.p}>
            We may update these Terms at any time. Continued use of the App after updates constitutes acceptance.
          </Text>
        </Section>

        <Section title="8. Contact">
          <Text style={styles.p}>If you have questions, contact us at hugoaguayo50@gmail.com.</Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.h2}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { padding: 20, paddingBottom: 40 },
  h1: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 6 },
  h2: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 6 },
  p: { fontSize: 14, lineHeight: 20, color: '#374151' },
  muted: { fontSize: 12, color: '#6B7280', marginBottom: 10 },
  backBtn: {
    backgroundColor: 'rgba(141, 4, 172, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: { color: '#8D04AC', fontWeight: '700', fontSize: 16 },
});
