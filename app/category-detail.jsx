import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function CategoryDetails() {

  const { categoryId } = useLocalSearchParams();

  useEffect(()=>{
     console.log('O ID obtido de categoryId eh: ', categoryId)
  },[categoryId])


  return (
    <View style={styles.viewcatedetail}>
      <Text>category-detail</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  viewcatedetail: {
    marginTop: 45,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
