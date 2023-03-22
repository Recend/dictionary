import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import LtWordsForm from '../components/LtWordsForm';
import { WordsContext } from '../store/words-context';

function LithuaniaScreen() {
  const wordsCtx = useContext(WordsContext);

  function confirmHandler(wordData: {
    word: string;
    translate: string;
    description: string;
  }) {
    wordsCtx.addWord(wordData);
  }

  return (
    <View>
      <LtWordsForm
        onSubmit={confirmHandler}
        defaultValues={{ word: '', translate: '', description: '', pvz: '' }}
      />
    </View>
  );
}

export default LithuaniaScreen;

const styles = StyleSheet.create({});
