import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';

export default function AddNewCategory() {

  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);

  return (
    <View style={styles.viewhover}>
      <View style={styles.inputview}>
        <TextInput style={[styles.iconInput, { backgroundColor: selectedColor }]} maxLength={2} >
          {selectedIcon}
        </TextInput>
        <ColorPicker/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewhover: {
    marginTop: 20,
    padding: 20,
  },
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    paddingHorizontal: 28,
    borderRadius: 99,
    color: Colors.WHITE,
  },
  inputview:{
    justifyContent:'center',
    alignItems: 'center',
  }
});