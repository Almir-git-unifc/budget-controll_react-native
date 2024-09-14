import { Link, useRouter, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Services from '../utils/Services';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
  });

  /** Usado para verificar se o usuário já está autenticado ou não */
  const checkUserAuth = async () => {
    const result = await Services.getData('login');
    if (result !== 'true') {
      router.push('/login');
    }
  };

  return (
    <View>
      <Text style={styles.paragraph}>Home</Text>
      <Text style={styles.paragraph}>Subscribe to ABS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
