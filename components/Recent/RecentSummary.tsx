import { View, Text, StyleSheet } from 'react-native';

function RecentSummary({ periodName }: { periodName: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
    </View>
  );
}
export default RecentSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    // backgroundColor: '#a0a832',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
