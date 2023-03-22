import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-svg';
import RecentList from './RecentList';
import RecentSummary from './RecentSummary';

export interface Props {
  words: string[];
  recentPeriod: string;
  fallbackText: string;
}

function RecentOutput({ words, recentPeriod, fallbackText }: Props) {
  let content = <Text>{fallbackText}</Text>;

  content = <RecentList words={words} />;

  return (
    <View style={styles.container}>
      <RecentSummary periodName={recentPeriod} />
      {content}
    </View>
  );
}
export default RecentOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  infoText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
