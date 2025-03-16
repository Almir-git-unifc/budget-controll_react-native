import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { useRouter } from 'expo-router';


export default function CategoryList({ categoryList }) {

  const router=useRouter();
  const onCategoryClick=(category) => {
    router.push({
       pathname: '/category-detail',
       params: {categoryId:category.id}
    })
 };

 const calcTotalGastCategoryCost=(categoryItems)=>{
  let totalGastCategoryCost=0;
  categoryItems.forEach(item=>{
       totalGastCategoryCost=totalGastCategoryCost+item.cost;
  })
  return totalGastCategoryCost;
};

  return (
    <View style={styles.viewcateglis}>
      <Text style={styles.txtcateglist}>Payments by Category</Text>

      {/* Trecho modificado */}
      {categoryList && categoryList.length > 0 ? ( // Check if categoryList is not undefined and has items
        <View>
          {categoryList.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contgercateglist}
              onPress={() => onCategoryClick(category)}>
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


                <Text style={styles.txtotalgeneral}>
                ${calcTotalGastCategoryCost(category?.CategoryItems)}
                </Text>


              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
             <Text>No categories found</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  contgercateglist: {
    marginBottom: 10,
    display: 'flex',
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
    color: Colors.WHITE,
    fontSize: 20,
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
    fontWeight: 'normal',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    width: '70%',
  },
  txtotalgeneral: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
