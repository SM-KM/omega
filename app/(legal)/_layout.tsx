import { Stack } from 'expo-router';

export default function LegalLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="terms"
        options={{ title: 'Terms of Service' }}
      />
      <Stack.Screen
        name="privacy"
        options={{ title: 'Privacy Policy' }}
      />
    </Stack>
  );
}
