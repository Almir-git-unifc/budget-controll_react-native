import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupabaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemList from '../components/CourseDetail/CourseItemList';
import Colors from '../utils/Colors';
import { Link, useRouter } from 'expo-router';


export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('\nO ID obtido de categoryId eh: ', categoryId);
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*,CategoryItems(*)')
      .eq('id', categoryId);
    setCategoryData(data[0]);
    console.log('Dados do supabase obtidos na página CategoryDetails: ', categoryData, '\n');
  };

  return (
    <View style={styles.viewcatedetail}>

      <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>

      <CourseInfo categoryData={categoryData} />
      <CourseItemList categoryData={categoryData}           
          setUpdateRecord={()=>getCategoryDetail()}
      />

      <Link
        href={{
          pathname: '/add-new-category-item',
          params: {
            categoryId: categoryData.id,
          },
        }}
        style={styles.btnaddfloat}
      >
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  viewcatedetail: {
    marginTop: 20,
    padding: 20,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  iconcatedetail: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
  },
  btnaddfloat: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
