import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Switch } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

function FirstScreen({ navigation }: any) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Italian Lithuanian dictionary</Text>
      <View style={styles.flags}>
        <Pressable onPress={() => navigation.navigate('Italy')}>
          <Image
            style={styles.italyFlag}
            source={require('../assets/Flag_of_Italy.svg.png')}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Lithuania')}>
          <Image
            style={styles.lithuaniaFlag}
            source={require('../assets/Flag_of_Lithuania.svg.png')}
          />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Image source={require('../assets/icons8-open-book-20.png')} /> 60,000
          ++ Italian - Lithuanian
        </Text>
        <Text style={styles.text}>
          {' '}
          <Image source={require('../assets/icons8-open-book-20.png')} />
          140,000 ++ Lithuanian - Italian
        </Text>
        <Text style={styles.text2}>
          {' '}
          <Image source={require('../assets/icons8-android-os-20.png')} />
          Full pronunciation support for both languages
        </Text>
        <View style={styles.switch}>
          <Switch
            value={darkMode}
            onValueChange={(value) => {
              setDarkMode(value);
              EventRegister.emit('changeThemeEvent', value);
            }}
          />
          <Text style={darkMode ? styles.dark : styles.light}>
            Light/Dark mode
          </Text>
        </View>
      </View>
    </View>
  );
}

export default FirstScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 34,
    color: '#2E35AF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  flags: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  italyFlag: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  lithuaniaFlag: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 3,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1EBCEB',
  },
  text2: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2E75AF',
  },
  book: {
    width: 10,
    height: 10,
  },
  switch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  dark: {
    color: 'white',
  },
  light: {
    color: 'black',
  },
});
