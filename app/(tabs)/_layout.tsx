import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <View >
              <Ionicons
                name="sync-circle"
                size={24}
                color={focused ? "#2C3E3A" : "#888"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View >
              <Ionicons name="home" size={24}
                color={focused ? "#2C3E3A" : "#888"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          tabBarIcon: ({ focused }) => (
            <View >
              <Ionicons
                name="settings-outline"
                size={28}
                color={focused ? "#2C3E3A" : "#888"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 100,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  // sideButton: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  //   backgroundColor: '#fff',
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderColor: "#000",
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 2,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  // },
  // centerButton: {
  //   width: 60,
  //   height: 60,
  //   borderWidth: 1,
  //   borderColor: "#000",
  //   justifyContent: 'center',
  //   borderRadius: 30,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   elevation: 8,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 8,
  // },
  //
  // tabBarItem: {
  //   paddingHorizontal: 0,
  //   marginHorizontal: -10,
  // },
});
