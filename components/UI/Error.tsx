import { View, Text, StyleSheet, Button } from 'react-native';

function Error({ message, onConfirm }) {
  return (
    <View>
      <Text style={(styles.text, styles.title)}>An error occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm} title='Okay'></Button>
    </View>
  );
}
export default Error;

const styles = StyleSheet.create({
  text: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
