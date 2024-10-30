import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { useState } from 'react';
import Colors from '../utils/Colors.jsx';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DonutChart() {
    // Diâmetro do Donut
    widthAndHeight = 150;

    // Dados do Gráfico
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

    return (
        <View style={styles.stylegraphic} >
            <Text style={styles.styletxtgraphic} >
                Total de Gastos : <Text style={{ fontWeight:'bold' }}>0$</Text>
            </Text>
            <View style={styles.styledisgraftitle} >
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                <View style={styles.stylegraphicleg}  >
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        size={24}
                        color={Colors.GRAY}
                    />
                    <Text >N/A </Text>
                </View>
            </View>
        </View>
    )
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
    }
});
