import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupabaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import { useRouter } from 'expo-router';

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('O ID obtido de categoryId eh: ', categoryId);
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*,CategoryItems(*)')
      .eq('id', categoryId);
    setCategoryData(data[0]);
    console.log('\n Dados do supabase obtidos na página CategoryDetails: ', categoryData, '\n');
  };

  return (
    <View style={styles.viewcatedetail}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
    </View>
  );
}
const styles = StyleSheet.create({
  viewcatedetail: {
    marginTop: 20,
    padding: 20,
  },
  iconcatedetail: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
  },
});
