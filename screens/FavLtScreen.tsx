import { View, Text, StyleSheet } from 'react-native';
import { WordsContext } from '../store/words-context';
import React, { useContext } from 'react';
import IconButton from '../components/UI/IconButton';

function FavLtScreen() {
  const wordsCtx = useContext(WordsContext);
  console.log(wordsCtx.favoriteWordsLT);

  function deleteFav(word: string) {
    wordsCtx.deleteFavoriteLT(word);
  }
  return (
    <View style={styles.container}>
      {wordsCtx.favoriteWordsLT.map((word, i) => {
        return (
          <View style={styles.row}>
            <Text style={styles.info} key={word}>
              Žodis: {wordsCtx.favoriteWordsLT[i][0]} || Vertimas:{' '}
              {wordsCtx.favoriteWordsLT[i][2]}
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

export default FavLtScreen;

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
