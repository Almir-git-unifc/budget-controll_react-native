import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';

import {supabase} from '../../utils/SupabaseConfig';
import { client } from '../../utils/KindeConfig';

import Header from '../../components/Header';
import Colors from '../../utils/Colors.jsx';

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
    console.log('email do usuário Kinde eh: ', user.email);
    const {data, error}=await supabase.from('Category')
    .select('*')
    .eq('created_by', user.email);
    if(error){
      console.log('Error in capture data');
    }

    console.log('Dados do usuário no Supabase: ', data);
    console.log('');

  }

  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    backgroundColor:Colors.PRIMARY,
    height:150
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
