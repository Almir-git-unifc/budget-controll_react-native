import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';

import { supabase } from '../../utils/SupabaseConfig';
import { client } from '../../utils/KindeConfig';

import Header from '../../components/Header';
import DonutChart from '../../components/DonutChart';
import Colors from '../../utils/Colors.jsx';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    getCategoryLyst();
  }, []);

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      router.replace('/login');
    }
  };

  const getCategoryLyst = async () => {
    const user = await client.getUserDetails();
    console.log('email do usuário Kinde eh: ', user.email);
    const { data, error } = await supabase.from('Category')
      .select('*')
      .eq('created_by', user.email);
    if (error) {
      console.log('Error in capture data');
    }

    console.log('Dados do usuário no Supabase: ', data);
    console.log('');

  }

  return (
    <View style={styles.gera}>
      <View style={styles.container}>
        <Header />
        <DonutChart />
      </View>

      <Link href={'/add-new-category'} style={styles.btnaddcateg}>
        <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  gera: {
    marginTop: 30,
    flex: 1
    },  
  container: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    height: 150
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnaddcateg: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    },  
});
