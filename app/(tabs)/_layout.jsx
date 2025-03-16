import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, usePathname } from 'expo-router';

import { useRouter } from 'expo-router';
import { BackHandler, Alert } from "react-native";
import {useEffect, useState } from 'react';

import Colors from '../../utils/Colors';

export default function TabLayout() {

  const router = useRouter();
  const pathname = usePathname();

  const [isHomeTabActive, setIsHomeTabActive] = useState(true);

  useEffect(() => {
    // Adapte a lógica para verificar se a página atual é a Home
    setIsHomeTabActive(pathname === '/'); // Supondo que a Home seja a raiz
  }, [pathname]);


  useEffect(() => {
    let backHandler;

    if (isHomeTabActive) {
      const backAction = () => {
        Alert.alert('Alert!', 'Are you sure you want to leave the App?', [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              router.push('/login');
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };

      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
    }

    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, [isHomeTabActive, router]);

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
