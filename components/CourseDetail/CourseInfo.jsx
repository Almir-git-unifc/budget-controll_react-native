import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../utils/Colors';

export default function CourseInfo({ categoryData }) {

  const[totalCost, setTotalCost]= useState();
  const[percent, setPercent]= useState(0);


  useEffect( ()=>{
    categoryData&&calculateTotalPerc();
  },[categoryData] )

  const calculateTotalPerc=()=>{

    let totalgast=0;
    categoryData?.CategoryItems?.forEach(item=>{
      totalgast = totalgast + item.cost;
    });
    setTotalCost(totalgast);
    const calcPercent = (totalgast/categoryData.assigned_budget) * 100;
    setPercent(calcPercent);
    console.log("Valor total consumido eh: ", totalgast);
    console.log("Valor percentagem consumida eh: ", percent);
  }

  return (
    <View>
      <View style={styles.contaigeral}>
        <View style={styles.contaidetailcours}>
          <Text style={[styles.iconcatedetail, { backgroundColor: categoryData.color }]}>
            {categoryData.icon}
          </Text>
        </View>
        <View style={styles.txtvaltotalicon}>
          <Text style={styles.txtcategoryname}>{categoryData.name}</Text>
          <Text style={styles.categorytxt}>{categoryData.CategoryItems?.length} Item</Text>
        </View>
        <Ionicons name="trash" size={24} color="red" />
      </View>

      <View style={styles.txttotal}>
        <Text style={styles.txtfontvaluescost}>${totalCost}</Text>
        <Text style={styles.txtfontvalues}>Total Budget:{categoryData.assigned_budget}</Text>
      </View>
      <View style={styles.progressbarmaincontainer}>
        <View style={[styles.progressbainnercontainer, {width: percent +'%'}]}>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contaigeral: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contaidetailcours: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconcatedetail: {
    padding: 20,
    fontSize: 25,
    borderRadius: 15,
  },
  txtvaltotalicon: {
    flex: 1,
    marginLeft: 20,
  },
  txtcategoryname: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  categorytxt: {
    fontSize: 16,
  },
  txttotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  txtfontvalues: {
    fontSize: 14,
  },
  txtfontvaluescost:{
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressbarmaincontainer: {
    width: '100%',
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 10,
  },
  progressbainnercontainer:{
    width: '40%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    height: 15,
  },
});
