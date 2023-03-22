import { View, Text, StyleSheet } from 'react-native';
import { WordsContext } from '../store/words-context';
import React, { useContext } from 'react';
import IconButton from '../components/UI/IconButton';

function FavItScreen() {
  const wordsCtx = useContext(WordsContext);
  console.log(wordsCtx.favoriteWordsIT);

  function deleteFav(word: string) {
    wordsCtx.deleteFavoriteIT(word);
  }
  return (
    <View style={styles.container}>
      {wordsCtx.favoriteWordsIT.map((word, i) => {
        return (
          <View style={styles.row}>
            <Text style={styles.info} key={word}>
              Žodis: {wordsCtx.favoriteWordsIT[i][0]} || Vertimas:{' '}
              {wordsCtx.favoriteWordsIT[i][2]}
            </Text>
            <View style={styles.end}>
              <IconButton
                icon='trash'
                color='red'
                size={20}
                onPress={() => deleteFav(word)}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default FavItScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  end: {
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 8,
    color: 'grey',
    borderRadius: 6,
  },
  info: {
    marginVertical: 10,
    alignItems: 'center',
    color: 'grey',
  },
});
