import { useContext } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { WordsContext } from '../../store/words-context';
import { useNavigation } from '@react-navigation/native';

export interface RecentItemProps {
  id: number;
  word: string;
}

function RecentItem({ id, word }: RecentItemProps) {
  const navigation = useNavigation();
  const wordsCtx = useContext(WordsContext);

  function recentPressHandler() {
    navigation.navigate('ManageScreen', {
      wordId: id,
    });
  }

  return (
    <Pressable
      onPress={recentPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <Text style={styles.textBase}>{word}</Text>
      </View>
    </Pressable>
  );
}
export default RecentItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#009900',
    elevation: 3,
    borderRadius: 10,
  },
  textBase: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
