import { View, Text, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View>
      <Text style={styles.loginScreen}>Tela para fazer Login</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  loginScreen: {
    margin: 20,
    fontSize: 14,
  },
});
