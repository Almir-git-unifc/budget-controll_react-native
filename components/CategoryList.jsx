import { View, Text, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';

export default function CategoryList({ categoryList }) {
  return (
    <View style={styles.viewcateglis}>
      <Text style={styles.txtcateglist}>Latest Budget</Text>

      {/* Trecho modificado */}
      {categoryList && categoryList.length > 0 ? ( // Check if categoryList is not undefined and has items
        <View>
          {categoryList.map((category, index) => (
            <View key={index} style={styles.contgercateglist}>
              <View style={styles.icoContainer}>
                <Text style={[styles.icodetailcatlist, { backgroundColor: category?.color }]}>
                  {category.icon}
                </Text>
              </View>

              <View style={styles.subContainer}>
                  <View>
                      <Text style={styles.categoryText}>{category.name}</Text>
                      <Text style={styles.itemCount}>{category?.CategoryItems?.length} Itens</Text>
                  </View>
                  <Text style={styles.txtotalgeneral}>$5000</Text>
              </View>
              
            </View>
          ))}
        </View>
      ) : (
        <Text>No categories found.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  contgercateglist: {
    marginBottom: 10,
    display:'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 10, 
    borderRadius: 15,
  },
  viewcateglis: {
    marginTop: 20,
  },
  txtcateglist: {
    // fontfamily:'nunito-bold',
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  icodetailcatlist: {
    fontSize: 35,
    padding: 16,
    borderRadius: 15,
  },
  icoContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCount: {
    fontWeight: 'normal'
  },
  subContainer: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  txtotalgeneral: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});