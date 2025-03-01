import { View,Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.titlePage}>
            <View style={styles.contaiheader}>
              <Text style={styles.titlePageText}>Profile Screen</Text>
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
            <View style={styles.textInput}>
              <Feather name="user" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Name">Silverio</TextInput>
            </View>

            <View style={styles.textInput}>
              <Feather name="mail" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Email">silva&silva@gmail.com</TextInput>
            </View>

            <View style={styles.textInput}>
              <MaterialIcons name="engineering" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Profession: Danger"></TextInput>
            </View>

            <View style={styles.textInput}>
              <Feather name="phone-call" size={24} color={Colors.GRAY} />
              <TextInput placeholder="Fone Number">11-987654321</TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonfooter}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: Colors.PRIMARY,
    height: 70,
  },
  titlePage: {
    flex: 0.5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    marginBottom: 5,
  },
  titlePageText: {
    fontSize: 20,
    marginHorizontal: 100,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 3,
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.WHITE,
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
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  profileData: {
    flex: 5,
    backgroundColor: Colors.WHITE,
    position: 'relative',
    justifyContent: 'center',
    padding: 20,
    marginTop: 15,
    borderRadius: 15,
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
  buttonfooter: {
    display: 'flex',
    height: 55,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    alignSelf: 'center',
    color: Colors.PRIMARY,
    padding: 15,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
