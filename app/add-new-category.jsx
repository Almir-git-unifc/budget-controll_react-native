import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddNewCategory(){
  return (
    <View >
      <Text  style={styles.catego} >add-new-category</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  catego: {
    marginTop: 50,
    marginLeft: 10,
    }
});