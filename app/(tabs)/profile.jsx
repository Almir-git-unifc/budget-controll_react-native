import { View, Text, Linking, StyleSheet, Image,TouchableOpacity,  TextInput,KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../utils/Colors';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useContext } from 'react';
import PersonaContext from '../../PersonaContext';


export default function Profile() {
  const { userContext, familyContext, userEmailContext, totalGastExpectedContext, totalGastReservedContext } =
    useContext(PersonaContext);

  // adiciona variavel da imagem
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Solicitar permissões quando o componente for montado
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const percentage = totalGastReservedContext !== 0 ? parseInt((totalGastExpectedContext * 100) / totalGastReservedContext) : 0;

  // Função para escolher uma imagem da galeria
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Atualização aqui
    }
    setModalVisible(false);
  };

  // Função para tirar uma foto com a câmera
  const takePhotoWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Atualização aqui
    }
    setModalVisible(false);
  };

  // Função para excluir a imagem
  const deleteImage = () => {
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.titlePage}>
            <View style={styles.contaiheader}>
              <Text style={styles.titlePageText}>Profile Screen</Text>
            </View>
          </View>

          <View style={styles.imageandrefs}>
            {/* Exibição da imagem no círculo */}
            <View style={styles.imageContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/images/avatarfpk.jpg')} style={styles.image} />
              )}

              <TouchableOpacity style={styles.imageButton} onPress={() => setModalVisible(true)}>
                <FontAwesome name="camera" size={27} color={Colors.BLUE_SOFT} />
              </TouchableOpacity>
            </View>
            <View style={styles.txtCredLink}>
              <Text style={styles.txtIntroLink}>
                Avatar by brgfx in{' '}
                <Text
                  style={styles.txtHiperlink}
                  onPress={() => {
                    Linking.openURL('https://br.freepik.com/vetores-gratis/jovem-de-oculos-e-capuz_356306296.htm#fromView=keyword&page=1&position=49&uuid=cf2a7235-a9f3-4b34-8bb5-ddc828a93065&query=Avatar');
                  }}>
                  Freepik
                </Text>
              </Text>
            </View>
          </View>

          {/* Botões para interação MODAL */}
          <View style={styles.buttonsContainer}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity style={styles.modalButton} onPress={pickImageFromGallery}>
                    <MaterialIcons name="photo-library" size={24} color={Colors.WHITE} />
                    <Text style={styles.modalButtonText}>Selecionar da Galeria</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.modalButton} onPress={takePhotoWithCamera}>
                    <MaterialIcons name="camera-alt" size={24} color={Colors.WHITE} />
                    <Text style={styles.modalButtonText}>Tirar Foto</Text>
                  </TouchableOpacity>

                  {image && (
                    <TouchableOpacity style={styles.modalButton} onPress={deleteImage}>
                      <MaterialIcons name="delete" size={24} color={Colors.WHITE} />
                      <Text style={styles.modalButtonText}>Excluir Foto</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalCloseButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <TouchableOpacity style={styles.buttonfooter}>
            <Text style={styles.buttonText}>Your Informations</Text>
          </TouchableOpacity>

          <View style={styles.profileData}>
            <View style={styles.textInput}>
              <Feather name="user" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Name">{userContext}</TextInput>
            </View>

            <View style={styles.textInput}>
              <Feather name="user" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Last_Name">{familyContext}</TextInput>
            </View>

            <View style={styles.textInput}>
              <Feather name="mail" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Profession:">{userEmailContext}</TextInput>
            </View>

          </View>
          <View style={styles.profilSummary}>
            <Text style={styles.txttitlebalance}>General balance</Text>
            <View style={styles.txttotal}>
              <Text style={styles.txtfontvalues}>Income: {totalGastExpectedContext}</Text>
              <Text style={styles.txtfontvalues}>Expenses: {totalGastReservedContext}</Text>
            </View>
            <View style={styles.progressbarmaincontainer}>
              <View style={[ styles.progressbainnercontainer, { 
                width: `${percentage}%`,
                backgroundColor: percentage > 98 ? Colors.RED_DEBT : Colors.BLUE,
                },]}>
              </View>
            </View>
          </View>

          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    /*  ACHO QUE PODE TIRAR */ fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  placeholderText: {
    fontSize: 18,
    color: '#888',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Ajuste a largura conforme necessário
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY, // Use sua cor primária
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageandrefs:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.PRIMARY,
    marginTop: 30,
  },
  contaiheader: {
    backgroundColor: Colors.PRIMARY,
    height: 25,
  },
  titlePage: {
    flex: 0.5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    color: Colors.WHITE,
  },
  titlePageText: {
    fontSize: 20,
    marginHorizontal: 100,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    marginTop: 5,
  },
  profileData: {
    flex: 5,
    backgroundColor: Colors.WHITE,
    position: 'relative',
    justifyContent: 'center',
    padding: 20,
    marginTop: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  profilSummary:{
    flex: 5,
    backgroundColor: Colors.WHITE,
    position: 'relative',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom: 15,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
  },
  txtfontvalues:{
    fontSize: 13,
    //color: Colors.WHITE,
    // fontWeight: 'bold',
  },
  txttitlebalance:{
    fontSize: 14,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  buttonfooter: {
    display: 'flex',
    height: 55,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: Colors.PRIMARY,
    padding: 15,
    fontSize: 17,
    fontWeight: 'bold',
  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 15,
    borderRadius: 20,
  },
  txtCredLink:{
    justifyContent: 'center',
    alignItems:'center',
  },
  txtIntroLink:{
    color: Colors.GRAY_LINK,
  },
  txtHiperlink:{
    color: Colors.BLUE_LINK,
  },
  progressbarmaincontainer: {
    width: '100%',
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 10,
    },
    progressbainnercontainer:{
    width: '30%',
    borderRadius: 99,
    height: 15,
   },
  txttotal:{
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      marginTop: 15,
    },
});
