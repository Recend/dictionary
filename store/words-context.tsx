import {
  createContext,
  useReducer,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WordsContext = createContext({
  zodziai: [],
  // recentWords: [],
  words: [],
  favoriteWordsLT: [],
  favoriteWordsIT: [],
  addWord: ({ word, translate, description }) => {},
  deleteWord: (id) => {},
  addToFavoritesLT: (word, description, translation) => {},
  addToFavoritesIT: (word, description, translation) => {},
  deleteFavoriteLT: (id) => {},
  deleteFavoriteIT: (id) => {},
});

const storeData = async (
  id: string,
  value: { id: string; word: string }[] | {}
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(id, jsonValue);
  } catch (e) {
    // saving error
  }
  console.log(`data isidejo`);
  // console.log(await getData(`favorites`));
};

const getData = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem(id);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
let deletedata;
let deletedatastate;

function wordsReducer(
  state: { id: string; word: string }[],
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      storeData(`favorites`, [{ ...action.payload, id: id }, ...state]);
      return [{ ...action.payload, id: id }, ...state];
    case 'DELETE':
      deletedata = state.filter((word) => word.id === action.payload);
      deletedatastate = true;
      storeData('favorites', deletedata);
      return deletedata;
    case 'ADDFROMSTORAGE':
      if (action.payload) return action.payload;

    default:
      return state;
  }
}

function WordsContextProvider({ children }: { children: ReactNode }) {
  const [wordsLT, setWordsLT] = useState<string[][]>([]);
  const [wordsIT, setWordsIT] = useState<string[][]>([]);
  const [wordsState, dispatch] = useReducer(wordsReducer, []);

  useEffect(() => {
    const loadData = async () => {
      const memory = await getData('favorites');
      addfromstorage(memory);
      // const favoritesLT = await getData('favoritesLT');
      // const favoritesIT = await getData('favoritesIT');
      // setWordsLT(favoritesLT);
      // setWordsIT(favoritesIT);
    };
    loadData();
  }, []);

  function addWord(wordData: {
    word: string[];
    description: string[];
    translate: string[];
    pvz: string[];
  }) {
    dispatch({ type: 'ADD', payload: wordData });
  }

  async function addfromstorage(memory) {
    dispatch({ type: 'ADDFROMSTORAGE', payload: memory });
  }
  function deleteWord(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function addToFavoritesLT(
    checkedWord: string,
    translate: string,
    description: string
  ) {
    setWordsLT([[checkedWord, translate, description], ...wordsLT]);
    storeData('favoritesLT', [
      [checkedWord, translate, description],
      ...wordsLT,
    ]);
  }
  function addToFavoritesIT(
    checkedWord: string,
    translate: string,
    description: string
  ) {
    setWordsIT([[checkedWord, translate, description], ...wordsIT]);
    storeData('favoritesIT', [
      [checkedWord, translate, description],
      ...wordsLT,
    ]);
  }

  function deleteFavoriteLT(wordas: string) {
    let x: string[][] = [];
    // console.log(wordas);

    wordsLT.map((word) => {
      if (word[0] !== wordas[0]) x = [word, ...x];
    });
    setWordsLT(x);
  }
  function deleteFavoriteIT(wordas: string) {
    let x: string[][] = [];
    // console.log(wordas);

    wordsIT.map((word) => {
      if (word[0] !== wordas[0]) x = [word, ...x];
    });
    setWordsIT(x);
  }

  const value = {
    // recentWords: wordsState,
    words: wordsState,
    favoriteWordsLT: wordsLT,
    favoriteWordsIT: wordsIT,
    addWord: addWord,
    deleteWord: deleteWord,
    addToFavoritesLT: addToFavoritesLT,
    addToFavoritesIT: addToFavoritesIT,
    deleteFavoriteLT: deleteFavoriteLT,
    deleteFavoriteIT: deleteFavoriteIT,
  };

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
}

export default WordsContextProvider;
