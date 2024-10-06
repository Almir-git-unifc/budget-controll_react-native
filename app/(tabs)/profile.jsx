import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View>
      <Text style={styles.loginScreen}> Tela profile</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  loginScreen: {
    margin: 20,
    fontSize: 14,
  },
});
