import { Stack } from 'expo-router';
import React from 'react';
import { useFonts } from 'expo-font';

export default function HomeLayout() {

  const [fontsLoaded, fontError] = useFonts({
    'nunito': require('../assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
  });


  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-new-category"
        options={{
          presentation: "modal",
          headerShown:true,
          headerTitle: "Add New Category",
        }}
      />
    </Stack>
  );
}
