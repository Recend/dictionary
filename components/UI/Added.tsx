import { View, Text, StyleSheet, Image } from 'react-native';

function Added() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons8-done-100.png')} />
      <Text style={styles.text}>Added to favorites</Text>
    </View>
  );
}
export default Added;

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#42a832',
    fontSize: 24,
  },
});
