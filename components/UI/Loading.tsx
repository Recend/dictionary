import { View, ActivityIndicator, StyleSheet } from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='red' />
    </View>
  );
}
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
