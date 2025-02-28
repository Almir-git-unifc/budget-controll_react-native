import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}></View>

      <View style={styles.banner}>
        <View style={styles.contaiheader}>
            <Text style={styles.bannerText}>Profile Screen</Text>
        </View>
      </View>

      <View style={styles.profileDetails}>
        <View>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
            }}
            style={styles.imageSize}
          />
        </View>

        <View style={styles.posIcon}>
          <TouchableOpacity style={styles.camCont}>
            <Ionicons name="camera-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileData}>
        <Text style={styles.posTextSch}>School</Text>
        <TextInput style={styles.textInput}>PUC Minas</TextInput>
        <Text style={styles.posTextEmail}>Email Address</Text>
        <TextInput style={styles.textInput}>silva&silva@gmail.com</TextInput>
        <Text style={styles.posTextName}>Name</Text>
        <TextInput style={styles.textInput}>Silva</TextInput>
        <Text style={styles.posTextNickName}>Nick Name</Text>
        <TextInput style={styles.textInput}>A.silv</TextInput>
        <Text style={styles.posTextEmergency}>Emergency Number</Text>
        <TextInput style={styles.textInput}>11-987654321</TextInput>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.PRIMARY,
  },
  contaiheader: {
    backgroundColor:Colors.PRIMARY,
    height:150
  },
  banner: {
    flex: 0.5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    marginBottom: 3,
    
  },
  bannerText: {
    fontSize: 20,
    marginHorizontal: 100,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 3,
    alignItems: 'center',
    position: 'relative',
    paddingTop: 30,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
  },
  imageSize: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  posIcon: {
    position: 'absolute',
    top: 130,
    right: 90,
  },
  camCont: {
    backgroundColor: 'rgb(39, 180, 228)',
    borderRadius: 10,
  },
  profileData: {
    flex: 5,
    backgroundColor: 'rgb(255, 255, 255)',
    position: 'relative',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  posTextSch: {
    position: 'absolute',
    top: 0,
    left: 35,
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
  },
  posTextEmail: {
    position: 'relative',
    top: 8,
    left: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
  },
  posTextName: {
    position: 'relative',
    top: 8,
    left: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
  },
  posTextNickName: {
    position: 'relative',
    top: 8,
    left: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
  },
  posTextEmergency: {
    position: 'relative',
    top: 8,
    left: 16,
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
  },
  textInput: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderTopWidth: 0,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 206, 210)',
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    height: 55,
    width: 250,
    borderRadius: 75,
    backgroundColor: 'rgb(39, 180, 228)',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'rgb(255, 255, 255)',
    padding: 15,
    fontSize: 17,
  },
});
