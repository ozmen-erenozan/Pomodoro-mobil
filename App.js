import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Oluşturduğumuz sayfaları içe aktarıyoruz
import HomeScreen from './src/screens/HomeScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Üstteki varsayılan başlığı gizle
          tabBarIconStyle: { display: "none" }, 
          tabBarLabelStyle: { fontSize: 15, paddingBottom: 15 }
        }}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen name="Raporlar" component={ReportsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}