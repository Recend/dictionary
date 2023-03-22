import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RecentOutput from '../components/Recent/RecentOutput';
import IconButton from '../components/UI/IconButton';
import { WordsContext } from '../store/words-context';

function RecentScreen({ route }) {
  const wordsCtx = useContext(WordsContext);
  const editedWordId = route.params?.wordId;

  function deleteWordHandler() {
    wordsCtx.deleteWord(editedWordId);
  }
  return (
    <View style={styles.main}>
      <View>
        <RecentOutput
          recentPeriod='This is your history of searched words'
          words={wordsCtx.words}
          fallbackText='No words searched'
        />
      </View>
      <View style={styles.container}>
        <IconButton
          icon='trash'
          color='red'
          size={50}
          onPress={deleteWordHandler}
        />
        <Text>DELETE HISTORY</Text>
      </View>
    </View>
  );
}

export default RecentScreen;

const styles = StyleSheet.create({
  main: { flex: 1 },
  recents: {
    flex: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
