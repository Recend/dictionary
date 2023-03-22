import { useContext, useLayoutEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { WordsContext } from '../store/words-context';

function ManageScreen({ route, navigation }) {
  const wordsCtx = useContext(WordsContext);
  const editedWordId = route.params?.wordId;
  const isEditing = !!editedWordId;

  const selectedWord = wordsCtx.words.find((word) => word.id === editedWordId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedWord.word,
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.translate} defaultValues={selectedWord}>
        Vertimas:{' '}
        <Text style={styles.translated}> {selectedWord.translate}</Text>
      </Text>
      <Text style={styles.translate} defaultValues={selectedWord}>
        Paaiškinimas:{' '}
        <Text style={styles.translated}> {selectedWord.description}</Text>{' '}
      </Text>

      <View>
        <Button title='Cancel' onPress={cancelHandler}></Button>
      </View>
    </View>
  );
}

export default ManageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  translate: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'grey',
  },
  translated: {
    color: '#42a832',
  },
});
