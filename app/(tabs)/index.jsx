import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { supabase } from '../../utils/SupabaseConfig';
import { client } from '../../utils/KindeConfig';

import Header from '../../components/Header';
import DonutChart from '../../components/DonutChart';
import CategoryList from '../../components/CategoryList.jsx';

import Colors from '../../utils/Colors.jsx';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useContext } from 'react';
import PersonaContext from '../../PersonaContext.jsx';

export default function Home() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(false);

  const { setUserContext } = useContext(PersonaContext);
  const { setFamilyContext} =  useContext(PersonaContext);
  const { setEmailContext} =  useContext(PersonaContext);
  const { setImageContext} =  useContext(PersonaContext);

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
    setLoading(true);
    const user = await client.getUserDetails();
    console.log('email do usuário Kinde eh: ', user.email);
    console.log('nome given_name do usuário Kinde eh: ', user.given_name);
    console.log('sobrenome family_name do usuário Kinde eh: ', user.family_name);

    if (user && user.profile_picture) {
      const profilePictureUrl = user.profile_picture;
      // Use profilePictureUrl para exibir a imagem de perfil
      console.log('OK a imagem do perfil do usuário Kinde foi obtida');
    } else {
      console.log('imagem do perfil do usuário Kinde NÃO está disponível');
    }

    /* enviando valores ap contexto */
    setUserContext(user.given_name);
    setFamilyContext(user.family_name);
    setEmailContext(user.email);


    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('created_by', user.email)
      .order(['id'],{ascending:false});

    if (error) {
      console.log('Error in capture data');
    }

    console.log('Dados do usuário no Supabase: ', data);
    console.log('');
    setCategoryList(data);

    data && setLoading(false);
    console.log('Linha 52 - Dados da variavel categoryList no arquivo index.jsx: ', categoryList);
    console.log('');
  };

  return (
    <View style={styles.gera}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={() => getCategoryLyst()} 
          refreshing={loading} />
        }>
        <View style={styles.container}>
          <Header />
        </View>

        <View style={styles.graphcatlist}>
          <DonutChart categoryList={categoryList} />

            {/* ... */}
            {categoryList ? ( // Check if categoryList is not undefined
              <CategoryList categoryList={categoryList} />
            ) : (
              <Text>Loading categories...</Text>
            )}
            {/* ... */}

        </View>
        <StatusBar style="auto" />
      </ScrollView>

      <Link href={'/add-new-category'} style={styles.btnaddcateg}>
        <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  gera: {
    marginTop: 30,
    flex: 1,
  },
  graphcatlist: {
    padding: 20,
    marginTop: -75,
  },
  container: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    height: 150,
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
