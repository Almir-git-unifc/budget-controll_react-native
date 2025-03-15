import { Stack } from 'expo-router';
import { useState } from 'react';
import PersonaContext from '../PersonaContext';

export default function HomeLayout() {

  const [userContext, setUserContext] = useState('No name');
  const [familyContext, setFamilyContext] = useState('No lastname');
  const [userEmailContext, setEmailContext] = useState('No Email');
  const [userImageContext, setImageContext] = useState('No Image');

  const [totalGastReservedContext, setTotalGastReservedContext] = useState(0);
  const [totalGastExpectedContext, setTotalGastExpectedContext] = useState(0);


  return (
    <PersonaContext.Provider 
      value={{ 
        userContext, setUserContext,
        familyContext, setFamilyContext, 
        userEmailContext, setEmailContext,
        userImageContext, setImageContext,
        totalGastReservedContext, setTotalGastReservedContext,
        totalGastExpectedContext, setTotalGastExpectedContext,
      }}
    >
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
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Add New Category',
          }}
        />
        <Stack.Screen
          name="add-new-category-item"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Add New Item',
          }}
        />
    </Stack>
    </PersonaContext.Provider>
  );
}
