import { View, Text, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';

export default function ColorPicker() {
    return (

        <View style={styles.stylaligncor} >
            {Colors.COLOR_LIST.map((color, index) => (
                <View key={index}  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: color,
                    borderRadius: 99,
                }} 
                >
                </View >
            ))}
        </View>
     )
};

const styles = StyleSheet.create({
    stylaligncor: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginTop:20,
    },
})
