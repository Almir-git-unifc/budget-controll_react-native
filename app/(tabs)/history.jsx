import { View, Text, StyleSheet } from 'react-native';

export default function History() {
  return (
    <View>
      <Text style={styles.loginScreen}>Tela history</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  loginScreen: {
    margin: 20,
    marginTop: 40,
    fontSize: 14,
  },
});
