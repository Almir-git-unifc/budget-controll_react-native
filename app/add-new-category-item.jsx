import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../utils/SupabaseConfig';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const placeholder =
  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export default function AddNewCategoryItem() {
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const { categoryId } = useLocalSearchParams();
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [url, setUrl] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onImagePick = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    console.log('Resultado obtido na linha 29 as 23.39h - valor result: ');

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    } else {
      console.log('Você não selecionou nenhuma imagem');
    }
  };

  const onClickAdd = async () => {
    setLoading(true);
    console.log('inicio botão AddItem de add-new-category-item.jsx');
    console.log('');
    const fileName = Date.now();
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName + '.png', decode(image), {
        contentType: 'image/png',
      });

    if (data) {
      const fileUrl =
        'https://xojgrrzyxnarswqcpebq.supabase.co/storage/v1/object/public/images/' +
        fileName +
        '.png';
      console.log('File Upload - 00.43h - na linha 55, dados recebidos eh: ', data, error);
      console.log('');
      console.log('File Upload em: ');
      console.log(fileUrl);
      console.log('');

      const { data, error } = await supabase
        .from('CategoryItems')
        .insert([
          {
            /*   var_Supa: var_loc_useState,   */
            name: name,
            cost: cost,
            url: url,
            image: fileUrl,
            note: note,
            category_id: categoryId,
          },
        ])
        .select();

      ToastAndroid.show('Novo Item adicionado ', ToastAndroid.SHORT);

      console.log(data);

      setLoading(false);
      router.replace({
        pathname: '/category-detail',
        params: { categoryId: categoryId },
      });
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.formimage}>
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image source={{ uri: previewImage }} style={styles.addimage} />
        </TouchableOpacity>

        <View style={styles.textInput}>
          <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Item Name"
            style={styles.solotextInput}
            onChangeText={(value) => setName(value)}
          />
        </View>

        <View style={styles.textInput}>
          <FontAwesome name="dollar" size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Custo"
            keyboardType="number-pad"
            style={styles.solotextInput}
            onChangeText={(value) => setCost(value)}
          />
        </View>

        <View style={styles.textInput}>
          <Ionicons name="link" size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Url"
            style={styles.solotextInput}
            onChangeText={(value) => setUrl(value)}
          />
        </View>

        <View style={styles.textInput}>
          <Ionicons name="pencil" style={styles.iconpencil} size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Notes"
            style={styles.solotextInput}
            numberOfLines={3}
            onChangeText={(value) => setNote(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.btnadditem}
          disabled={!name || !cost || loading}
          onPress={() => onClickAdd()}>
          {
            loading ? 
            <ActivityIndicator color={Colors.WHITE} /> 
            : 
            <Text style={styles.txtlbladditem}>AddItem</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  addnewcategory: {
    marginLeft: 20,
    marginTop: 50,
  },
  addimage: {
    width: 150,
    height: 150,
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
  },
  formimage: {
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    marginTop: 10,
  },
  solotextInput: {
    fontSize: 17,
    width: '100%',
  },
  btnadditem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 25,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  txtlbladditem: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  iconpencil: {
    paddingBottom: 20,
    paddingTop: 20,
  },
});
