import React, { useContext } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ItWordsForm from '../components/ItWordsForm';
import { WordsContext } from '../store/words-context';

function ItalyScreen() {
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
      <ItWordsForm
        onSubmit={confirmHandler}
        defaultValues={{ word: '', translate: '', description: '', pvz: '' }}
      />
    </View>
  );
}

export default ItalyScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#42a832',
    borderRadius: 5,
    justifyContent: 'center',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDesign: {
    backgroundColor: '#42a832',
    padding: 10,
    width: 100,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  buttonTextDesign: {
    textAlign: 'center',
    color: 'white',
  },
});
