////////import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';

import { client } from '../../utils/KindeConfig';

export default function xxxxHome() {
  ///////////////const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      ////////////router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>INIT PAGE</Text>
      <Text style={styles.paragraph}>Se inscreva no Gurugi</Text>
      <Text style={styles.paragraph}>Você foi aprovado no login</Text>
      <Button title="Quer sair ou Logout?" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
