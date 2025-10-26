import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botón de regreso */}
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.h1}>Privacy Policy</Text>
        <Text style={styles.muted}>Last updated: Oct 25, 2025</Text>

        <Section title="1. Introduction">
          <Text style={styles.p}>
            This Privacy Policy explains how we collect, use, and protect your information when you use our App.
          </Text>
        </Section>

        <Section title="2. Information We Collect">
          <Text style={styles.p}>
            We may collect personal data (like email), usage data, and device information necessary to operate the App.
          </Text>
        </Section>

        <Section title="3. How We Use Information">
          <Text style={styles.p}>
            We use collected data to provide and improve the App, communicate with users, and ensure security.
          </Text>
        </Section>

        <Section title="4. Sharing Information">
          <Text style={styles.p}>
            We do not sell personal information. Data may be shared with trusted providers or as required by law.
          </Text>
        </Section>

        <Section title="5. Data Retention & Security">
          <Text style={styles.p}>
            We retain information as long as necessary and apply reasonable measures to protect it.
          </Text>
        </Section>

        <Section title="6. Your Rights">
          <Text style={styles.p}>
            Depending on your region, you may have rights to access, correct, or delete your data.
          </Text>
        </Section>

        <Section title="7. Changes">
          <Text style={styles.p}>
            We may update this Policy from time to time. Continued use of the App means acceptance of changes.
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
