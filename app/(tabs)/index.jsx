import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';

import {supabase} from '../../utils/SupabaseConfig';
import { client } from '../../utils/KindeConfig';

export default function Home() {
  const router = useRouter();

  useEffect( ()=>{
    getCategoryLyst();
  },[]);

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      router.replace('/login');
    }
  };

  const getCategoryLyst=async()=>{
    const user=await client.getUserDetails();
    // console.log('conteudo de user eh: ', user );
    console.log('email do usuário eh: ', user.email);
    const {data, error}=await supabase.from('Category')
    .select('*')
    .eq('created_by', user.email);
    if(error){
      console.log('Error in capture data');
    }

    console.log('Dados do usuário no Supabase é: ', data);
    console.log('');

  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>INIT PAGE Versão 7</Text>
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
