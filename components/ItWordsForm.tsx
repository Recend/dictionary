import { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import ItInput from './ItInput';
import { WordsContext } from '../store/words-context';
import Loading from './UI/Loading';
import Added from './UI/Added';
import Error from './UI/Error';

type SubmitHandler = (wordData: {
  word: string;
  translate: string;
  description: string;
}) => void;

type Props = {
  onSubmit: SubmitHandler;
  defaultValues?: {
    pvz: string;
    word: string;
    translate: string;
    description: string;
  };
};

function ItWordsForm(this: any, { onSubmit, defaultValues }: Props) {
  const wordsCtx = useContext(WordsContext);
  const [checkedWord, setCheckedWord] = useState('');
  const [description, setDescription] = useState('');
  const [translation, setTranslation] = useState('');
  const [pvz, setPvz] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [addedToFavorites, setIsAddedToFavorites] = useState(true);
  const [erroras, setErroras] = useState('');

  const [inputs, setInputs] = useState({
    word: {
      value: defaultValues ? defaultValues.word : '',
      isValid: true,
    },
    translate: defaultValues ? defaultValues.translate : '',
    description: defaultValues ? defaultValues.description : '',
    pvz: defaultValues ? defaultValues.pvz : '',
  });

  function wordChangedHandler(wordIdentifier: string, enteredWord: string) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [wordIdentifier]: { value: enteredWord, isValid: true },
      };
    });
  }

  async function submitHandler() {
    setIsFetching(true);
    try {
      const response = await fetch(
        'https://it-zodynas-default-rtdb.firebaseio.com/words/' +
          inputs.word.value +
          '.json'
      );

      const data = await response.json();
      setIsFetching(false);
      const wordData = {
        word: inputs.word.value,
        translate: data[0],
        description: data[1],
        pvz: data[3],
      };
      setCheckedWord(wordData.word);
      setDescription(wordData.description);
      setTranslation(wordData.translate);
      setPvz(wordData.pvz);

      const wordIsValid = wordData.word.trim().length > 0;
      if (!wordIsValid) {
        setIsFetching(false);
        return;
      } else {
        setIsFetching(false);
        onSubmit(wordData);
      }
    } catch (erroras) {
      setErroras('Could not fetch');
    }

    setIsAddedToFavorites(true);
    setInputs({
      word: { value: '', isValid: true },
      translate: '',
      description: '',
      pvz: '',
    });
  }

  function addToFavoritesHandler() {
    // console.log(checkedWord, description, translation);
    if (!checkedWord && !description && !translation) {
      return;
    }
    wordsCtx.addToFavoritesIT(checkedWord, description, translation);
    setIsAddedToFavorites(false);
  }

  function errorHandler() {
    setErroras('');
    setIsFetching(false);
    setCheckedWord('');
    setDescription('');
    setTranslation('');
    // setPvz('');
  }

  return (
    <View>
      <ItInput
        label={'Itališkas žodis'}
        textInputConfig={{
          onChangeText: wordChangedHandler.bind(this, 'word'),
          value: inputs.word.value,
        }}
      />
      {erroras ? (
        <Error message={erroras} onConfirm={errorHandler} />
      ) : (
        <View>
          <View style={styles.buttonsContainer}>
            {isFetching ? (
              <Loading />
            ) : (
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={submitHandler}
              >
                <Text style={styles.buttonTextDesign}>Ieškoti</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <View style={styles.textContainer}>
              {checkedWord && (
                <Text style={styles.eneterWordText}>
                  Ieškomas zodis:{' '}
                  <Text style={styles.enteredWordBoldRed}>{checkedWord}</Text>
                </Text>
              )}
              {translation && (
                <Text style={styles.eneterWordText}>
                  Vertimas:{' '}
                  <Text style={styles.enteredWordBoldGreen}>{translation}</Text>{' '}
                </Text>
              )}
              {description && (
                <Text style={styles.eneterWordText}>
                  Aprašymas:
                  <Text style={styles.enteredWordBoldBlack}>
                    {' '}
                    {description}
                  </Text>{' '}
                </Text>
              )}
              {pvz && (
                <Text style={styles.eneterWordText}>
                  Pavizdys:
                  <Text style={styles.enteredWordBoldBlack}> {pvz}</Text>{' '}
                </Text>
              )}
            </View>
            {checkedWord && (
              <View>
                {addedToFavorites ? (
                  <View style={styles.add}>
                    <Button
                      title='Add To favorites'
                      onPress={addToFavoritesHandler}
                    ></Button>
                  </View>
                ) : (
                  <Added />
                )}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
export default ItWordsForm;

const styles = StyleSheet.create({
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
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  eneterWordText: {
    fontSize: 24,
    marginVertical: 6,
    color: 'grey',
  },
  enteredWordBoldRed: {
    fontWeight: 'bold',
    color: '#731a25',
  },
  enteredWordBoldGreen: {
    fontWeight: 'bold',
    color: '#42a832',
  },
  enteredWordBoldBlack: {
    fontWeight: 'bold',
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  add: {
    marginVertical: 25,
  },
});
