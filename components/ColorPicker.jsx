import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';
import { useState } from 'react';

export default function ColorPicker({onColorChange}) {

    const [selectedColor, setSelectedColor] = useState('#9F3CFE');

    const handleColorPress = (color) => {
        setSelectedColor(color);
        onColorChange(color); // Call the callback with the selected color
      };

    return (
        <View style={styles.stylaligncor} >
            {Colors.COLOR_LIST.map((color, index) => (
                <TouchableOpacity 
                    key={index}  
                    style={[
                        {
                        height: 30,
                        width: 30,
                        backgroundColor: color,
                        borderRadius: 99,
                    },selectedColor === color && styles.selectedButton, ]}
                    onPress={() => handleColorPress(color)}
                >
                </TouchableOpacity >
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
    selectedButton: {
        borderWidth: 4,
        borderColor: 'black',
      },
})
