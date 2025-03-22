import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Colors from '../../utils/Colors.jsx';
import { client } from '../../utils/KindeConfig.jsx';
//import { services } from '../../utils/Services.jsx';

export default function LoginScreen() {
  /**
   * Abaixo router
   */
  const router = useRouter();
  /**
   * abaixo handleSigIn
   */
  const handleSignIn = async () => {
    const token = await client.login();
    console.log('valor de token antes de validar eh: ', token);
    if (token) {
      console.log('');
      console.log('');
      console.log('valor de token após validar eh: ');
      console.log(token);
      console.log('');
      // User was authenticated
      /* await services.storeData('login', 'true'); 
      console.log(services.getData('login')); */
      /////// console.log('login true; AND btn Click Login-Signup; now router-repalce page-barra');
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={styles.loginScreen}>Login Screen</Text>
      <Image source={require('../../assets/images/loginbg.png')} style={styles.loginBg} />
      <View style={styles.viewIntern}>
        <Text style={styles.txtPersPlan}>Personal Budger Planner</Text>
        <Text style={styles.txtSlogan}>
          Stay on Track, Event by Event: Your Personal Budget Planner App!
        </Text>
        <TouchableOpacity style={styles.txtBtnLogin} onPress={handleSignIn}>
          <Text style={{ textAlign: 'center', color: Colors.PRIMARY }}>Login/Signup</Text>
        </TouchableOpacity>

        <Text style={styles.txtadvlogin}>
          * By loging or SignUp you will accept our terms and conditions
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginScreen: {
    marginTop: 40,
    margin: 20,
    fontSize: 14,
  },
  loginBg: {
    width: 200,
    height: 400,
    marginTop: 10,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.BLACK,
  },
  viewIntern: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    height: '100%',
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 30, // Arredonda canto superior esquerdo
    borderTopRightRadius: 30, // Arredonda canto superior direito
  },
  txtPersPlan: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.WHITE,
  },
  txtSlogan: {
    fontSize: 17,
    textAlign: 'center',
    color: Colors.WHITE,
    marginTop: 20,
  },

  txtadvlogin:{
    fontSize: 10, 
    color: Colors.GRAY, 
    marginTop: 10, 
    textAlign: 'center',
  },
  txtBtnLogin: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 30,
  },
});
