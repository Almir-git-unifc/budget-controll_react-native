import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useRouter } from 'expo-router';
import { BackHandler, Alert } from "react-native";
import {useEffect } from 'react';

import Colors from '../../utils/Colors';

export default function TabLayout() {

  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Alert!", "Are you sure you want to leave the App?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          router.push('/login');
          BackHandler.exitApp();
        }}
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
