import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
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
    <View style={{ flex: 1 }}>
      {/* 🔹 Botón Logout fijo arriba */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Balance',
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons
                  name="sync-circle"
                  size={24}
                  color={focused ? '#8D04AC' : '#5A0071'}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Cards',
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons
                  name="home"
                  size={24}
                  color={focused ? '#8D04AC' : '#5A0071'}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="suggestions"
          options={{
            title: 'Suggestions',
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons
                  name="settings-outline"
                  size={28}
                  color={focused ? '#8D04AC' : '#5A0071'}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  // 🔹 Botón Logout
  logoutBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#8D04AC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 100,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  tabBar: {
    height: 100,
    paddingBottom: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});