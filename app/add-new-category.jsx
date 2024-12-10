import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ToastAndroid,
  ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { supabase } from '../utils/SupabaseConfig';
import { client } from '../utils/KindeConfig';
import { useRouter } from 'expo-router';

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);

  const [categoryName, setCategoryName] = useState();
  const [totalBudget, setTotalBudget] = useState();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  const onCreatedCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    console.log('\n email do usuário Kinde eh: ', user.email);

    const { data, error } = await supabase
      .from('Category')
      .insert([
        {
          name: categoryName,
          assigned_budget: totalBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();
    console.log('Dados da tabela do Supabase é: ', data);

    if (data) {
      router.replace({
        pathname: '/category-detail',
        params: { categoryId: data[0].id },
      });
      setLoading(false);
      ToastAndroid.show('Category Created!', ToastAndroid.SHORT);
      console.log(data);
    }
    if (error) {
      setLoading(false);
      console.log('Erro na obtenção dos dados');
    }
  };

  return (
    <View style={styles.viewhover}>
      <View style={styles.inputview}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}>
          {selectedIcon}
        </TextInput>
        <ColorPicker onColorChange={handleColorChange} />
      </View>

      {/** Add Category Name and Total Budget Section */}
      <View style={styles.categoryname}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Category Name"
          onChangeText={(v) => setCategoryName(v)}
          style={{ width: '100%', fontSize: 17 }}
        />
      </View>

      <View style={styles.categoryname}>
        <FontAwesome name="dollar" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Total Budget"
          keyboardType="numeric"
          onChangeText={(v) => setTotalBudget(v)}
          style={{ width: '100%', fontSize: 17 }}
        />
      </View>
      <TouchableOpacity
        style={styles.btntouchableaddcateg}
        disable={!categoryName || !totalBudget || loading}
        onPress={() => onCreatedCategory()}
      >
        {loading ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text style={styles.txtlablebtncate}>Create</Text>
        )}
      </TouchableOpacity>
    </View>
  );
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
  inputview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryname: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    alignItems: 'center',
    marginTop: 20,
  },
  btntouchableaddcateg: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  txtlablebtncate: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.WHITE,
  },
});
