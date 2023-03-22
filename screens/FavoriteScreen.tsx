import { View, StyleSheet, Text, Button, Pressable, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  FavItScreen: {};
  FavLtScreen: {};
};

function FavoriteScreen() {
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function pressHandlerLT() {
    navigation.navigate('FavLtScreen', {});
  }
  function pressHandlerIT() {
    navigation.navigate('FavItScreen', {});
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FAVORITE LITHUANIA WORDS</Text>

      <View style={styles.ltButton}>
        <Pressable onPress={pressHandlerLT}>
          <Image
            style={styles.ltFlag}
            source={require('../assets/Flag_of_Lithuania.svg.png')}
          />
        </Pressable>
      </View>
      <Text style={styles.text}>FAVORITE ITALIAN WORDS</Text>
      <View style={styles.itButton}>
        <Pressable onPress={pressHandlerIT}>
          <Image source={require('../assets/Flag_of_Italy.svg.png')} />
        </Pressable>
      </View>
    </View>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ltButton: {
    flex: 1,
    // justifyContent: 'center',
  },
  itButton: {
    flex: 1,
  },
  ltFlag: {
    width: 260,
    height: 170,
  },
  text: {
    fontSize: 24,
    marginVertical: 25,
    color: 'grey',
  },
});
