import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {

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
      <Stack.Screen
        name="add-new-category-item"
        options={{
          presentation: "modal",
          headerShown:true,
          headerTitle:'Add New Item',
        }}
      />
    </Stack>
  );
}
