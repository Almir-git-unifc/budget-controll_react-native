import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text style={styles.paragraph}>Home</Text>
      <Text style={styles.paragraph}>Subscribe to ABS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
