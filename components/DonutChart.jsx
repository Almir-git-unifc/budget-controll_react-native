import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { useState, useEffect } from 'react';
import Colors from '../utils/Colors.jsx';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DonutChart({ categoryList }) {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  const [totalGastExpected, setTotalGastExpected] = useState(0);
  const [HealthCost1, setHelphCost1] = useState('Despesas');
  const [HealthCost2, setHelphCost2] = useState('em dia');

  useEffect(() => {
    categoryList && updateDonutChart();
  }, [categoryList]);

  const updateDonutChart = () => {
    let totalEsimates = 0;
    setSliceColor([1]);
    setValues([Colors.GRAY]);
    let otherCost = 0;

    categoryList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        item.CategoryItems?.forEach((item_) => {
          itemTotalCost = itemTotalCost + item_.cost;
          totalEsimates = totalEsimates + item_.cost;
        });
        setSliceColor((sliceColor) => [...sliceColor, Colors.COLOR_LIST[index]]);
        setValues((values) => [...values, itemTotalCost]);
      } else {
        item.CategoryItems?.forEach((item_) => {
          otherCost = otherCost + item_.cost;
          totalEsimates = totalEsimates + item_.cost;
        });
      }
    });
    setTotalGastExpected(totalEsimates);
    setSliceColor((sliceColor) => [...sliceColor, Colors.COLOR_LIST[4], Colors.GRAY]);
    setValues((values) => [...values, otherCost, 50]);
  };

  return (
    <View style={styles.stylegraphic}>
      <Text style={styles.styletxtgraphic}>
        Total de Gastos : <Text style={{ fontWeight: 'bold' }}>${totalGastExpected}</Text>
      </Text>
      <View style={styles.styledisgraftitle}>

        {categoryList?.length > 0 && (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={Colors.WHITE}
          />
        )}

        {categoryList?.length == 0 ? (
          <View style={styles.stylegraphicleg}>
            <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
            <Text>N/A </Text>
          </View>
        ) : (
          <View>
            {categoryList?.map(
              (category, index) =>
                index <= 4 && (
                  <View key={index} style={styles.stylegraphicleg}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24}
                      color={Colors.COLOR_LIST[index]}
                    />
                    <Text>{index < 4 ? category.name : 'Other'}</Text>
                  </View>
                )
            )}
          </View>
        )}
      </View>


      <View style={styles.gauge}>
        <Text style={styles.gaugeText}>60%</Text>
      </View>

      <View style={styles.styleviewhealth}>
        <Text style={styles.styletxthealth}>{HealthCost1}</Text>
        <Text style={styles.styletxthealth}>{HealthCost2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stylegraphic: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  styletxtgraphic: {
    fontSize: 20,
  },
  styledisgraftitle: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  },
  stylegraphicleg: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  styleviewhealth: {
    position: 'absolute',
    top: '57%',
    left: '22%',
  },
  styletxthealth: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    top: '75%',
    left: '27%',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 17,
  },
});
